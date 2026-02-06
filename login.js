import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {stylesLogin} from './src/styles/loginStyles';

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const entrar = () => {
    if (user === 'admin' && pass === '123') {
      onLogin(); 
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

 return (
    <LinearGradient
      colors={['#e0f7fa', '#f1f8e9']} 
      style={stylesLogin.container}
    >
      <View style={stylesLogin.content}>
        <View style={stylesLogin.headerTitleContainer}>
          <Text style={stylesLogin.logo}>WasteBuddy</Text>
          <Text style={stylesLogin.slogan}>Seu controle de gastos inteligente</Text>
        </View>
        
        <View style={stylesLogin.card}>
          <Text style={stylesLogin.label}>Bem-vindo de volta!</Text>
          
          <TextInput 
            style={stylesLogin.input} 
            placeholder="Usuário" 
            placeholderTextColor="#0c0c0cbe"
            value={user} 
            onChangeText={setUser} 
          />
          <TextInput 
            style={stylesLogin.input} 
            placeholder="Senha" 
            placeholderTextColor="#0c0c0cbe"
            secureTextEntry 
            value={pass} 
            onChangeText={setPass} 
          />

          <TouchableOpacity 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={[
              stylesLogin.btn, 
              isHovered && stylesLogin.btnHover 
            ]} 
            onPress={entrar}
          >
            <Text style={stylesLogin.btnText}>Acessar Sistema</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
