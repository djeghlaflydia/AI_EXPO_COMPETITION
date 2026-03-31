import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme/theme';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Health</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weight Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>[ Chart Placeholder ]</Text>
          </View>
          <Text style={styles.statText}>Current: 78 kg (-1.2 kg this week)</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Adherence Score</Text>
          <Text style={styles.scoreText}>85%</Text>
          <Text style={styles.statText}>You followed the plan most days. Good job!</Text>
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
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: spacing.xs,
  },
});
