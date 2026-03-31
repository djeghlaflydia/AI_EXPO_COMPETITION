import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function ShoppingListScreen() {
  const [checkedElements, setCheckedElements] = useState<string[]>([]);
  
  const toggleCheck = (item: string) => {
    if (checkedElements.includes(item)) {
      setCheckedElements(checkedElements.filter(x => x !== item));
    } else {
      setCheckedElements([...checkedElements, item]);
    }
  };

  const ingredients = {
    produce: [
      { name: "Tomatoes (1kg)", cost: "100" },
      { name: "Onions (1kg)", cost: "80" },
      { name: "Garlic (1 bulb)", cost: "50" },
      { name: "Coriander (Hashish)", cost: "30" },
    ],
    pantry: [
      { name: "Frik (Crushed green wheat)", cost: "150" },
      { name: "Chickpeas (Dried)", cost: "200" },
      { name: "Olive Oil (1 bottle)", cost: "1000" },
    ],
    proteins: [
      { name: "Chicken Breast (500g)", cost: "400" },
      { name: "Eggs (1 plateau)", cost: "500" },
    ]
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Title */}
      <View style={styles.header}>
          <Text style={styles.title}>Grocery List</Text>
          <View style={styles.costBadge}>
              <Text style={styles.costBadgeText}>~2510 DA Expected Cost</Text>
          </View>
      </View>

      <Text style={styles.description}>Estimated pricing to help you stay within your monthly setup budget.</Text>

      <CategorySection title="Produce & Veggies" items={ingredients.produce} checked={checkedElements} toggle={toggleCheck} />
      <CategorySection title="Pantry & Grains" items={ingredients.pantry} checked={checkedElements} toggle={toggleCheck} />
      <CategorySection title="Proteins & Meat" items={ingredients.proteins} checked={checkedElements} toggle={toggleCheck} />

    </ScrollView>
  );
}

function CategorySection({ title, items, checked, toggle }: any) {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View>
        {items.map((item: any) => {
          const isChecked = checked.includes(item.name);
          return (
            <TouchableOpacity 
              key={item.name} 
              onPress={() => toggle(item.name)}
              style={styles.itemContainer}
            >
              <View style={[styles.checkbox, isChecked ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.itemNameContainer}>
                 <Text style={[styles.itemName, isChecked ? styles.itemNameChecked : styles.itemNameUnchecked]}>{item.name}</Text>
              </View>
              <Text style={[styles.itemCost, isChecked ? styles.itemCostChecked : styles.itemCostUnchecked]}>{item.cost} DA</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827", // gray-900
  },
  costBadge: {
    backgroundColor: "#D1FAE5", // emerald-100
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 9999,
    marginBottom: 4,
  },
  costBadgeText: {
    color: "#065F46", // emerald-800
    fontWeight: "bold",
    fontSize: 12,
  },
  description: {
    color: "#6B7280", // gray-500
    marginBottom: 24,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937", // gray-800
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6", // gray-100
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#F9FAFB", // gray-50
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#059669", // emerald-600
    borderColor: "#059669", // emerald-600
  },
  checkboxUnchecked: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB", // gray-300
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  itemNameContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemNameChecked: {
    color: "#9CA3AF", // gray-400
    textDecorationLine: "line-through",
  },
  itemNameUnchecked: {
    color: "#111827", // gray-900
  },
  itemCost: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemCostChecked: {
    color: "#9CA3AF", // gray-400
  },
  itemCostUnchecked: {
    color: "#047857", // emerald-700
  },
});
