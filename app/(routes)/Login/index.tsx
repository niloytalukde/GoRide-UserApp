import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/vedio/otpcablogo.png")}
        style={styles.logo}
      />

      <Image
        source={require("../../assets/vedio/imageHand-removebg-preview.png")}
        style={styles.welcomeImg}
      />
      <Text style={styles.text}>Your app for Fair deals</Text>
      <Text style={styles.Subtext}>Choice best rider for You</Text>
      <TouchableOpacity onPress={()=>router.push("/(routes)/InputNumber")} style={styles.btn}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Continue with Phone Number
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  logo: {
    height: 100,
    width: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  welcomeImg: {
    height: 400,
    width: 400,
    alignSelf: "center",
    resizeMode: "cover",
  },
  text: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
  Subtext: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
  },
});

export default Login;
