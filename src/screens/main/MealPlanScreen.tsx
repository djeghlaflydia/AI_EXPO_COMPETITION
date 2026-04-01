import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme/theme';

export default function MealPlanScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Plan</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Monday</Text>
        <View style={styles.mealCard}>
          <Text style={styles.mealTime}>Breakfast</Text>
          <Text style={styles.mealName}>Bsisa with Olive Oil</Text>
          <Text style={styles.mealCost}>Est. Cost: 50 DA</Text>
        </View>
        <View style={styles.mealCard}>
          <Text style={styles.mealTime}>Lunch</Text>
          <Text style={styles.mealName}>Rechta with Chicken</Text>
          <Text style={styles.mealCost}>Est. Cost: 300 DA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: 60,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    padding: spacing.lg,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  mealCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: spacing.md,
    elevation: 2,
  },
  mealTime: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  mealName: {
    fontSize: 16,
    color: colors.text,
    marginVertical: spacing.xs,
  },
  mealCost: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
