import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";


export default function QuickLogin() {
  const {phone_number} = useLocalSearchParams();
  const [name,setName]=useState("")
   const [email,setEmail]=useState("")
  return (
    <View style={styles.container}>
  <SafeAreaView>
       <ScrollView>
       <View>
        {/* Icon */}
        <View style={styles.logo}>
         <Image
                 source={require("../../assets/vedio/otpcablogo.png")}
                 style={styles.logo}
               />
        </View>

        {/* Title */}
        <Text style={styles.title}>Quick Register and book your first ride </Text>

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Number Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter number"
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            maxLength={15}
          />
        </View>

         {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter Email"
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            maxLength={15}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Forgot */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Need Help?</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
  </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal:20,
  alignContent:"center"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
    width:"100%"
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
  },
  button: {
      marginTop: 40,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  forgot: {
    textAlign: "center",
    color: "#EF4444",
    fontSize: 13,
    marginTop: 16,
  },
  logo: {
    height: 100,
    width: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
});

