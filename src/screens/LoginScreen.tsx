import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🍲</Text>
        </View>
        
        <Text style={styles.title}>DZ Meal Plan</Text>
        
        <Text style={styles.subtitle}>
          Healthy Algerian Meals, Tailored to You & Your Budget.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("ProfileSetup")}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // gray-50
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    height: 192, // 48 * 4
    width: 192,
    backgroundColor: "#D1FAE5", // emerald-100
    borderRadius: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    shadowColor: "#A7F3D0", // emerald-200
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  icon: {
    fontSize: 72,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#064E3B", // emerald-900
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280", // gray-500
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 48,
  },
  footer: {
    width: "100%",
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#059669", // emerald-600
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#6EE7B7", // emerald-300
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 16,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#047857", // emerald-700
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});