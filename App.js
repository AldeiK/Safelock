import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './plantilla/Home';
import DispositivosEnPropiedad from './plantilla/DispositivosEnPropiedad';
import Notificaciones from './plantilla/Notificaciones';
import RegistrosDeAcceso from './plantilla/RegistrosDeAcceso';
import Login from './plantilla/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pasamos la navegación al componente Login */}
        <Stack.Screen name="Login">
          {({ navigation }) => <Login onLogin={() => navigation.navigate('Inicio')} />}
        </Stack.Screen>
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="DispositivosEnPropiedad" component={DispositivosEnPropiedad} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="RegistroDeAcceso" component={RegistrosDeAcceso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;