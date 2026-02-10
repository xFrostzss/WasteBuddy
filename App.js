// imports utilizados
import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Alert, StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
import { stylesSair } from './src/styles/botao_sair';
import { stylesApp} from './src/styles/stylesApp';
import { LinearGradient } from 'expo-linear-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const CHAVE_STORAGE = '@gastos_v2';
const CHAVE_LOGIN = '@usuario_logado';

const Drawer = createDrawerNavigator();

const LocalSplashScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#5429cc', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>WasteBuddy</Text>
    <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
  </View>
);

// função e props para a tela principal
function TelaPrincipal({ 
  handleLogout, 
  lista, 
  totalGeral, 
  desc, 
  setDesc, 
  valor, 
  setValor, 
  handleAdicionar, 
  handleExcluir, 
  handleZerarTudo,
  isHovered,
  setIsHovered 
}) {
  return (
    <LinearGradient colors={['#e0f7fa', '#f1f8e9']} style={stylesApp.container}>
      <View style={stylesApp.container}>
        <View style={stylesSair.header}>
          <Text style={stylesApp.title}>WasteBuddy</Text>
        </View>
        
        <View style={stylesApp.card}>
          <TextInput 
            style={stylesApp.input} 
            placeholder="Descrição" 
            value={desc} 
            onChangeText={setDesc} 
          />
          <TextInput 
            style={stylesApp.input} 
            placeholder="Valor (R$)" 
            keyboardType="numeric" 
            value={valor} 
            onChangeText={setValor} 
          />
          <TouchableOpacity 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            style={[stylesApp.btn, isHovered && stylesApp.btnHover]} 
            onPress={handleAdicionar}
          >
            <Text style={stylesApp.btnText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={lista}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={stylesApp.item}>
              <View>
                <Text style={stylesApp.itemDesc}>{item.descricao}</Text>
                <Text style={stylesApp.itemValor}>R$ {Number(item.valor).toFixed(2).replace('.', ',')}</Text>
              </View>
              <TouchableOpacity onPress={() => handleExcluir(item.id)}>
                <Text style={stylesApp.btnExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20, color: '#969cb2'}}>Nenhum gasto registrado.</Text>}
        />

        <View style={stylesApp.footer}>
          <View>
            <Text style={stylesApp.footerLabel}>Total de Gastos:</Text>
            <Text style={stylesApp.footerTotal}>R$ {totalGeral.toFixed(2).replace('.', ',')}</Text>
          </View>
          <TouchableOpacity onPress={handleZerarTudo} style={stylesApp.btnZerar}>
            <Text style={stylesApp.btnZerarText}>Zerar Tudo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

//side bar
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Sair da Conta"
        labelStyle={{ color: '#e52e4d', fontWeight: 'bold' }}
        onPress={() => {
          props.handleLogout();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [estaLogado, setEstaLogado] = useState(false);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [desc, setDesc] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [exibirSplash, setExibirSplash] = useState(true);


useEffect(() => {
    async function inicializarApp() {
      try {
        
        const logado = await AsyncStorage.getItem(CHAVE_LOGIN);
        if (logado === 'true') {
          setEstaLogado(true);
          await carregarDados(); 
        }
      } catch (e) {
        console.error("Erro na inicialização:", e);
      } finally {
       setTimeout(() => {
          setCarregandoSessao(false);

          setExibirSplash(false);
        }, 3000);
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
  
  if (exibirSplash) {
    return <LocalSplashScreen />;
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
    <NavigationContainer>
     <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} handleLogout={handleLogout} />}
      screenOptions={{
        drawerStyle: {
        backgroundColor: '#f0f2f5',
        width: 280,
       },
        headerStyle: { backgroundColor: '#633BBC' },
        headerTintColor: '#f2f2f3',
      }}>
        
        <Drawer.Screen name="Resumo de Gastos">
        {(props) => (
          <TelaPrincipal 
            {...props} 
            lista={lista} 
            totalGeral={totalGeral} 
            handleLogout={handleLogout}
            desc={desc}
            setDesc={setDesc}
            valor={valor}
            setValor={setValor}
            handleAdicionar={handleAdicionar}
            handleExcluir={handleExcluir}
            handleZerarTudo={handleZerarTudo}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        )}
      </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
