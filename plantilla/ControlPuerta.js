import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const ControlPuerta = () => {
  // Función para abrir la puerta
  const abrirPuerta = async () => {
    try {
      const response = await axios.get('http://10.198.56.212:5000/api/puerta/abrir'); // Cambia la URL según tu backend
      Alert.alert('Éxito', response.data.message); // Muestra un mensaje de éxito
    } catch (error) {
      console.error('Error al abrir la puerta:', error);
      Alert.alert('Error', 'No se pudo abrir la puerta'); // Muestra un mensaje de error
    }
  };

  // Función para cerrar la puerta
  const cerrarPuerta = async () => {
    try {
      const response = await axios.get('http://10.198.56.212:5000/api/puerta/cerrar'); // Cambia la URL según tu backend
      Alert.alert('Éxito', response.data.message); // Muestra un mensaje de éxito
    } catch (error) {
      console.error('Error al cerrar la puerta:', error);
      Alert.alert('Error', 'No se pudo cerrar la puerta'); // Muestra un mensaje de error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Puerta</Text>
      <TouchableOpacity style={styles.button} onPress={abrirPuerta}>
        <Text style={styles.buttonText}>Abrir Puerta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={cerrarPuerta}>
        <Text style={styles.buttonText}>Cerrar Puerta</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ControlPuerta;