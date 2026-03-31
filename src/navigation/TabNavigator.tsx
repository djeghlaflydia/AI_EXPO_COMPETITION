import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { RootStackParamList } from "./AppNavigator";
import DashboardScreen from "../screens/DashboardScreen";
import MealPlanScreen from "../screens/MealPlanScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import ProgressScreen from "../screens/ProgressScreen";

export type TabParamList = {
  Home: undefined;
  Meals: undefined;
  Cart: undefined;
  Progress: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, "MainTabs">;

export default function TabNavigator({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#059669", // emerald-600
        tabBarInactiveTintColor: "#9ca3af", // gray-400
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🏠</Text> }}
      />
      <Tab.Screen 
        name="Meals" 
        component={MealPlanScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🍲</Text> }}
      />
      <Tab.Screen 
        name="Cart" 
        component={ShoppingListScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>🛒</Text> }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen} 
        options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📈</Text> }}
      />
    </Tab.Navigator>
  );
}
