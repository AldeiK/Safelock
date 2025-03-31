import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation, onLogout }) => {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
        <Text style={styles.headerTitle}>¡Bienvenido a Safelock!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animatable.View>

      {/* Tarjetas de navegación */}
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.cardsContainer}>
        <Animatable.View animation="bounceIn" delay={500} style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')} style={styles.cardContent}>
            <Ionicons name="notifications-outline" size={40} color="#fff" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Notificaciones</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={1000} style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('DispositivosEnPropiedad')} style={styles.cardContent}>
            <Ionicons name="hardware-chip-outline" size={40} color="#fff" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Dispositivos</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="bounceIn" delay={1500} style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('RegistroDeAcceso')} style={styles.cardContent}>
            <Ionicons name="key-outline" size={40} color="#fff" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Registro de Acceso</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1', // Fondo gris claro
  },
  header: {
    backgroundColor: '#007bff', // Azul rey
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff', // Blanco
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff6347', // Tomate
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  cardsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#007bff', // Azul rey
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    color: '#fff', // Blanco
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
});

export default Home;