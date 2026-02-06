import { StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20 
  },
  content: {
    width: '100%',
    maxWidth: 400, 
  },
  logo: { 
  fontSize: 48, 
  fontWeight: '900', 
  color: '#633BBC', 
  textAlign: 'center', 
  marginBottom: 10, 
  letterSpacing: -2, 
  textShadowColor: 'rgba(99, 59, 188, 0.3)', 
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 10,
},
  card: { 
    backgroundColor: '#d4c8c866', 
    padding: 30, 
    borderRadius: 20, 
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#363f5f',
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  input: { 
    backgroundColor: '#f0f2f5', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  slogan: {
    fontSize: 14,
    color: '#00A37E', 
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: 3, 
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  btn: { 
    backgroundColor: '#00D1A0', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 10,
    transitionProperty: 'all',
    transitionDuration: '0.2s',
    cursor: 'pointer',
    elevation: 5,
  },
  btnHover: {
    backgroundColor: '#00E6B0',
    transform: [{ scale: 1.01 }], 
    shadowColor: '#00D1A0',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  }
});