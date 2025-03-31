import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypeWriter from 'react-native-typewriter';
import Registro from './Registro'; // Asegúrate de que esta ruta sea correcta

const Login = ({ onLogin = () => {} }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
  });

  const handleLogin = async (values) => {
    try {
      console.log('📤 Enviando datos al backend:', values);

      const response = await axios.post('http://10.198.56.228:5000/api/users/login', values);
      const { token, nombre } = response.data;

      console.log('✅ Login exitoso. Token recibido:', token);

      await AsyncStorage.setItem('token', token);

      Alert.alert(
        'Inicio de sesión exitoso',
        `Bienvenido, ${nombre}`,
        [{ text: 'Aceptar', onPress: () => onLogin() }]
      );
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data?.error || error.message);

      Alert.alert(
        'Error en el inicio de sesión',
        error.response?.data?.error || 'Error desconocido',
        [{ text: 'Aceptar' }]
      );
    }
  };

  return (
    <Animatable.View animation="fadeIn" duration={1000} style={styles.container}>
      {!isRegistering ? (
        <>
          <Animatable.View animation="bounceIn" duration={1500} style={styles.logoContainer}>
            <Image source={require('../Logooo.png')} style={styles.logo} />
          </Animatable.View>
          <TypeWriter typing={1} style={styles.title}>
            Bienvenido a Safelock
          </TypeWriter>
          <Animatable.View animation="fadeInUp" duration={1000} style={styles.formContainer}>
            <Formik
              initialValues={{ nombre: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Animatable.View animation="slideInLeft" duration={800} style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('nombre')}
                      onBlur={handleBlur('nombre')}
                      value={values.nombre}
                      placeholder="Ingrese su nombre"
                    />
                    {touched.nombre && errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
                  </Animatable.View>
                  <Animatable.View animation="slideInRight" duration={800} style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Ingrese su contraseña"
                    />
                    {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  </Animatable.View>
                  <Animatable.View animation="zoomIn" duration={800}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                </>
              )}
            </Formik>
            <TouchableOpacity onPress={() => setIsRegistering(true)}>
              <Text style={styles.toggleButton}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      ) : (
        <Registro onBack={() => setIsRegistering(false)} />
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: '100%',
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleButton: {
    marginTop: 20,
    color: '#007bff',
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Login;