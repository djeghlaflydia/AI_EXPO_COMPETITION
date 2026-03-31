import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../theme/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diet & Health</Text>
          <Text style={styles.infoText}>Activity: Moderately Active</Text>
          <Text style={styles.infoText}>Conditions: None reported</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget limit</Text>
          <Text style={styles.infoText}>Monthly: 15,000 DA</Text>
        </View>

        <TouchableOpacity style={styles.recalcButton}>
          <Text style={styles.recalcButtonText}>Recalculate Plan (AI)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  recalcButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  recalcButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    padding: spacing.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
