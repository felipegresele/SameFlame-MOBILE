import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStackParamList } from './src/types/routes';
import BoasVindas from './src/pages/BoasVindas';
import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import Mapa from './src/pages/Mapa';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './src/pages/Dashboard';
import Emergencia from './src/pages/Emergencia';
import Alerta from './src/pages/Alerta';
import RelatarIncendio from './src/pages/RelatarIncendio';



export default function App() {
  
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator<RootStackParamList>()

  function AppDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "black"
          },
          headerTintColor: "#fff",
          drawerStyle: {backgroundColor: "white"},
          drawerLabelStyle: {color: "#000"},
        }}>
          <Drawer.Screen name="Mapa" component={Mapa} />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="RelatarIncendio" component={RelatarIncendio} options={{title: "Relatar Incêndio"}}/>
          <Drawer.Screen name="Alertas" component={Alerta}/>
          <Drawer.Screen name="Emergencia" component={Emergencia} options={{title: "Emergência", headerTintColor: "red"}} />
      </Drawer.Navigator>
    )
  }
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='BoasVindas' screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "black",
          },
        }}>
          <Stack.Screen name="BoasVindas" component={BoasVindas} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }}/>
        </Stack.Navigator>
        
      </NavigationContainer>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
