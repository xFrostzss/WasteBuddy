import { StyleSheet } from 'react-native';

export const stylesSair = StyleSheet.create({
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 30,
    width: '100%',
    height: 50, 
    position: 'relative', 
  },
  btnLogout: {
    position: 'absolute', 
    right: 0, 
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e52e4d',
  },
  btnLogoutText: { 
    color: '#e52e4d', 
    fontWeight: 'bold',
    fontSize: 13,
  }
});