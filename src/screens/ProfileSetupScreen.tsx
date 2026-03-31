import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileSetup">;

export default function ProfileSetupScreen({ navigation }: Props) {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState("");

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.replace("MainTabs");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressSegment, step >= 1 ? styles.progressActive : styles.progressInactive]} />
        <View style={[styles.progressSegment, step >= 2 ? styles.progressActive : styles.progressInactive]} />
        <View style={[styles.progressSegment, step >= 3 ? styles.progressActive : styles.progressInactive]} />
      </View>

      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>Basic Info & Location</Text>
          <Text style={styles.subtitle}>Help us adapt the prices and calories according to your lifestyle.</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.input} placeholder="e.g. 25" keyboardType="numeric" />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Weight (kg)</Text>
            <TextInput style={styles.input} placeholder="e.g. 70" keyboardType="numeric" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City (Wilaya)</Text>
            <TextInput style={styles.input} placeholder="e.g. Alger, Oran, Constantine" />
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>Health & Medical</Text>
          <Text style={styles.subtitle}>List any diseases, allergies or detailed medical antecedents.</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medical Conditions & Antecedents</Text>
            <TextInput style={[styles.input, styles.textArea]} multiline placeholder="Describe your diseases, allergies, or past operations (e.g. Type 2 Diabetes, Lactose Intolerant)..." />
          </View>

          <View style={styles.tagsContainer}>
             {["Diabète", "Hypertension", "Cholestérol", "Insuffisance rénale", "Anémie"].map((tag) => (
                <View key={tag} style={styles.tag}>
                   <Text style={styles.tagText}>{tag}</Text>
                </View>
             ))}
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>Lifestyle & Budget</Text>
          <Text style={styles.subtitle}>Adjust your daily meal structure and monthly budget.</Text>
          
          <View style={styles.rowInputs}>
             <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
               <Text style={styles.label}>Meals/Day</Text>
               <TextInput style={styles.input} placeholder="e.g. 3" keyboardType="numeric" />
             </View>
             
             <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
               <Text style={styles.label}>Max Cook Time</Text>
               <TextInput style={styles.input} placeholder="mins/meal" keyboardType="numeric" />
             </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Food Budget (DA)</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencyLabel}>DA</Text>
              <TextInput 
                style={styles.currencyInput} 
                placeholder="20,000" 
                keyboardType="numeric"
                value={budget}
                onChangeText={setBudget}
              />
            </View>
            <Text style={styles.helperText}>Recommended for 1 person: ~18,000 DA/month</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueButtonText}>
          {step < 3 ? "Continue" : "Generate Localized Plan"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  contentContainer: {
    paddingBottom: 60,
    flexGrow: 1,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 16,
  },
  progressSegment: {
    flex: 1,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  progressActive: {
    backgroundColor: "#10B981", // emerald-500
  },
  progressInactive: {
    backgroundColor: "#E5E7EB", // gray-200
  },
  stepContainer: {
    marginBottom: 32,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827", // gray-900
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280", // gray-500
    marginBottom: 32,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151", // gray-700
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F3F4F6", // gray-100
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  textArea: {
    height: 96,
    textAlignVertical: "top",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#10B981", // emerald-500
    backgroundColor: "#ECFDF5", // emerald-50
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8, // For polyfill of gap
    marginBottom: 8,
  },
  tagText: {
    color: "#047857", // emerald-700
    fontSize: 12,
    fontWeight: "600",
  },
  currencyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6EE7B7", // emerald-300
    backgroundColor: "#ECFDF5", // emerald-50
    borderRadius: 16,
    overflow: "hidden",
  },
  currencyLabel: {
    paddingHorizontal: 16,
    color: "#064E3B", // emerald-900
    fontWeight: "bold",
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#A7F3D0", // emerald-200
  },
  currencyInput: {
    flex: 1,
    padding: 16,
    fontWeight: "bold",
    fontSize: 20,
    color: "#065F46", // emerald-800
  },
  helperText: {
    fontSize: 12,
    color: "#059669", // emerald-600
    marginTop: 8,
  },
  continueButton: {
    backgroundColor: "#059669", // emerald-600
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: "auto",
    marginBottom: 40,
    shadowColor: "#6EE7B7",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  continueButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

