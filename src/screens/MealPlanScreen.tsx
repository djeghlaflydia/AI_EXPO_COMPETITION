import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function MealPlanScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Mocking the backend 'plan-semaine' response
  const weeklyPlanData = {
    weeklySummary: {
      budget_ok: true,
      totalCost: "2058 DA",
      averageCalories: 1850,
    },
    days: [
      {
        id: 0,
        meals: [
          { id: "m1", title: "Petit-déjeuner", name: "Pain Complet & Huile d'Olive (Zit Zitoune)", calories: "320", cost: "40 DA", budget_ok: true, time: "15 min" },
          { id: "m2", title: "Déjeuner", name: "Chorba Frik Light & Poulet Émietté", calories: "450", cost: "160 DA", budget_ok: true, time: "45 min" },
          { id: "m3", title: "Dîner", name: "Salade Variée & Oeufs Durs", calories: "300", cost: "90 DA", budget_ok: true, time: "10 min" }
        ],
        dailyTotals: { calories: 1070, cost: 290, budget_ok: true }
      },
      // Other days mocked identically for UI display
    ]
  };

  const currentDayPlan = weeklyPlanData.days[0]; // Assuming day 0 for static UI

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Plan</Text>
        <View style={[styles.budgetBadge, weeklyPlanData.weeklySummary.budget_ok ? styles.budgetOk : styles.budgetWarning]}>
          <Text style={styles.budgetBadgeText}>{weeklyPlanData.weeklySummary.totalCost} / week</Text>
        </View>
      </View>

      {/* Week Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekNav}>
        {days.map((day, ix) => (
          <TouchableOpacity 
            key={ix}
            onPress={() => setSelectedDay(ix)}
            style={[
              styles.dayButton,
              selectedDay === ix ? styles.dayButtonActive : styles.dayButtonInactive
            ]}
          >
            <Text style={[
              styles.dayText,
              selectedDay === ix ? styles.dayTextActive : styles.dayTextInactive
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Daily Summary */}
      <View style={styles.dailySummary}>
        <Text style={styles.summaryText}>Total: {currentDayPlan.dailyTotals.cost} DA (Budget {currentDayPlan.dailyTotals.budget_ok ? "OK" : "Over"})</Text>
        <Text style={styles.summaryText}>{currentDayPlan.dailyTotals.calories} kcal</Text>
      </View>

      {/* Meals based on selected day */}
      <View style={styles.mealsContainer}>
        {currentDayPlan.meals.map(meal => (
          <MealDetailCard 
            key={meal.id}
            title={meal.name} 
            type={meal.title} 
            calories={meal.calories} 
            cost={meal.cost}
            time={meal.time}
            budget_ok={meal.budget_ok}
          />
        ))}
      </View>
      
      {/* Generate next week */}
      <TouchableOpacity style={styles.regenerateButton}>
        <Text style={styles.regenerateText}>↻ Ask AI to optimize for less budget</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MealDetailCard({ title, type, calories, cost, time, budget_ok }: any) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <View style={styles.mealTypeBadge}>
          <Text style={styles.mealTypeText}>{type}</Text>
        </View>
        <Text style={[styles.mealCost, budget_ok ? styles.costOk : styles.costWarning]}>
          ~{cost}
        </Text>
      </View>
      
      <Text style={styles.mealTitle}>{title}</Text>
      <Text style={styles.mealDescription}>Adapted to your medical profile with local ingredients available in Algeria.</Text>
      
      <View style={styles.mealFooter}>
        <View style={styles.mealMetrics}>
            <Text style={styles.metricBadge}>⏱ {time}</Text>
            <Text style={[styles.metricBadge, { marginLeft: 8 }]}>🥑 {calories} kcal</Text>
        </View>
      </View>
      
      {/* Swap button */}
      <TouchableOpacity style={styles.swapButton}>
        <Text style={styles.swapText}>🔄 Swap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#064E3B", // emerald-900
  },
  budgetBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  budgetOk: {
    backgroundColor: "#D1FAE5",
  },
  budgetWarning: {
    backgroundColor: "#FEE2E2",
  },
  budgetBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#065F46",
  },
  weekNav: {
    marginBottom: 16,
    flexDirection: "row",
  },
  dayButton: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 16,
  },
  dayButtonActive: {
    backgroundColor: "#059669", // emerald-600
    shadowColor: "#34D399", // emerald-400
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  dayButtonInactive: {
    backgroundColor: "#F3F4F6", // gray-100
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dayTextActive: {
    color: "#FFFFFF",
  },
  dayTextInactive: {
    color: "#6B7280", // gray-500
  },
  dailySummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  mealsContainer: {
    marginBottom: 40,
  },
  regenerateButton: {
    backgroundColor: "#ECFDF5", // emerald-50
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6EE7B7", // emerald-300
    marginBottom: 40,
  },
  regenerateText: {
    color: "#047857", // emerald-700
    fontWeight: "bold",
  },
  mealCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
    marginBottom: 16,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    position: "relative",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  mealTypeBadge: {
    backgroundColor: "#F3F4F6", // gray-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mealTypeText: {
    color: "#4B5563", // gray-600
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mealCost: {
    fontSize: 14,
    fontWeight: "800",
  },
  costOk: {
    color: "#059669",
  },
  costWarning: {
    color: "#DC2626",
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827", // gray-900
    marginBottom: 8,
  },
  mealDescription: {
    color: "#6B7280", // gray-500
    fontSize: 14,
    marginBottom: 16,
  },
  mealFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#F3F4F6", // gray-100
    paddingTop: 12,
  },
  mealMetrics: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricBadge: {
    color: "#059669", // emerald-600
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "#ECFDF5", // emerald-50
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  swapButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#111827", // gray-900
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  swapText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
