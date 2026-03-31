import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, spacing } from '../../theme/theme';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OnboardingWizard'>;
};

export default function OnboardingWizardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NutriAlgérie</Text>
      <Text style={styles.subtitle}>Let's build your AI meal plan profile</Text>
      
      {/* Placeholder for wizard steps */}
      <View style={styles.card}>
        <Text style={styles.cardText}>1. Basic Info</Text>
        <Text style={styles.cardText}>2. Lifestyle</Text>
        <Text style={styles.cardText}>3. Medical Profile</Text>
        <Text style={styles.cardText}>4. Dietary Preferences</Text>
        <Text style={styles.cardText}>5. Monthly Budget Limit (DA)</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('AILoading')}
      >
        <Text style={styles.buttonText}>Generate Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    width: '100%',
    marginBottom: spacing.xxl,
    borderColor: colors.border,
    borderWidth: 1,
  },
  cardText: {
    fontSize: 16,
    color: colors.text,
    marginVertical: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
