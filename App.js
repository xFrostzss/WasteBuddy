import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Alert, StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
import { stylesSair } from './src/styles/botao_sair';
import { LinearGradient } from 'expo-linear-gradient';

const CHAVE_STORAGE = '@gastos_v2';
const CHAVE_LOGIN = '@usuario_logado';

export default function App() {
  const [estaLogado, setEstaLogado] = useState(false);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [desc, setDesc] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [isHovered, setIsHovered] = useState(false);


 useEffect(() => {
    async function inicializarApp() {
      try {
        const logado = await AsyncStorage.getItem(CHAVE_LOGIN);
        
        if (logado === 'true') {
          setEstaLogado(true);
          // Chamamos a função de carregar gastos que você já tinha
          await carregarDados(); 
        }
      } catch (e) {
        console.error("Erro na inicialização:", e);
      } finally {
        setCarregandoSessao(false);
      }
    }
    inicializarApp();
  }, []);

  const carregarDados = async () => {
    const res = await AsyncStorage.getItem(CHAVE_STORAGE);
    const dados = res ? JSON.parse(res) : [];
    setLista(Array.isArray(dados) ? dados : []);
  };

  const handleLoginSucesso = async () => {
    await AsyncStorage.setItem(CHAVE_LOGIN, 'true');
    await carregarDados(); // Carrega os gastos assim que logar
    setEstaLogado(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem(CHAVE_LOGIN, 'false');
    setEstaLogado(false);
  };
  
  if (carregandoSessao) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5429cc" />
      </View>
    );
  }

  if (!estaLogado) {
    return <Login onLogin={handleLoginSucesso} />;
  }

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

  const totalGeral = lista.reduce((acc, item) => acc + (Number(item.valor) || 0), 0);

  return (
    <LinearGradient
    colors={['#e0f7fa', '#f1f8e9']} 
    style={styles.container}
  >
    <View style={styles.container}>
     <View style={stylesSair.header}>
        <Text style={styles.title}>WasteBuddy</Text>
        
        <TouchableOpacity onPress={handleLogout} style={stylesSair.btnLogout}>
          <Text style={stylesSair.btnLogoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Descrição" value={desc} onChangeText={setDesc} />
        <TextInput style={styles.input} placeholder="Valor (R$)" keyboardType="numeric" value={valor} onChangeText={setValor} />
        <TouchableOpacity 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        style={[styles.btn, isHovered && styles.btnHover]} 
        onPress={handleAdicionar}
        >
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 50,
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28,
    fontWeight: 'bold', 
    marginBottom: 25, 
    textAlign: 'center', 
    color: '#5429cc' 
  },
  card: { 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: { 
    backgroundColor: '#f9f9f9', 
    padding: 15, borderRadius: 8, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#eee' 
  },
 btn: { 
    backgroundColor: '#00D1A0', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center',
    transitionProperty: 'all', 
    transitionDuration: '0.2s',
    cursor: 'pointer',
    elevation: 5,
    shadowColor: '#00D1A0',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btnHover: {
    transform: [{ scale: 1.0 }],
    backgroundColor: '#00E6B0',
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  item: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  itemDesc: { 
    fontSize: 16, 
    color: '#363f5f', 
    fontWeight: '500' 
  },
  itemValor: { 
    fontSize: 14, 
    color: '#2b2b2b', 
    fontWeight: 'bold' 
  },
  btnExcluir: { 
    color: '#e52e4d', 
    fontWeight: 'bold' 
  },
  footer: { 
    padding: 20, 
    backgroundColor: '#633BBC', 
    borderRadius: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  footerLabel: { 
    color: '#fff', 
    fontSize: 14,
     opacity: 0.8 
    },
  footerTotal: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  btnZerar: { 
    backgroundColor: '#fff',
    padding: 8, 
    borderRadius: 6 
  },
  btnZerarText: { 
    color: '#ff4444', 
    fontWeight: 'bold', 
    fontSize: 12 
  }
});