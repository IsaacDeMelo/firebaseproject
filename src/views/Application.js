import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseAuth from "../firebase/config";

export default function Application() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userAge, setUserAge] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const userId = firebaseAuth.currentUser.uid;
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/formData`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserData(data);
        setUserEmail(data.age);
        setUserSex(data.sex);
        setUserAge(data.age);
      }
    });
    fetchUserName(userId);
  };

  const fetchUserName = (userId) => {
    const db = getDatabase();
    const nameRef = ref(db, `users/${userId}/name`);

    onValue(nameRef, (snapshot) => {
      const name = snapshot.val();
      setUserName(name);
    });
  };

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userData.profileUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>{userName}</Text>
          <Text style={styles.emailText}>{firebaseAuth.currentUser.email}</Text>
          <Text style={styles.detailText}>Sexo: {userSex}</Text>
          <Text style={styles.detailText}>Idade: {userAge}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emailText: {
    fontSize: 18,
  },
  detailText: {
    fontSize: 16,
    marginTop: 5,
  },
});
