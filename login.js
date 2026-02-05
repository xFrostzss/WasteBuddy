import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const entrar = () => {
    if (user === 'admin' && pass === '123') {
      onLogin(); 
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>WasteBuddy</Text>
      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder="Usuário" 
          value={user} 
          onChangeText={setUser} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          secureTextEntry 
          value={pass} 
          onChangeText={setPass} 
        />
        <TouchableOpacity style={styles.btn} onPress={entrar}>
          <Text style={styles.btnText}>Acessar Sistema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5429cc', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 5 },
  input: { backgroundColor: '#f0f2f5', padding: 15, borderRadius: 8, marginBottom: 15 },
  btn: { backgroundColor: '#33cc95', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});