import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '../../theme/theme';

export default function GroceryListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>El Marché</Text>
        <Text style={styles.budgetStatus}>Estimated: 4,500 DA / 5,000 DA</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.categoryBlock}>
          <Text style={styles.categoryTitle}>Lkhodra (Produce)</Text>
          <View style={styles.itemRow}>
            <View style={styles.checkCircle} />
            <Text style={styles.itemName}>Onions (Bessla) - 1kg</Text>
          </View>
          <View style={styles.itemRow}>
            <View style={styles.checkCircle} />
            <Text style={styles.itemName}>Tomatoes - 2kg</Text>
          </View>
        </View>
        <View style={styles.categoryBlock}>
          <Text style={styles.categoryTitle}>Boucherie (Meat)</Text>
          <View style={styles.itemRow}>
            <View style={styles.checkCircle} />
            <Text style={styles.itemName}>Chicken Breast - 500g</Text>
          </View>
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
  header: {
    padding: spacing.lg,
    paddingTop: 60,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  budgetStatus: {
    fontSize: 14,
    color: colors.warning, // Getting close to limit
    marginTop: spacing.xs,
    fontWeight: 'bold',
  },
  content: {
    padding: spacing.lg,
  },
  categoryBlock: {
    marginBottom: spacing.xl,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.secondary,
    marginRight: spacing.md,
  },
  itemName: {
    fontSize: 16,
    color: colors.text,
  },
});
