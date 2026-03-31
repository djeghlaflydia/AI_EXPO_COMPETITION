import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function DashboardScreen() {
  // Mocking the backend payload as described in the API documentation
  const dashboardPayload = {
    profile: {
      name: "Amine \uD83C\uDDE9\uD83C\uDDFF",
      objective: "Perte de poids",
      pathology: "Pré-diabète",
      budget: 600, // DA per day
    },
    budget: {
      spent: 450,
      budget_ok: true,
      projection: 2058, // Weekly projection
    },
    healthLimits: {
      sugar: "Max 25g (Pré-diabète)",
      sodium: "Max 2000mg",
      fibers: "Min 30g",
    },
    macros: {
      calories: { current: 1300, target: 1800 },
      proteins: { current: 65, target: 120 },
      carbs: { current: 140, target: 180 },
      fats: { current: 45, target: 60 },
    },
    todayMeals: [
      { id: 1, type: "Breakfast", name: "Flocons d'avoine & Dattes", time: "08:00 AM", calories: 350, color: "#FFEDD5" },
      { id: 2, type: "Lunch", name: "Loubia Saine (sans viande)", time: "01:00 PM", calories: 550, color: "#FEE2E2" },
      { id: 3, type: "Dinner", name: "Poulet Grillé & Salade", time: "07:30 PM", calories: 400, color: "#D1FAE5" },
    ]
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>{dashboardPayload.profile.name}</Text>
          <Text style={styles.profileMeta}>{dashboardPayload.profile.objective} • {dashboardPayload.profile.pathology}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
      </View>

      {/* Budget Tracker Widget */}
      <View style={[styles.budgetWidget, !dashboardPayload.budget.budget_ok && styles.budgetWidgetWarning]}>
        <View style={styles.budgetHeader}>
          <Text style={styles.budgetTitle}>Today's Budget</Text>
          {dashboardPayload.budget.budget_ok && <View style={styles.budgetOkBadge}><Text style={styles.budgetOkText}>Budget OK</Text></View>}
        </View>
        <Text style={styles.budgetValue}>{dashboardPayload.budget.spent} DA <Text style={styles.budgetLimit}>/ {dashboardPayload.profile.budget} DA</Text></Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${(dashboardPayload.budget.spent / dashboardPayload.profile.budget) * 100}%` }]} />
        </View>
        <Text style={styles.budgetStatus}>Weekly Projection: ~{dashboardPayload.budget.projection} DA</Text>
      </View>

      <Text style={styles.sectionTitle}>Nutrition & Macros</Text>
      
      {/* Macros */}
      <View style={styles.macrosContainer}>
        <MacroRing label="Calories" current={dashboardPayload.macros.calories.current} target={dashboardPayload.macros.calories.target} color="#F59E0B" />
        <MacroRing label="Proteins" current={dashboardPayload.macros.proteins.current} target={dashboardPayload.macros.proteins.target} color="#EF4444" />
        <MacroRing label="Carbs" current={dashboardPayload.macros.carbs.current} target={dashboardPayload.macros.carbs.target} color="#3B82F6" />
        <MacroRing label="Fats" current={dashboardPayload.macros.fats.current} target={dashboardPayload.macros.fats.target} color="#10B981" />
      </View>

      <Text style={styles.sectionTitle}>Medical Constraints</Text>
      <View style={styles.constraintsContainer}>
        <View style={styles.constraintBadge}><Text style={styles.constraintText}>🩸 {dashboardPayload.healthLimits.sugar}</Text></View>
        <View style={styles.constraintBadge}><Text style={styles.constraintText}>🌿 {dashboardPayload.healthLimits.fibers}</Text></View>
        <View style={styles.constraintBadge}><Text style={styles.constraintText}>🧂 {dashboardPayload.healthLimits.sodium}</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Today's Plan</Text>

      {/* Meal Cards */}
      <View style={styles.mealsContainer}>
        {dashboardPayload.todayMeals.map((meal) => (
          <MealCard key={meal.id} title={meal.type} meal={meal.name} time={meal.time} calories={`${meal.calories} kcal`} color={meal.color} />
        ))}
      </View>
    </ScrollView>
  );
}

function MacroRing({ label, current, target, color }: any) {
  return (
    <View style={styles.macroRingContainer}>
      <View style={[styles.macroCircle, { borderColor: color }]}>
        <Text style={styles.macroValue}>{current}</Text>
        <Text style={styles.macroTarget}>/{target}</Text>
      </View>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

function MealCard({ title, meal, time, calories, color }: any) {
  return (
    <TouchableOpacity style={[styles.mealCard, { backgroundColor: color }]}>
      <View style={styles.mealCardTextContainer}>
        <Text style={styles.mealCardTitle}>{title} • {time}</Text>
        <Text style={styles.mealCardName}>{meal}</Text>
      </View>
      <View style={styles.caloriesBadge}>
        <Text style={styles.caloriesText}>{calories}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    padding: 24,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeText: {
    color: "#6B7280",
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#064E3B",
  },
  profileMeta: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "600",
    marginTop: 2,
  },
  avatar: {
    backgroundColor: "#D1FAE5",
    padding: 8,
    borderRadius: 9999,
  },
  avatarIcon: {
    fontSize: 20,
  },
  budgetWidget: {
    backgroundColor: "#059669",
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  budgetWidgetWarning: {
    backgroundColor: "#DC2626",
    shadowColor: "#F87171",
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  budgetTitle: {
    color: "#D1FAE5",
    fontWeight: "600",
  },
  budgetOkBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  budgetOkText: {
    color: "#065F46",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  budgetValue: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 16,
  },
  budgetLimit: {
    fontSize: 14,
    fontWeight: "normal",
  },
  progressBarBg: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    backgroundColor: "#FFFFFF",
    height: 8,
    borderRadius: 4,
  },
  budgetStatus: {
    color: "#D1FAE5",
    fontSize: 12,
    marginTop: 8,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  macroRingContainer: {
    alignItems: "center",
  },
  macroCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
  macroTarget: {
    fontSize: 10,
    color: "#6B7280",
  },
  macroLabel: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },
  constraintsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 32,
    gap: 8,
  },
  constraintBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  constraintText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  mealsContainer: {
    marginBottom: 40,
  },
  mealCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  mealCardTextContainer: {
    flex: 1,
  },
  mealCardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 4,
  },
  mealCardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  caloriesBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  caloriesText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
  },
});