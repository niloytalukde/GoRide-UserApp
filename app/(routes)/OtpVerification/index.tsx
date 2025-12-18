import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import api from "@/app/utils/api.axios";

export default function OtpVerification() {
  const {phone_number} = useLocalSearchParams();
  console.log(phone_number,"phone number");
  const inputs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading,setLoading]=useState(false)

  const handleChange = (text: any, index: any) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < 6) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
try {
      setLoading(true);

      const res = await api.post(
        `/api/v1/verify-otp`,
        { phone_number: phone_number,otp:otp }
      );

      console.log("API Success:", res.data);

      router.push({pathname:"/(routes)/registration/index",params:{phone_number}});
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Enter Your OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to your Phone Number.
          </Text>

          {/* OTP Inputs */}
          <View style={styles.otpRow}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  card: {
    width: 380,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  otpRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 32,
  },
  otpInput: {
    width: 48,
    height: 48,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    fontSize: 20,
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
    color: "white",
    fontSize: 14,
  },
});
