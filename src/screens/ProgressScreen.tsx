import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ProgressScreen() {
  // Mocking the backend user 'progression' payload
  const progressionData = {
    weight: { current: 74, change: "-1.2kg" },
    glycemia: { current: "1.05", unit: "g/L", status: "Stable" },
    tension: { current: "12/8", unit: "mmHg", status: "Normal" },
    adherence: { value: 86, text: "↑ better than last week" },
    budget: {
      spent: 8450, // DA
      monthlyTarget: 18000, // 600 * 30 DA
    },
    weekGlance: [
      { day: "M", status: "success" },
      { day: "T", status: "success" },
      { day: "W", status: "success" },
      { day: "T", status: "warning" },
      { day: "F", status: "pending" },
      { day: "S", status: "pending" },
      { day: "S", status: "pending" },
    ]
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>My Medical Progress</Text>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Weight</Text>
          <Text style={styles.statValue}>{progressionData.weight.current}<Text style={styles.statUnit}>kg</Text></Text>
          <Text style={styles.statChange}>↓ {progressionData.weight.change} this month</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Adherence Plan</Text>
          <Text style={styles.statValue}>{progressionData.adherence.value}<Text style={styles.statUnit}>%</Text></Text>
          <Text style={styles.statChange}>{progressionData.adherence.text}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Fasting Glycemia</Text>
          <Text style={styles.statValue}>{progressionData.glycemia.current}<Text style={styles.statUnit}>{progressionData.glycemia.unit}</Text></Text>
          <Text style={styles.statChangeNeutral}>• {progressionData.glycemia.status}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Blood Pressure</Text>
          <Text style={styles.statValue}>{progressionData.tension.current}<Text style={styles.statUnit}></Text></Text>
          <Text style={styles.statChangeNeutral}>• {progressionData.tension.status}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Budget Health</Text>

      {/* Budget Progress */}
      <View style={styles.budgetContainer}>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Monthly Spent (DA)</Text>
          <Text style={styles.budgetSpentValue}>{progressionData.budget.spent.toLocaleString()}</Text>
        </View>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Monthly Limit (DA)</Text>
          <Text style={styles.budgetTotalValue}>{progressionData.budget.monthlyTarget.toLocaleString()}</Text>
        </View>
        
        {/* Simple Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${(progressionData.budget.spent / progressionData.budget.monthlyTarget) * 100}%` }]} />
        </View>
        <Text style={styles.budgetHelperText}>You are saving roughly 12% compared to your goal, thanks to the optimizer!</Text>
      </View>

      <Text style={styles.sectionTitle}>Week at a Glance</Text>
      <View style={styles.weekGlanceContainer}>
        {progressionData.weekGlance.map((d, i) => (
          <View key={i} style={styles.dayGlance}>
            <View style={[
              styles.dayCircle,
              d.status === 'success' ? styles.dayCircleSuccess : d.status === 'warning' ? styles.dayCircleWarning : styles.dayCirclePending
            ]}>
              {d.status === 'success' ? <Text style={styles.dayCircleText}>✓</Text> : d.status === 'warning' ? <Text style={styles.dayCircleText}>!</Text> : null}
            </View>
            <Text style={styles.dayGlanceText}>{d.day}</Text>
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
    rowGap: 16,
  },
  statCard: {
    width: "48%",
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
    textAlign: "center",
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
  statChangeNeutral: {
    color: "#6B7280", // gray-500
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
  dayCircleWarning: {
    backgroundColor: "#F59E0B", // amber-500
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

