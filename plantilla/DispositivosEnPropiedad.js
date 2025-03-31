import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

const DispositivosEnPropiedad = ({ usuario = 'Usuario1' }) => {
  const [dispositivos, setDispositivos] = useState([
    { id: 1, nombre: 'Puerta Principal', estado: 'cerrado', funcional: true },
    { id: 2, nombre: 'Puerta Trasera', estado: 'cerrado', funcional: false },
    { id: 3, nombre: 'Puerta de Garaje', estado: 'cerrado', funcional: false },
  ]);
  const [loading, setLoading] = useState(false);

  const handleTogglePuerta = async (id) => {
    const dispositivo = dispositivos.find((d) => d.id === id);

    if (!dispositivo.funcional) {
      Alert.alert('Error', 'Este dispositivo no está habilitado.');
      return;
    }

    try {
      setLoading(true);
      const nuevoEstado = dispositivo.estado === 'abierto' ? 'cerrar' : 'abrir';
      const response = await axios.post(`http://10.198.56.212:5000/api/puerta/${nuevoEstado}`, {
        dispositivoId: id,
        usuario,
      });

      setDispositivos((prevDispositivos) =>
        prevDispositivos.map((d) =>
          d.id === id ? { ...d, estado: nuevoEstado === 'abrir' ? 'abierto' : 'cerrado' } : d
        )
      );

      Alert.alert('Éxito', `La puerta ahora está ${nuevoEstado === 'abrir' ? 'abierta' : 'cerrada'}`);
    } catch (error) {
      console.error('Error al cambiar el estado de la puerta:', error);
      Alert.alert('Error', 'No se pudo cambiar el estado de la puerta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Text style={styles.title}>Dispositivos en Propiedad</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={dispositivos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Animatable.View animation="fadeIn" style={styles.deviceCard}>
              <Text style={styles.deviceName}>{item.nombre}</Text>
              <Text style={styles.deviceStatus}>
                Estado: {item.estado === 'abierto' ? 'Abierto' : 'Cerrado'}
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: item.funcional
                      ? item.estado === 'abierto'
                        ? '#28a745'
                        : '#dc3545'
                      : '#6c757d',
                  },
                ]}
                onPress={() => handleTogglePuerta(item.id)}
                disabled={!item.funcional}
              >
                <Text style={styles.buttonText}>
                  {item.funcional
                    ? item.estado === 'abierto'
                      ? 'Cerrar'
                      : 'Abrir'
                    : 'No Disponible'}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        />
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#003366',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  deviceCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  deviceName: {
    fontSize: 18,
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deviceStatus: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default DispositivosEnPropiedad;