import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, shadows } from '../../theme/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greeting}>Sbah el Khir, Ahmed!</Text>
        <Text style={styles.dateText}>April 15, 2026</Text>

        <View style={styles.summaryContainer}>
          <View style={[styles.card, styles.calorieCard]}>
            <Text style={styles.cardTitle}>Calories</Text>
            <Text style={styles.cardInfo}>1850 / 2200 kcal</Text>
          </View>
          <View style={[styles.card, styles.budgetCard]}>
            <Text style={styles.cardTitle}>Daily Budget</Text>
            <Text style={styles.cardInfo}>450 / 800 DA</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Up Next: Lunch</Text>
        <View style={styles.mealCard}>
          <Text style={styles.mealName}>Frik Soup & Grilled Chicken Salad</Text>
          <Text style={styles.mealMacros}>450 kcal • 30g Protein • Cost: 250 DA</Text>
        </View>

        <Text style={styles.sectionTitle}>Daily Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>You're 200 DA under budget today! Great job sticking to the plan.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 60, // Top margin
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  dateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  card: {
    ...shadows.small,
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
  },
  calorieCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  budgetCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  mealCard: {
    ...shadows.small,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  mealMacros: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  insightCard: {
    backgroundColor: '#E8F5E9',
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.success,
  },
  insightText: {
    color: colors.success,
    fontSize: 14,
    lineHeight: 20,
  },
});
