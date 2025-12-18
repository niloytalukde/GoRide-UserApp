import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Toast } from "react-native-toast-notifications";
import api from "@/app/utils/api.axios";

const InputNumber = () => {
  const [phone, setPhone] = useState("+91");
  const [loading, setLoading] = useState(false);

  // +91XXXXXXXXXX → total length 13
  const isValidPhone = /^\+91[6-9]\d{9}$/.test(phone);

  const handleSubmit = async () => {
    if (!isValidPhone) {
      Toast.show("Please enter a valid phone number", {
        placement: "top",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(`/api/v1/register`, { phone_number: phone });

      console.log("API Success:", res.data);
      console.log(phone);

      router.push({
        pathname: "/(routes)/OtpVerification",
        params: { phone_number: phone },
      });
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>

        <Text style={styles.text}>Join us via Phone Number</Text>
        <Text style={styles.subtext}>
          We will send you a code to verify your number.
        </Text>

        {/* Phone Input */}
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => {
            if (!text.startsWith("+91")) return;
            setPhone(text);
          }}
          keyboardType="phone-pad"
          inputMode="tel"
          placeholder="Enter phone number"
          placeholderTextColor="#aaa"
          maxLength={13}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValidPhone || loading}
          style={[styles.btn, (!isValidPhone || loading) && styles.btnDisabled]}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.btnText}>Send OTP</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InputNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtext: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    color: "white",
    marginTop: 20,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 30,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 8,
  },
  btnDisabled: {
    backgroundColor: "#555",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
