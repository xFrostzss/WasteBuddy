import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [desc, setDesc] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await AsyncStorage.getItem('@gastos_v2');
      const dados = res ? JSON.parse(res) : [];
      setLista(dados);
    } catch (e) {
      console.log(e);
    } finally {
      setCarregando(false);
    }
  };

  const handleAdicionar = async () => {
    if (!desc || !valor) {
      Alert.alert("Erro", "Preencha a descrição e o valor.");
      return;
    }
    const novo = { 
      id: Date.now().toString(), 
      descricao: desc, 
      valor: parseFloat(valor.replace(',', '.')) // Aceita vírgula ou ponto
    };
    const novaLista = [...lista, novo];
    setLista(novaLista);
    await AsyncStorage.setItem('@gastos_v2', JSON.stringify(novaLista));
    setDesc(''); 
    setValor('');
  };

  const handleExcluir = async (id) => {
    const novaLista = lista.filter(item => item.id !== id);
    setLista(novaLista);
    await AsyncStorage.setItem('@gastos_v2', JSON.stringify(novaLista));
  };

  // Cálculo do total de gastos
  const totalGeral = lista.reduce((acc, item) => acc + item.valor, 0);

  if (carregando) return <View style={styles.center}><ActivityIndicator size="large" color="#5429cc" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WasteBuddy</Text>
      
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Descrição" value={desc} onChangeText={setDesc} />
        <TextInput style={styles.input} placeholder="Valor (R$)" keyboardType="numeric" value={valor} onChangeText={setValor} />
        
        <TouchableOpacity style={styles.btn} onPress={handleAdicionar}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemDesc}>{item.descricao}</Text>
              <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => handleExcluir(item.id)}>
              <Text style={styles.btnExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* RODAPÉ COM TOTAL */}
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Total de Gastos:</Text>
        <Text style={styles.footerTotal}>R$ {totalGeral.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#000000' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  btn: { backgroundColor: '#33cc95', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  item: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemDesc: { fontSize: 16, color: '#363f5f' },
  itemValor: { fontSize: 14, fontWeight: 'bold', color: '#2b2b2b' },
  btnExcluir: { color: '#e52e4d', fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: '#5429cc', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  footerLabel: { color: '#fff', fontSize: 16, opacity: 0.9 },
  footerTotal: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});
