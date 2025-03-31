import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

const RegistrosDeAcceso = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://10.198.56.212:5000';
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/registros`);
        setRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener los registros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.cardID || 'N/A'}</Text>
      <Text style={styles.cell}>{item.usuario || 'Desconocido'}</Text>
      <Text style={styles.cell}>{item.fechaHora ? new Date(item.fechaHora).toLocaleString() : 'N/A'}</Text>
    </View>
  );

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Text style={styles.title}>Registro de Acceso</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Card ID</Text>
        <Text style={styles.headerCell}>Usuario</Text>
        <Text style={styles.headerCell}>Fecha</Text>
      </View>
      {loading ? (
        <Text>Cargando registros...</Text>
      ) : (
        <FlatList
          data={registros}
          renderItem={renderItem}
          keyExtractor={(item) => item._id || Math.random().toString()}
          style={styles.table}
        />
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
  },
  headerCell: {
    flex: 1,
    color: '#e0f7fa',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b2dfdb',
  },
  cell: {
    flex: 1,
    color: '#003366',
    textAlign: 'center',
  },
});

export default RegistrosDeAcceso;