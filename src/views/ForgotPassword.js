import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import firebaseAuth from "../firebase/config";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = () => {
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      });
  };

  const handleReturnToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {emailSent ? (
        <>
          <Image
            source={{
              uri: "https://media.tenor.com/qYo16C56UaYAAAAi/cats-cat.gif",
            }}
            style={styles.logo}
          />
          <View>
            <Text style={styles.confirmationText}>
              Um e-mail de redefinição de senha foi enviado para:
            </Text>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.returnText}>
              Por favor, verifique seu e-mail e siga as instruções para
              redefinir sua senha.
            </Text>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={handleReturnToLogin}
            >
              <Text style={styles.returnButtonText}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image
            source={{
              uri: "https://media.tenor.com/BhQtysGX9fkAAAAi/cat-cats.gif",
            }}
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>Esqueci minha senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleResetPassword()}
            >
              <Text style={styles.buttonText}>
                Enviar e-mail de redefinição
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#56e37c",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#56e37c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  returnText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: "#56e37c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
