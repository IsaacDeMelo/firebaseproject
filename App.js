import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database"; // Importe os métodos necessários para acessar o Realtime Database
import firebaseAuth from "./src/firebase/config";
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import Register from "./src/views/Register";
import ForgotPassword from "./src/views/ForgotPassword";
import Application from "./src/views/Application"; // Importe a tela de Application

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [hasProfileData, setHasProfileData] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      if (user) {
        checkProfileData(user.uid);
      }
    });
  }, []);

  const checkProfileData = (userId) => {
    // Verifique se o usuário possui dados de perfil preenchidos no banco de dados
    // Você pode implementar esta função de acordo com a estrutura de seu banco de dados
    // Aqui, estou apenas verificando se há dados na localização users/{userId}/formData
    // Você pode personalizar isso conforme necessário para sua estrutura de dados
    const db = getDatabase();
    const userFormDataRef = ref(db, `users/${userId}/formData`);
    onValue(userFormDataRef, (snapshot) => {
      if (snapshot.exists()) {
        setHasProfileData(true);
      }
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          hasProfileData ? (
            // Se o usuário tiver dados de perfil, redirecione para a tela de aplicação
            <Stack.Screen
              name="Application"
              component={Application}
              options={{ headerShown: false }}
            />
          ) : (
            // Se o usuário não tiver dados de perfil, redirecione para a tela Home
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          )
        ) : (
          // Se o usuário não estiver autenticado, mostre as telas de autenticação
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
