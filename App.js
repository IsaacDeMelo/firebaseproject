import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "./src/firebase/config";
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import Register from "./src/views/Register";
import ForgotPassword from "./src/views/ForgotPassword";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }} // Oculta a barra de navegação para a tela Home
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }} // Oculta a barra de navegação para a tela de login
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }} // Oculta a barra de navegação para a tela de registro
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
