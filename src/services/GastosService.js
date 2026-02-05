// src/services/GastosService.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const GastosService = {
  async getAll() {
    try {
      const res = await AsyncStorage.getItem('@gastos_v2');
      return res ? JSON.parse(res) : [];
    } catch (e) {
      return [];
    }
  },

  async add(desc, valor) {
    try {
      const dadosAtuais = await this.getAll();
      const novo = {
        id: Date.now().toString(),
        descricao: desc,
        valor: parseFloat(valor)
      };
      const listaNova = [...dadosAtuais, novo];
      await AsyncStorage.setItem('@gastos_v2', JSON.stringify(listaNova));
    } catch (e) {
      console.error(e);
    }
  },

  async remove(id) {
    try {
      const dados = await this.getAll();
      const filtrados = dados.filter(i => i.id !== id);
      await AsyncStorage.setItem('@gastos_v1', JSON.stringify(filtrados));
    } catch (e) {
      console.error(e);
    }
  }
};