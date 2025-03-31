import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Notificaciones = () => {
  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    color: '#003366', // Azul rey
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Notificaciones;