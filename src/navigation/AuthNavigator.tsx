// navigation/AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeOnboardingScreen from '../screens/auth/WelcomeOnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ProfileInfoScreen from '../screens/auth/ProfileInfoScreen';
import LifestyleScreen from '../screens/auth/LifestyleScreen';
import HealthScreen from '../screens/auth/HealthScreen';
import BudgetScreen from '../screens/auth/BudgetScreen';
import OnboardingWizardScreen from '../screens/auth/OnboardingWizardScreen';
import AILoadingScreen from '../screens/auth/AILoadingScreen';

export type AuthStackParamList = {
  WelcomeOnboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileInfo: {
    email?: string;
    name?: string;
    age?: number;
  };
  Lifestyle: {
    email?: string;
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
    gender?: string;
    goal?: string;
  };
  Health: {
    email?: string;
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
    gender?: string;
    goal?: string;
    workType?: string;
    activityLevel?: string;
  };
  Budget: {
    email?: string;
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
    gender?: string;
    goal?: string;
    workType?: string;
    activityLevel?: string;
    healthConditions?: string[];
    otherConditions?: string;
    dietaryRestrictions?: string;
    foodPreferences?: string;
  };
  OnboardingWizard: undefined;
  AILoading: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="WelcomeOnboarding"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9FAFB',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="WelcomeOnboarding" 
        component={WelcomeOnboardingScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ title: 'Create Account' }}
      />
      <Stack.Screen 
        name="ProfileInfo" 
        component={ProfileInfoScreen} 
        options={{ title: 'Profile Information' }}
      />
      <Stack.Screen 
        name="Lifestyle" 
        component={LifestyleScreen} 
        options={{ title: 'Lifestyle & Activity' }}
      />
      <Stack.Screen 
        name="Health" 
        component={HealthScreen} 
        options={{ title: 'Health Profile' }}
      />
      <Stack.Screen 
        name="Budget" 
        component={BudgetScreen} 
        options={{ title: 'Monthly Budget' }}
      />
      <Stack.Screen 
        name="OnboardingWizard" 
        component={OnboardingWizardScreen} 
        options={{ 
          title: 'Setup Your Profile',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen 
        name="AILoading" 
        component={AILoadingScreen} 
        options={{ 
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}