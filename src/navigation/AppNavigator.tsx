import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

export type RootStackParamList = {
Login: undefined;
  ProfileSetup: undefined;
  MainTabs: undefined;
  Auth: undefined;
  Main: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}