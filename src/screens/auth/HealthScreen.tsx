// screens/auth/HealthScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, spacing } from '../../theme/theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Health'>;
  route: RouteProp<AuthStackParamList, 'Health'>;
};

type HealthCondition = {
  id: string;
  name: string;
  selected: boolean;
};

export default function HealthScreen({ navigation, route }: Props) {
  const [conditions, setConditions] = useState<HealthCondition[]>([
    { id: 'diabetes', name: 'Diabetes', selected: false },
    { id: 'hypertension', name: 'Hypertension', selected: false },
    { id: 'cholesterol', name: 'High Cholesterol', selected: false },
    { id: 'celiac', name: 'Celiac Disease', selected: false },
    { id: 'allergies', name: 'Food Allergies', selected: false },
    { id: 'kidney', name: 'Kidney Disease', selected: false },
    { id: 'thyroid', name: 'Thyroid Issues', selected: false },
    { id: 'heart', name: 'Heart Disease', selected: false },
  ]);
  const [otherConditions, setOtherConditions] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');

  const toggleCondition = (id: string) => {
    setConditions(prev =>
      prev.map(condition =>
        condition.id === id
          ? { ...condition, selected: !condition.selected }
          : condition
      )
    );
  };

  const handleNext = () => {
    const selectedConditions = conditions
      .filter(c => c.selected)
      .map(c => c.name);

    navigation.navigate('Budget', {
      ...route.params,
      healthConditions: selectedConditions,
      otherConditions,
      dietaryRestrictions,
      foodPreferences,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Profile</Text>
          <Text style={styles.subtitle}>
            This helps us recommend meals that are safe for you
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Conditions</Text>
          <Text style={styles.sectionSubtitle}>
            Select any conditions you have (optional)
          </Text>
          <View style={styles.conditionsGrid}>
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition.id}
                style={[
                  styles.conditionChip,
                  condition.selected && styles.conditionChipActive,
                ]}
                onPress={() => toggleCondition(condition.id)}
              >
                <Text
                  style={[
                    styles.conditionText,
                    condition.selected && styles.conditionTextActive,
                  ]}
                >
                  {condition.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Conditions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please specify any other conditions"
            placeholderTextColor={colors.textSecondary}
            value={otherConditions}
            onChangeText={setOtherConditions}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Restrictions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g., No pork, vegetarian, vegan, halal only"
            placeholderTextColor={colors.textSecondary}
            value={dietaryRestrictions}
            onChangeText={setDietaryRestrictions}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Preferences</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Foods you love or hate"
            placeholderTextColor={colors.textSecondary}
            value={foodPreferences}
            onChangeText={setFoodPreferences}
            multiline
            numberOfLines={3}
          />
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
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  conditionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: colors.surface,
  },
  conditionChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  conditionText: {
    fontSize: 14,
    color: colors.text,
  },
  conditionTextActive: {
    color: colors.surface,
    fontWeight: '500',
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