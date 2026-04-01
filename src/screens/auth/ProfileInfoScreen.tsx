// screens/auth/ProfileInfoScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, spacing } from '../../theme/theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ProfileInfo'>;
  route: RouteProp<AuthStackParamList, 'ProfileInfo'>;
};

export default function ProfileInfoScreen({ navigation, route }: Props) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [goal, setGoal] = useState('');

  const handleNext = () => {
    if (!height || !weight || !gender || !goal) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Navigate to next step with all collected data
    navigation.navigate('Lifestyle', {
      ...route.params,
      height: parseFloat(height),
      weight: parseFloat(weight),
      gender,
      goal,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            This helps us create a personalized plan for you
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your height"
              placeholderTextColor={colors.textSecondary}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight"
              placeholderTextColor={colors.textSecondary}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'male' && styles.genderOptionActive,
                ]}
                onPress={() => setGender('male')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === 'male' && styles.genderTextActive,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  gender === 'female' && styles.genderOptionActive,
                ]}
                onPress={() => setGender('female')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === 'female' && styles.genderTextActive,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Goal</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What's your health goal? (e.g., lose weight, gain muscle, maintain health)"
              placeholderTextColor={colors.textSecondary}
              value={goal}
              onChangeText={setGoal}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: colors.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  genderOption: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  genderOptionActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  genderText: {
    fontSize: 16,
    color: colors.text,
  },
  genderTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});