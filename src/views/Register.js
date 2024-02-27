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
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../firebase/config";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const doRegister = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Registro bem-sucedido
        const user = userCredential.user;
        const userId = user.uid; // ID único do usuário
  
        // Armazene o nome do usuário no Realtime Database
        const db = getDatabase();
        set(ref(db, `users/${userId}/name`), name)
          .then(() => {
            // Nome armazenado com sucesso
          })
          .catch((error) => {
            console.error("Erro ao armazenar o nome do usuário:", error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          source={{
            uri: "https://media.tenor.com/2YJ8ecS0GBkAAAAi/cat-cats.gif",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
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
        <TouchableOpacity style={styles.button} onPress={() => doRegister()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginText}>
            Já tem uma conta? Faça Login aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#56e37c",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd",
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
    width: 110,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginText: {
    marginTop: 10,
    color: "#56e37c",
    textDecorationLine: "underline",
  },
});
