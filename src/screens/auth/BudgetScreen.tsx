// screens/auth/BudgetScreen.tsx
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
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Budget'>;
  route: RouteProp<AuthStackParamList, 'Budget'>;
};

export default function BudgetScreen({ navigation, route }: Props) {
  const [budget, setBudget] = useState('');
  const [familySize, setFamilySize] = useState('1');
  const [additionalNotes, setAdditionalNotes] = useState('');
const handleComplete = async () => {
  if (!budget) {
    Alert.alert('Error', 'Please enter your monthly food budget');
    return;
  }

  const budgetNumber = parseInt(budget);
  if (isNaN(budgetNumber) || budgetNumber <= 0) {
    Alert.alert('Error', 'Please enter a valid budget amount');
    return;
  }

  const completeProfile = {
    ...route.params,
    monthlyBudget: budgetNumber,
    familySize: parseInt(familySize),
    additionalNotes,
  };

  console.log('Complete Profile:', completeProfile);
  
  navigation.navigate('AILoading');
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Monthly Budget</Text>
          <Text style={styles.subtitle}>
            Tell us your budget so we can plan affordable meals
          </Text>
        </View>

        <View style={styles.budgetCard}>
          <Text style={styles.budgetLabel}>Monthly Food Budget (DA)</Text>
          <TextInput
            style={styles.budgetInput}
            placeholder="e.g., 20000"
            placeholderTextColor={colors.textSecondary}
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <Text style={styles.budgetHint}>
            This helps us suggest meals that fit your wallet
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Size</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of people in household"
            placeholderTextColor={colors.textSecondary}
            value={familySize}
            onChangeText={setFamilySize}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any other information you'd like us to know?"
            placeholderTextColor={colors.textSecondary}
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Profile Summary</Text>
          <Text style={styles.summaryText}>
            We'll use this information to create a personalized Algerian meal
            plan that matches your health needs, lifestyle, and budget.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>continuer</Text>
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
  budgetCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  budgetInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    padding: spacing.sm,
    width: '100%',
  },
  budgetHint: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  summaryCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});