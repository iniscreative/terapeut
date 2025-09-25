import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Send } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Fel', 'Vänligen ange din e-postadress');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Fel', 'Vänligen ange en giltig e-postadress');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleResetPassword();
  };

  if (emailSent) {
    return (
      <LinearGradient
        colors={['#7c3aed', '#8b5cf6']}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Send size={48} color="#7c3aed" />
          </View>
          
          <Text style={styles.successTitle}>E-post Skickat!</Text>
          <Text style={styles.successMessage}>
            Vi har skickat instruktioner för att återställa ditt lösenord till:
          </Text>
          <Text style={styles.emailText}>{email}</Text>
          
          <Text style={styles.instructionText}>
            Kontrollera din inkorg och följ instruktionerna i e-postmeddelandet.
          </Text>

          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendEmail}
          >
            <Text style={styles.resendButtonText}>Skicka igen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToLoginButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.backToLoginText}>Tillbaka till inloggning</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#7c3aed', '#8b5cf6']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Glömt Lösenord</Text>
          <Text style={styles.subtitle}>Återställ ditt lösenord</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <View style={styles.iconContainer}>
              <Mail size={64} color="#7c3aed" />
            </View>
            
            <Text style={styles.formTitle}>Återställ Lösenord</Text>
            <Text style={styles.formDescription}>
              Ange din e-postadress så skickar vi dig instruktioner för att återställa ditt lösenord.
            </Text>
            
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-postadress</Text>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="din@email.se"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              style={[styles.resetButton, loading && styles.resetButtonDisabled]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Send size={20} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.resetButtonText}>
                {loading ? 'Skickar...' : 'Skicka Återställningslänk'}
              </Text>
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity 
              style={styles.backToLogin}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.backToLoginText}>Tillbaka till inloggning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd6fe',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f3f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  formDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  inputIcon: {
    marginLeft: 16,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  resetButton: {
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  resetButtonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  backToLogin: {
    paddingVertical: 12,
  },
  backToLoginText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '500',
  },
  // Success state styles
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#ddd6fe',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#c4b5fd',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  resendButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
  },
  backToLoginButton: {
    paddingVertical: 12,
  },
});