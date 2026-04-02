// screens/auth/LifestyleScreen.tsx
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
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Lifestyle'>;
  route: RouteProp<AuthStackParamList, 'Lifestyle'>;
};

type WorkType = 'sedentary' | 'active' | 'physical';
type ActivityLevel = 'none' | 'light' | 'moderate' | 'intense';

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

const WORK_OPTIONS: { value: WorkType; label: string; sub: string; icon: string }[] = [
  {
    value: 'sedentary',
    label: 'Office / Desk Job',
    sub: 'Sitting most of the day',
    icon: '🖥️',
  },
  {
    value: 'active',
    label: 'Active Job',
    sub: 'Standing, walking frequently',
    icon: '🚶',
  },
  {
    value: 'physical',
    label: 'Physical Labor',
    sub: 'Construction, farming, etc.',
    icon: '⚒️',
  },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; sub: string; dots: number }[] = [
  { value: 'none',     label: 'No exercise',   sub: 'Fully sedentary',       dots: 0 },
  { value: 'light',    label: 'Light',          sub: '1–2 times / week',      dots: 1 },
  { value: 'moderate', label: 'Moderate',       sub: '3–4 times / week',      dots: 2 },
  { value: 'intense',  label: 'Intense',        sub: '5+ times / week',       dots: 3 },
];

export default function LifestyleScreen({ navigation, route }: Props) {
  const [workType, setWorkType]         = useState<WorkType | ''>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | ''>('');

  const handleNext = () => {
    if (!workType || !activityLevel) {
      Alert.alert('Missing info', 'Please select your lifestyle information');
      return;
    }
    navigation.navigate('Health', {
      ...route.params,
      workType,
      activityLevel,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.stepPills}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.stepPill,
                  i < 2  && styles.stepPillDone,
                  i === 2 && styles.stepPillActive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.title}>Lifestyle &{'\n'}Activity</Text>
          <Text style={styles.subtitle}>Helps us understand your daily energy needs</Text>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* Work type */}
          <Text style={styles.sectionLabel}>WORK TYPE</Text>
          {WORK_OPTIONS.map((opt) => {
            const active = workType === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.optionCard, active && styles.optionCardActive]}
                onPress={() => setWorkType(opt.value)}
                activeOpacity={0.75}
              >
                <View style={[styles.optionIconWrap, active && styles.optionIconWrapActive]}>
                  <Text style={styles.optionIcon}>{opt.icon}</Text>
                </View>
                <View style={styles.optionTexts}>
                  <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                    {opt.label}
                  </Text>
                  <Text style={[styles.optionSub, active && styles.optionSubActive]}>
                    {opt.sub}
                  </Text>
                </View>
                <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                  {active && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Activity level */}
          <Text style={[styles.sectionLabel, { marginTop: 24 }]}>EXERCISE FREQUENCY</Text>
          {ACTIVITY_OPTIONS.map((opt) => {
            const active = activityLevel === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.optionCard, active && styles.optionCardActive]}
                onPress={() => setActivityLevel(opt.value)}
                activeOpacity={0.75}
              >
                {/* intensity dots */}
                <View style={styles.dotsWrap}>
                  {[0, 1, 2].map((d) => (
                    <View
                      key={d}
                      style={[
                        styles.dot,
                        d < opt.dots
                          ? active ? styles.dotFilledActive : styles.dotFilled
                          : styles.dotEmpty,
                      ]}
                    />
                  ))}
                </View>
                <View style={styles.optionTexts}>
                  <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                    {opt.label}
                  </Text>
                  <Text style={[styles.optionSub, active && styles.optionSubActive]}>
                    {opt.sub}
                  </Text>
                </View>
                <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                  {active && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* CTA */}
          <TouchableOpacity style={styles.ctaBtn} onPress={handleNext}>
            <Text style={styles.ctaText}>Continue  →</Text>
          </TouchableOpacity>

          <Text style={styles.stepHint}>
            Step 3 of 4 —{' '}
            <Text style={{ color: HEALIZA.accent, fontWeight: '600' }}>almost there!</Text>
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

  // ── Header ──
  header: {
    backgroundColor: HEALIZA.dark,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 36,
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

  // ── Body ──
  body: {
    backgroundColor: HEALIZA.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
    padding: 24,
    minHeight: 560,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: HEALIZA.dark,
    letterSpacing: 0.8,
    marginBottom: 12,
  },

  // Option card
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HEALIZA.inputBg,
    borderWidth: 1.5,
    borderColor: HEALIZA.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  optionCardActive: {
    backgroundColor: 'rgba(45,74,62,0.06)',
    borderColor: HEALIZA.dark,
  },

  // Icon box (work type)
  optionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: HEALIZA.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconWrapActive: {
    backgroundColor: 'rgba(45,74,62,0.15)',
  },
  optionIcon: {
    fontSize: 20,
  },

  // Dots (activity level)
  dotsWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: HEALIZA.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotFilled: {
    backgroundColor: HEALIZA.muted,
  },
  dotFilledActive: {
    backgroundColor: HEALIZA.dark,
  },
  dotEmpty: {
    backgroundColor: 'rgba(122,148,136,0.25)',
  },

  // Texts
  optionTexts: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: HEALIZA.text,
    marginBottom: 2,
  },
  optionLabelActive: {
    color: HEALIZA.dark,
  },
  optionSub: {
    fontSize: 12,
    color: HEALIZA.muted,
  },
  optionSubActive: {
    color: HEALIZA.mid,
  },

  // Radio
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: HEALIZA.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: HEALIZA.dark,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: HEALIZA.dark,
  },

  // CTA
  ctaBtn: {
    marginTop: 28,
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
    marginBottom: 8,
  },
});