import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>Amine 🇩🇿</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
      </View>

      {/* Budget Tracker Widget */}
      <View style={styles.budgetWidget}>
        <Text style={styles.budgetTitle}>Today's Budget</Text>
        <Text style={styles.budgetValue}>450 DA <Text style={styles.budgetLimit}>/ 600 DA</Text></Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '75%' }]} />
        </View>
        <Text style={styles.budgetStatus}>You are on track!</Text>
      </View>

      <Text style={styles.sectionTitle}>Today's Meals</Text>

      {/* Meal Cards */}
      <View style={styles.mealsContainer}>
        <MealCard title="Breakfast" meal="Oatmeal with Dates & Almonds" time="08:00 AM" calories="350 kcal" color="#FFEDD5" />
        <MealCard title="Lunch" meal="Healthy Loubia (White Beans)" time="01:00 PM" calories="550 kcal" color="#FEE2E2" />
        <MealCard title="Dinner" meal="Grilled Chicken & Salad" time="07:30 PM" calories="400 kcal" color="#D1FAE5" />
      </View>

      <Text style={styles.sectionTitle}>Daily Goals</Text>
      <View style={styles.goalsContainer}>
        <View style={[styles.goalCard, styles.waterCard]}>
          <Text style={styles.goalIcon}>💧</Text>
          <View>
            <Text style={styles.goalTitleWater}>Water</Text>
            <Text style={styles.goalSubtitleWater}>2 / 3 Liters</Text>
          </View>
        </View>
        <View style={[styles.goalCard, styles.exerciseCard]}>
          <Text style={styles.goalIcon}>🏃</Text>
          <View>
            <Text style={styles.goalTitleExercise}>Exercise</Text>
            <Text style={styles.goalSubtitleExercise}>Completed</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: "#F9FAFB", // gray-50
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
    color: "#6B7280", // gray-500
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#064E3B", // emerald-900
  },
  avatar: {
    backgroundColor: "#D1FAE5", // emerald-100
    padding: 8,
    borderRadius: 9999,
  },
  avatarIcon: {
    fontSize: 20,
  },
  budgetWidget: {
    backgroundColor: "#059669", // emerald-600
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  budgetTitle: {
    color: "#D1FAE5", // emerald-100
    fontWeight: "600",
    marginBottom: 8,
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
    backgroundColor: "#065F46", // emerald-800
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
    color: "#D1FAE5", // emerald-100
    fontSize: 12,
    marginTop: 8,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937", // gray-800
    marginBottom: 16,
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
    color: "#6B7280", // gray-500
    marginBottom: 4,
  },
  mealCardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827", // gray-900
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
    color: "#374151", // gray-700
  },
  goalsContainer: {
    flexDirection: "row",
    marginBottom: 40,
    justifyContent: "space-between",
  },
  goalCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  waterCard: {
    backgroundColor: "#EFF6FF", // blue-50
    borderColor: "#DBEAFE", // blue-100
    marginRight: 8,
  },
  exerciseCard: {
    backgroundColor: "#FAF5FF", // purple-50
    borderColor: "#F3E8FF", // purple-100
    marginLeft: 8,
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  goalTitleWater: {
    fontWeight: "bold",
    color: "#1E3A8A", // blue-900
  },
  goalSubtitleWater: {
    color: "#2563EB", // blue-600
    fontSize: 12,
  },
  goalTitleExercise: {
    fontWeight: "bold",
    color: "#581C87", // purple-900
  },
  goalSubtitleExercise: {
    color: "#9333EA", // purple-600
    fontSize: 12,
  },
});