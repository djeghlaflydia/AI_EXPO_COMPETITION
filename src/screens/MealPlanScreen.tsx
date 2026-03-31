import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function MealPlanScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Weekly Plan</Text>

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

      {/* Meals based on selected day */}
      <View style={styles.mealsContainer}>
        <MealDetailCard title="Chorba Frik (Healthy Version)" type="Lunch" calories="420" cost="~120 DA" />
        <MealDetailCard title="Kesra with Olive Oil & Tomato Salad" type="Snack" calories="200" cost="~50 DA" />
        <MealDetailCard title="Grilled Chicken with Karantika" type="Dinner" calories="600" cost="~250 DA" />
      </View>
      
      {/* Generate next week */}
      <TouchableOpacity style={styles.regenerateButton}>
        <Text style={styles.regenerateText}>↻ Ask AI to regenerate this day</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MealDetailCard({ title, type, calories, cost }: any) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <View style={styles.mealTypeBadge}>
          <Text style={styles.mealTypeText}>{type}</Text>
        </View>
        <Text style={styles.mealCost}>{cost}</Text>
      </View>
      
      <Text style={styles.mealTitle}>{title}</Text>
      <Text style={styles.mealDescription}>A delicious healthy twist to a classic Algerian dish, carefully portioned for your calorie needs.</Text>
      
      <View style={styles.mealFooter}>
        <View style={styles.mealMetrics}>
            <Text style={styles.metricBadge}>⏱ 25 min cook</Text>
            <Text style={[styles.metricBadge, { marginLeft: 8 }]}>🥑 {calories} kcal</Text>
        </View>
      </View>
      
      {/* Swap button */}
      <TouchableOpacity style={styles.swapButton}>
        <Text style={styles.swapText}>🔄 Swap Recipe</Text>
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
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#064E3B", // emerald-900
    marginBottom: 24,
  },
  weekNav: {
    marginBottom: 24,
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
    marginBottom: 12,
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
    backgroundColor: "#FFEDD5", // orange-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  mealTypeText: {
    color: "#9A3412", // orange-800
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mealCost: {
    color: "#9CA3AF", // gray-400
    fontSize: 12,
    fontWeight: "600",
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
    paddingVertical: 4,
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
