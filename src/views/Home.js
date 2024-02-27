import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseAuth from "../firebase/config";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [sex, setSex] = useState("");

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}/name`);

        onValue(userRef, (snapshot) => {
          const name = snapshot.val();
          if (name) {
            setUserName(name);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logout realizado com sucesso!");
        // Implemente qualquer outra ação necessária após o logout
      })
      .catch((error) => {
        console.error("Erro ao realizar logout:", error);
      });
  };

  const handleFormSubmit = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const db = getDatabase();
    const userFormDataRef = ref(db, `users/${userId}/formData`);

    const formData = {
      age: age,
      profileUrl: profileUrl,
      sex: sex
    };

    set(userFormDataRef, formData)
      .then(() => {
        console.log("Dados do formulário salvos com sucesso!");
        // Limpar os campos do formulário após o envio
        setAge("");
        setProfileUrl("");
        setSex("");
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados do formulário:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {userName}</Text>
      <Button title="Sair" onPress={handleSignOut} />

      <Text style={styles.formTitle}>Formulário de Informações do Usuário:</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Idade"
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Perfil (URL)"
          onChangeText={setProfileUrl}
          value={profileUrl}
        />
        <View style={styles.sexContainer}>
          <Text style={styles.sexLabel}>Sexo:</Text>
          <TouchableOpacity
            style={[styles.sexOption, sex === "masculino" && styles.selectedSexOption]}
            onPress={() => setSex("masculino")}
          >
            <Text style={styles.sexOptionText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sexOption, sex === "feminino" && styles.selectedSexOption]}
            onPress={() => setSex("feminino")}
          >
            <Text style={styles.sexOptionText}>Feminino</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Enviar" onPress={handleFormSubmit} />
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
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sexLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  sexOption: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedSexOption: {
    backgroundColor: "#0056b3",
  },
  sexOptionText: {
    color: "#fff",
  },
});
