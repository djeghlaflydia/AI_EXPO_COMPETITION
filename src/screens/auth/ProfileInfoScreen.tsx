// screens/auth/ProfileInfoScreen.tsx
import React, { useState } from 'react';
 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ProfileInfo'>;
  route: RouteProp<AuthStackParamList, 'ProfileInfo'>;
};

const HEALIZA = {
  dark: '#2D4A3E',
  mid: '#3D6354',
  lightBg: '#F5F0E8',
  surface: '#FFFFFF',
  accent: '#E07A4D',
  text: '#1C2E26',
  muted: '#7A9488',
  border: '#D8E4DF',
  inputBg: '#F8F5EF',
};

const GOALS = [
  'Lose weight',
  'Gain muscle',
  'Better sleep',
  'More energy',
  'Stay healthy',
];

export default function ProfileInfoScreen({ navigation, route }: Props) {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('68');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleNext = () => {
    if (!height || !weight || !gender || !selectedGoal) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    navigation.navigate('Lifestyle', {
      ...route.params,
      height: parseFloat(height),
      weight: parseFloat(weight),
      gender,
      goal: selectedGoal,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          {/* Step Pills */}
          <View style={styles.stepPills}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.stepPill,
                  i === 0 && styles.stepPillDone,
                  i === 1 && styles.stepPillActive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.title}>Tell us about{'\n'}yourself</Text>
          <Text style={styles.subtitle}>We'll create a plan made just for you</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>

          {/* Height & Weight */}
          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.label}>HEIGHT</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputValue}>{height}</Text>
                <View style={styles.unitBadge}>
                  <Text style={styles.unitText}>cm</Text>
                </View>
              </View>
            </View>
            <View style={{ width: 12 }} />
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.label}>WEIGHT</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputValue}>{weight}</Text>
                <View style={styles.unitBadge}>
                  <Text style={styles.unitText}>kg</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Gender */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>GENDER</Text>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[styles.genderBtn, gender === 'male' && styles.genderBtnSelected]}
                onPress={() => setGender('male')}
              >
                <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>
                  ♂  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderBtn, gender === 'female' && styles.genderBtnSelected]}
                onPress={() => setGender('female')}
              >
                <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>
                  ♀  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Goal Chips */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>YOUR GOAL</Text>
            <View style={styles.chipsWrap}>
              {GOALS.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.chip, selectedGoal === g && styles.chipSelected]}
                  onPress={() => setSelectedGoal(g)}
                >
                  <Text style={[styles.chipText, selectedGoal === g && styles.chipTextSelected]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.ctaBtn} onPress={handleNext}>
            <Text style={styles.ctaText}>Continue  →</Text>
          </TouchableOpacity>

          <Text style={styles.stepHint}>
            Step 2 of 4 — <Text style={{ color: HEALIZA.accent, fontWeight: '600' }}>almost there!</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: HEALIZA.dark,
  },
  container: {
    flex: 1,
    backgroundColor: HEALIZA.lightBg,
  },

  // Header
  header: {
    backgroundColor: HEALIZA.dark,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 28,
  },
  stepPills: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
  },
  stepPill: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  stepPillDone: {
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  stepPillActive: {
    backgroundColor: HEALIZA.accent,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 34,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },

  // Body
  body: {
    backgroundColor: HEALIZA.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
    padding: 24,
    minHeight: 500,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: HEALIZA.dark,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: HEALIZA.inputBg,
    borderWidth: 1.5,
    borderColor: HEALIZA.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  inputValue: {
    fontSize: 15,
    color: HEALIZA.text,
    fontWeight: '500',
  },
  unitBadge: {
    backgroundColor: HEALIZA.mid,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  unitText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },

  // Gender
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: HEALIZA.border,
    backgroundColor: HEALIZA.inputBg,
    alignItems: 'center',
  },
  genderBtnSelected: {
    backgroundColor: HEALIZA.dark,
    borderColor: HEALIZA.dark,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: HEALIZA.muted,
  },
  genderTextSelected: {
    color: '#fff',
  },

  // Goal chips
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: HEALIZA.border,
    backgroundColor: HEALIZA.inputBg,
  },
  chipSelected: {
    backgroundColor: 'rgba(224,122,77,0.1)',
    borderColor: HEALIZA.accent,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: HEALIZA.muted,
  },
  chipTextSelected: {
    color: HEALIZA.accent,
    fontWeight: '600',
  },

  // CTA
  ctaBtn: {
    marginTop: 24,
    backgroundColor: HEALIZA.dark,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  stepHint: {
    textAlign: 'center',
    fontSize: 12,
    color: HEALIZA.muted,
    marginTop: 14,
  },
}); 