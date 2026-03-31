import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>My Progress</Text>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Weight</Text>
          <Text style={styles.statValue}>74<Text style={styles.statUnit}>kg</Text></Text>
          <Text style={styles.statChange}>↓ 1.2kg this month</Text>
        </View>

        <View style={[styles.statCard, { marginLeft: 16 }]}>
          <Text style={styles.statLabel}>Adherence</Text>
          <Text style={styles.statValue}>86<Text style={styles.statUnit}>%</Text></Text>
          <Text style={styles.statChange}>↑ better than last week</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Budget Health</Text>

      {/* Budget Progress */}
      <View style={styles.budgetContainer}>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Spent (DA)</Text>
          <Text style={styles.budgetSpentValue}>8,450</Text>
        </View>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Monthly Budget (DA)</Text>
          <Text style={styles.budgetTotalValue}>20,000</Text>
        </View>
        
        {/* Simple Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: '42%' }]} />
        </View>
        <Text style={styles.budgetHelperText}>You are saving roughly 12% compared to your goal!</Text>
      </View>

      <Text style={styles.sectionTitle}>Week at a Glance</Text>
      <View style={styles.weekGlanceContainer}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <View key={i} style={styles.dayGlance}>
            <View style={[
              styles.dayCircle,
              i < 3 ? styles.dayCircleSuccess : i === 3 ? styles.dayCircleFail : styles.dayCirclePending
            ]}>
              {i < 3 ? <Text style={styles.dayCircleText}>✓</Text> : i === 3 ? <Text style={styles.dayCircleText}>✕</Text> : null}
            </View>
            <Text style={styles.dayGlanceText}>{d}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // gray-50
  },
  contentContainer: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#064E3B", // emerald-900
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // gray-200
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  statLabel: {
    color: "#6B7280", // gray-500
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827", // gray-900
  },
  statUnit: {
    fontSize: 14,
    fontWeight: "normal",
  },
  statChange: {
    color: "#10B981", // emerald-500
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937", // gray-800
    marginBottom: 16,
  },
  budgetContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  budgetLabel: {
    color: "#6B7280", // gray-500
    fontWeight: "bold",
  },
  budgetSpentValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#DC2626", // red-600
  },
  budgetTotalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827", // gray-900
  },
  progressBarContainer: {
    width: "100%",
    backgroundColor: "#F3F4F6", // gray-100
    height: 12,
    flexDirection: "row",
    borderRadius: 9999,
    overflow: "hidden",
    marginBottom: 8,
    marginTop: 8,
  },
  progressBarFill: {
    backgroundColor: "#10B981", // emerald-500
    height: 12,
    borderRadius: 9999,
  },
  budgetHelperText: {
    color: "#9CA3AF", // gray-400
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  weekGlanceContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayGlance: {
    alignItems: "center",
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  dayCircleSuccess: {
    backgroundColor: "#10B981", // emerald-500
  },
  dayCircleFail: {
    backgroundColor: "#F87171", // red-400
  },
  dayCirclePending: {
    backgroundColor: "#F3F4F6", // gray-100
  },
  dayCircleText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  dayGlanceText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#9CA3AF", // gray-400
  },
});
