import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Alert, StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login'

const CHAVE_STORAGE = '@gastos_v2';

export default function App() {
  const [estaLogado, setEstaLogado] = useState(false);
  const [desc, setDesc] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await AsyncStorage.getItem(CHAVE_STORAGE);
      // Se o JSON estiver corrompido, o parse falha. O try/catch segura isso.
      const dados = res ? JSON.parse(res) : [];
      setLista(Array.isArray(dados) ? dados : []);
    } catch (e) {
      console.error("Erro ao recuperar dados, resetando lista local:", e);
      setLista([]);
    } finally {
      // ESTA LINHA É CRUCIAL: Ela garante que o loading pare de girar
      setCarregando(false);
    }
  };


  const handleAdicionar = async () => {
    if (!desc || !valor) {
      Alert.alert("Erro", "Preencha a descrição e o valor.");
      return;
    }
    try {
      const novo = { 
        id: Date.now().toString(), 
        descricao: desc, 
        valor: parseFloat(valor.replace(',', '.')) 
      };
      const novaLista = [...lista, novo];
      setLista(novaLista);
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
      setDesc(''); 
      setValor('');
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar o gasto.");
    }
  };

  const handleExcluir = async (id) => {
    const novaLista = lista.filter(item => item.id !== id);
    setLista(novaLista);
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
  };

  const handleZerarTudo = async () => {
    const limpar = async () => {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify([]));
        setLista([]);
      } catch (e) {
        console.log(e);
      }
    };

    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm("Zerar todos os dados?")) await limpar();
    } else {
      Alert.alert("Atenção", "Deseja apagar todo o histórico?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: limpar, style: "destructive" }
      ]);
    }
  };

  // Cálculo robusto para evitar NaN (Not a Number)
  const totalGeral = lista.reduce((acc, item) => acc + (Number(item.valor) || 0), 0);

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5429cc" />
        <Text style={{marginTop: 10}}>Sincronizando WasteBuddy...</Text>
      </View>
    );
  }

   if (!estaLogado) {
    return <Login onLogin={() => setEstaLogado(true)} />;
  }


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
              <Text style={styles.itemValor}>R$ {Number(item.valor).toFixed(2).replace('.', ',')}</Text>
            </View>
            <TouchableOpacity onPress={() => handleExcluir(item.id)}>
              <Text style={styles.btnExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20, color: '#969cb2'}}>Nenhum gasto registrado.</Text>}
      />

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total de Gastos:</Text>
          <Text style={styles.footerTotal}>R$ {totalGeral.toFixed(2).replace('.', ',')}</Text>
        </View>
        <TouchableOpacity onPress={handleZerarTudo} style={styles.btnZerar}>
          <Text style={styles.btnZerarText}>Zerar Tudo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 25, textAlign: 'center', color: '#5429cc' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 4 },
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  btn: { backgroundColor: '#33cc95', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  item: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemDesc: { fontSize: 16, color: '#363f5f', fontWeight: '500' },
  itemValor: { fontSize: 14, color: '#2b2b2b', fontWeight: 'bold' },
  btnExcluir: { color: '#e52e4d', fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: '#5429cc', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  footerLabel: { color: '#fff', fontSize: 14, opacity: 0.8 },
  footerTotal: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  btnZerar: { backgroundColor: '#fff', padding: 8, borderRadius: 6 },
  btnZerarText: { color: '#ff4444', fontWeight: 'bold', fontSize: 12 }
});