import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import ForgotPassword from "./ForgotPassword";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    });
  };

  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      {/* Background com a imagem borrada */}
      <View style={styles.backgroundImageContainer}></View>

      <View style={styles.formContainer}>
        <Image
          source={{
            uri: "https://media.tenor.com/r8qEfFn85EYAAAAi/cat-cats.gif",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        {errorMessage && (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity
              onPress={closeErrorMessage}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => doLogin()}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.registerText}>
            Não tem uma conta? Registre-se aqui!
          </Text>
          <TouchableOpacity onPress={goToForgotPassword}>
            <Text style={styles.registerText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#56e37c",
  },
  backgroundImageContainer: {
    //...StyleSheet.absoluteFillObject,
    //backgroundColor: 'rgba(0, 0, 0, 0.3)', // fundo preto translúcido
    // Importante: ajuste a largura e altura da imagem conforme necessário
    //backgroundSize: 'cover',
    //backgroundImage: 'url(https://wallpapercave.com/wp/wp6705697.jpg)',
    //filter: 'blur(3px)', // aplica o efeito de desfoque
  },
  formContainer: {
    backgroundColor: "white", // fundo branco translúcido
    padding: 20,
    borderRadius: 10,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd", // cor da borda
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#56e37c",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  errorMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffdddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  button: {
    backgroundColor: "#56e37c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 100,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerText: {
    marginTop: 10,
    color: "#56e37c",
    textDecorationLine: "underline",
  },
});
