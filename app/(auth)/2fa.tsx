import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TwoFAScreen() {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (val: string, idx: number) => {
    const char = val.slice(-1); // solo el último carácter
    const next = [...code];
    next[idx] = char.replace(/[^0-9]/g, ''); // solo dígitos
    setCode(next);

    if (char && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, idx: number) => {
    if (key === 'Backspace' && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const clearAll = () => {
    setCode(['', '', '', '', '', '']);
    inputsRef.current[0]?.focus();
  };

  const codeStr = code.join('');
  const isComplete = codeStr.length === 6 && !codeStr.includes('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tvåfaktorskod</Text>
      <Text style={styles.subtitle}>Ange de 6 siffrorna vi skickade till din e-post.</Text>

      <View style={styles.row}>
        {[0,1,2,3,4,5].map((i) => (
          <TextInput
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }} // ✅ sin return
            value={code[i]}
            onChangeText={(v) => handleChange(v, i)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            style={[styles.box, code[i] ? styles.boxFilled : null]}
            autoCapitalize="none"
            autoCorrect={false}
            importantForAutofill="yes"
            textContentType="oneTimeCode" // iOS sugiere el código
            returnKeyType={i === 5 ? 'done' : 'next'}
          />
        ))}
      </View>

      <TouchableOpacity
        disabled={!isComplete}
        style={[styles.button, !isComplete && styles.buttonDisabled]}
        onPress={() => {
          // Solo frontend: tienes el código en codeStr
          console.log('OTP:', codeStr);
        }}
      >
        <Text style={styles.buttonText}>Veriferia</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clearAll} style={styles.linkBtn}>
        <Text style={styles.linkText}>Rensa och börja om</Text>
      </TouchableOpacity>
    </View>
  );
}

const BOX_SIZE = 52;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: 20,
  },
  boxFilled: {
    borderColor: '#7C3AED',
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#C4B5FD',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#7C3AED', fontSize: 14, fontWeight: '600' },
});
