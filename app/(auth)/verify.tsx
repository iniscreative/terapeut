import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();

  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Autofocus al primer input
  useEffect(() => {
    const t = setTimeout(() => inputRefs.current[0]?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  // Timer seguro
  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const moveFocusTo = (i: number) => {
    if (i >= 0 && i < 6) inputRefs.current[i]?.focus();
  };

  const handleCodeChange = (value: string, index: number) => {
    // Solo dígitos
    const onlyDigits = value.replace(/\D/g, '');

    // Si pegó varios dígitos, distribuir
    if (onlyDigits.length > 1) {
      const next = [...code];
      let cursor = index;
      for (const ch of onlyDigits.slice(0, 6 - index).split('')) {
        next[cursor] = ch;
        cursor += 1;
      }
      setCode(next);
      if (cursor <= 5) moveFocusTo(cursor);
      else inputRefs.current[5]?.blur();
      return;
    }

    // Un solo dígito
    const next = [...code];
    next[index] = onlyDigits;
    setCode(next);

    if (onlyDigits && index < 5) moveFocusTo(index + 1);
  };

  const handleKeyPress = (key: string | undefined, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      // Limpia el anterior y enfoca
      const next = [...code];
      next[index - 1] = '';
      setCode(next);
      moveFocusTo(index - 1);
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      Alert.alert('Fel', 'Vänligen ange den kompletta verifieringskoden');
      return;
    }

    setLoading(true);
    try {
      // TODO: reemplazar por llamada real a tu backend:
      // await fetch(`${API_URL}/auth/verify`, { method: 'POST', body: JSON.stringify({ email, code: verificationCode, password }) ... })
      await new Promise((r) => setTimeout(r, 1200));

      Alert.alert('Verifiering Lyckad', 'Ditt konto har verifierats framgångsrikt!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    } catch (e) {
      Alert.alert('Fel', 'Kunde inte verifiera koden. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      // TODO: reemplazar por /auth/register o /auth/resend según tu API (usa "email")
      await new Promise((r) => setTimeout(r, 1000));
      setTimeLeft(60);
      Alert.alert('Kod Skickad', 'En ny verifieringskod har skickats till din e-post');
    } catch {
      Alert.alert('Fel', 'Kunde inte skicka koden. Försök igen.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#059669', '#10b981']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Verifiera E-post</Text>
        <Text style={styles.subtitle}>Bekräfta ditt konto{email ? ` (${email})` : ''}</Text>
      </View>

      {/* Verification Form */}
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.iconContainer}>
            <Mail size={64} color="#059669" />
          </View>

          <Text style={styles.formTitle}>Ange Verifieringskod</Text>
          <Text style={styles.formDescription}>
            Vi har skickat en 6-siffrig kod till din e-postadress. Ange koden nedan för att verifiera ditt konto.
          </Text>

          {/* Code Input */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.codeInput, digit && styles.codeInputFilled]}
                value={digit}
                onChangeText={(v) => handleCodeChange(v, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={6} // permite pegar varios; controlamos dentro
                textAlign="center"
                selectTextOnFocus
                autoCapitalize="none"
                textContentType="oneTimeCode"
                autoComplete="one-time-code"
                returnKeyType={index === 5 ? 'done' : 'next'}
                onSubmitEditing={index === 5 ? handleVerify : undefined}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
            onPress={handleVerify}
            disabled={loading}
          >
            <CheckCircle size={20} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.verifyButtonText}>{loading ? 'Verifierar...' : 'Verifiera Konto'}</Text>
          </TouchableOpacity>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Fick du ingen kod? </Text>
            {timeLeft > 0 ? (
              <Text style={styles.timerText}>Skicka igen om {timeLeft}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResendCode} disabled={resendLoading}>
                <Text style={[styles.resendLink, resendLoading && styles.resendLinkDisabled]}>
                  {resendLoading ? 'Skickar...' : 'Skicka igen'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Help Text */}
          <Text style={styles.helpText}>Kontrollera även din skräppost om du inte hittar e-postmeddelandet.</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40 },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#a7f3d0' },
  formContainer: {
    flex: 1, backgroundColor: '#ffffff', borderTopLeftRadius: 30, borderTopRightRadius: 30,
    paddingHorizontal: 20, paddingTop: 32,
  },
  form: { flex: 1, alignItems: 'center' },
  iconContainer: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: '#ecfdf5',
    alignItems: 'center', justifyContent: 'center', marginBottom: 32,
  },
  formTitle: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 16, textAlign: 'center' },
  formDescription: {
    fontSize: 16, color: '#6b7280', textAlign: 'center', lineHeight: 24, marginBottom: 40, paddingHorizontal: 20,
  },
  codeContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 40, paddingHorizontal: 20 },
  codeInput: {
    width: 48, height: 56, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12,
    fontSize: 24, fontWeight: '700', color: '#1f2937', backgroundColor: '#ffffff',
  },
  codeInputFilled: { borderColor: '#059669', backgroundColor: '#f0fdf4' },
  verifyButton: {
    backgroundColor: '#059669', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, width: '100%', marginBottom: 32,
  },
  verifyButtonDisabled: { opacity: 0.6 },
  buttonIcon: { marginRight: 8 },
  verifyButtonText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
  resendContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  resendText: { fontSize: 14, color: '#6b7280' },
  resendLink: { fontSize: 14, color: '#059669', fontWeight: '600' },
  resendLinkDisabled: { opacity: 0.6 },
  timerText: { fontSize: 14, color: '#9ca3af' },
  helpText: { fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 18, paddingHorizontal: 40 },
});
