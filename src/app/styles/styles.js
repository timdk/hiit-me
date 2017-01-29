import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullButton: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createHeader: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  createInput: {
    fontSize: 25,
    fontWeight: 'bold',
    height: 50, 
    width: 100, 
    textAlign: 'center'
  },
  programmeHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  timeLarge: { fontSize: 100, fontWeight: 'bold' },
  timeSmall: { fontSize: 20 }
});