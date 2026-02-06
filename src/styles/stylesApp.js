import { StyleSheet } from 'react-native';

export const stylesApp = StyleSheet.create({
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