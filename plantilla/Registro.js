import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Registro = ({ onBack }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://10.198.56.228:5000';
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, {
        nombre,
        password,
        tipo_usuario: 'user',
        notificaciones: true,
      });

      showMessage({
        message: 'Registro exitoso',
        description: response.data.message,
        type: 'success',
        icon: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Error en el registro',
        description: error.response?.data?.error || 'Error desconocido',
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  return (
    <View style={styles.registroContainer}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingrese su nombre"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Ingrese su contraseña"
        />
      </View>
      <Button title="Registrar" onPress={handleRegister} color="#007bff" />
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  registroContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    minWidth: 300,
  },
  title: {
    marginBottom: 20,
    fontSize: 28,
    color: '#003366',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: '#003366',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#b2dfdb',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007bff',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default Registro;