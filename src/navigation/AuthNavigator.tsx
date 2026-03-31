import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import OnboardingWizardScreen from '../screens/auth/OnboardingWizardScreen';
import AILoadingScreen from '../screens/auth/AILoadingScreen';

export type AuthStackParamList = {
  Login: undefined;
  OnboardingWizard: undefined;
  AILoading: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OnboardingWizard" component={OnboardingWizardScreen} />
      <Stack.Screen name="AILoading" component={AILoadingScreen} />
    </Stack.Navigator>
  );
}
