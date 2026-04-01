// screens/auth/LifestyleScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, spacing } from '../../theme/theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Lifestyle'>;
  route: RouteProp<AuthStackParamList, 'Lifestyle'>;
};

type WorkType = 'sedentary' | 'active' | 'physical';
type ActivityLevel = 'none' | 'light' | 'moderate' | 'intense';

export default function LifestyleScreen({ navigation, route }: Props) {
  const [workType, setWorkType] = useState<WorkType | ''>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | ''>('');

  const workOptions = [
    { value: 'sedentary', label: 'Office/Desk Job (Sitting most of the day)' },
    { value: 'active', label: 'Active Job (Standing, walking frequently)' },
    { value: 'physical', label: 'Physical Labor (Construction, farming, etc.)' },
  ];

  const activityOptions = [
    { value: 'none', label: 'No exercise' },
    { value: 'light', label: 'Light (1-2 times/week)' },
    { value: 'moderate', label: 'Moderate (3-4 times/week)' },
    { value: 'intense', label: 'Intense (5+ times/week)' },
  ];

  const handleNext = () => {
    if (!workType || !activityLevel) {
      Alert.alert('Error', 'Please select your lifestyle information');
      return;
    }

    navigation.navigate('Health', {
      ...route.params,
      workType,
      activityLevel,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Lifestyle & Activity</Text>
          <Text style={styles.subtitle}>
            This helps us understand your daily energy needs
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What type of work do you do?</Text>
          {workOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                workType === option.value && styles.optionCardActive,
              ]}
              onPress={() => setWorkType(option.value as WorkType)}
            >
              <Text
                style={[
                  styles.optionText,
                  workType === option.value && styles.optionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Activity</Text>
          <Text style={styles.sectionSubtitle}>
            How often do you exercise?
          </Text>
          {activityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                activityLevel === option.value && styles.optionCardActive,
              ]}
              onPress={() => setActivityLevel(option.value as ActivityLevel)}
            >
              <Text
                style={[
                  styles.optionText,
                  activityLevel === option.value && styles.optionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  optionCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionCardActive: {
    backgroundColor: colors.secondary + '10',
    borderColor: colors.secondary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  optionTextActive: {
    color: colors.secondary,
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