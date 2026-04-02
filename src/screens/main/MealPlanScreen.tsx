import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, SafeAreaView, TouchableOpacity,
} from 'react-native';

const COLORS = {
  greenDark: '#1B4332', greenMid: '#2D6A4F', greenSoft: '#74C69D',
  greenPale: '#D8F3DC', cream: '#F8F4EF', peach: '#F4A261',
  peachPale: '#FEF3E2', white: '#FFFFFF', textDark: '#1B2A22',
  textMuted: '#6B8C7A', border: 'rgba(27,67,50,0.07)',
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const PLAN: Record<string, { time: string; name: string; kcal: string; cost: string; tag: string }[]> = {
  Monday: [
    { time: 'Breakfast', name: 'Bsisa with Olive Oil', kcal: '320 kcal', cost: '50 DA',  tag: 'Light' },
    { time: 'Lunch',     name: 'Rechta with Chicken',  kcal: '620 kcal', cost: '300 DA', tag: 'High Protein' },
    { time: 'Dinner',    name: 'Vegetable Shorba',      kcal: '280 kcal', cost: '120 DA', tag: 'Light' },
  ],
  Tuesday: [
    { time: 'Breakfast', name: 'Msemen & Honey',         kcal: '380 kcal', cost: '80 DA',  tag: 'Classic' },
    { time: 'Lunch',     name: 'Frik Soup & Salad',      kcal: '450 kcal', cost: '250 DA', tag: 'Balanced' },
    { time: 'Dinner',    name: 'Grilled Fish & Veggies', kcal: '520 kcal', cost: '350 DA', tag: 'High Protein' },
  ],
  Wednesday: [
    { time: 'Breakfast', name: 'Sfenj & Black Coffee',    kcal: '290 kcal', cost: '60 DA',  tag: 'Light' },
    { time: 'Lunch',     name: 'Couscous with Lamb',      kcal: '750 kcal', cost: '400 DA', tag: 'Traditional' },
    { time: 'Dinner',    name: 'Lentil Soup',             kcal: '310 kcal', cost: '100 DA', tag: 'Light' },
  ],
  Thursday: [
    { time: 'Breakfast', name: 'Oatmeal & Dates',         kcal: '350 kcal', cost: '70 DA',  tag: 'Balanced' },
    { time: 'Lunch',     name: 'Chicken Tajine',          kcal: '580 kcal', cost: '320 DA', tag: 'High Protein' },
    { time: 'Dinner',    name: 'Mixed Green Salad',        kcal: '180 kcal', cost: '80 DA',  tag: 'Light' },
  ],
  Friday: [
    { time: 'Breakfast', name: 'Baghrir & Amel',          kcal: '400 kcal', cost: '90 DA',  tag: 'Classic' },
    { time: 'Lunch',     name: 'Couscous (Friday Feast)', kcal: '800 kcal', cost: '450 DA', tag: 'Traditional' },
    { time: 'Dinner',    name: 'Tomato Shorba',            kcal: '220 kcal', cost: '90 DA',  tag: 'Light' },
  ],
  Saturday: [
    { time: 'Breakfast', name: 'Eggs & Merguez',          kcal: '460 kcal', cost: '150 DA', tag: 'High Protein' },
    { time: 'Lunch',     name: 'Grilled Chicken & Rice',  kcal: '600 kcal', cost: '300 DA', tag: 'Balanced' },
    { time: 'Dinner',    name: 'Harira',                   kcal: '340 kcal', cost: '130 DA', tag: 'Classic' },
  ],
  Sunday: [
    { time: 'Breakfast', name: 'Pancakes & Fruits',       kcal: '420 kcal', cost: '120 DA', tag: 'Light' },
    { time: 'Lunch',     name: 'Lamb Chops & Salad',      kcal: '700 kcal', cost: '500 DA', tag: 'High Protein' },
    { time: 'Dinner',    name: 'Vegetable Couscous',       kcal: '480 kcal', cost: '200 DA', tag: 'Balanced' },
  ],
};

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'Light':        { bg: COLORS.greenPale, text: COLORS.greenMid },
  'Balanced':     { bg: '#E8F4FD',        text: '#2176AE'       },
  'High Protein': { bg: COLORS.peachPale, text: '#C1550A'       },
  'Classic':      { bg: '#F3E8FF',        text: '#7C3AED'       },
  'Traditional':  { bg: '#FFF7E6',        text: '#B45309'       },
};

const TIME_COLORS: Record<string, string> = {
  Breakfast: COLORS.peach,
  Lunch:     COLORS.greenMid,
  Dinner:    '#5E7CE2',
};

function MealCard({ meal }: { meal: typeof PLAN['Monday'][0] }) {
  const tag = TAG_COLORS[meal.tag] ?? { bg: COLORS.greenPale, text: COLORS.greenMid };
  const accent = TIME_COLORS[meal.time] ?? COLORS.greenMid;

  return (
    <View style={[styles.mealCard, { borderLeftColor: accent }]}>
      <View style={styles.mealCardTop}>
        <View style={[styles.timeBadge, { backgroundColor: accent + '18' }]}>
          <Text style={[styles.timeBadgeText, { color: accent }]}>{meal.time}</Text>
        </View>
        <View style={[styles.tagBadge, { backgroundColor: tag.bg }]}>
          <Text style={[styles.tagText, { color: tag.text }]}>{meal.tag}</Text>
        </View>
      </View>
      <Text style={styles.mealName}>{meal.name}</Text>
      <View style={styles.mealFooter}>
        <View style={styles.mealChip}>
          <View style={[styles.chipDot, { backgroundColor: COLORS.greenSoft }]} />
          <Text style={styles.chipText}>{meal.kcal}</Text>
        </View>
        <View style={styles.mealChip}>
          <View style={[styles.chipDot, { backgroundColor: COLORS.peach }]} />
          <Text style={styles.chipText}>{meal.cost}</Text>
        </View>
      </View>
    </View>
  );
}

export default function MealPlanScreen() {
  const [activeDay, setActiveDay] = useState(0);
  const dayName = DAYS_FULL[activeDay];
  const meals = PLAN[dayName];
  const totalCost = meals.reduce((sum, m) => sum + parseInt(m.cost), 0);
  const totalKcal = meals.reduce((sum, m) => sum + parseInt(m.kcal), 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Weekly Plan</Text>
            <Text style={styles.headerSub}>Your curated meal schedule</Text>
          </View>
          <View style={styles.weekBadge}>
            <Text style={styles.weekBadgeText}>Week 15</Text>
          </View>
        </View>

        {/* Day Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
          {DAYS.map((d, i) => (
            <TouchableOpacity
              key={d}
              onPress={() => setActiveDay(i)}
              activeOpacity={0.8}
              style={[styles.dayBtn, i === activeDay && styles.dayBtnActive]}
            >
              <Text style={[styles.dayLabel, i === activeDay && styles.dayLabelActive]}>{d}</Text>
              <Text style={[styles.dayNum, i === activeDay && styles.dayNumActive]}>{i + 14}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.greenMid }]}>
            <Text style={styles.summaryVal}>{totalKcal}</Text>
            <Text style={styles.summaryLbl}>Total kcal</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.peach }]}>
            <Text style={styles.summaryVal}>{totalCost} DA</Text>
            <Text style={styles.summaryLbl}>Est. Cost</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: '#5E7CE2' }]}>
            <Text style={styles.summaryVal}>{meals.length}</Text>
            <Text style={styles.summaryLbl}>Meals</Text>
          </View>
        </View>

        {/* Section Label */}
        <Text style={styles.sectionLabel}>{dayName}'s Meals</Text>

        {/* Meal Cards */}
        {meals.map((meal, i) => (
          <MealCard key={i} meal={meal} />
        ))}

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <View style={styles.tipStar} />
          </View>
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Tip: </Text>
            Prep your Rechta broth the night before to save time on busy mornings.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: COLORS.greenDark },

  header:         { backgroundColor: COLORS.greenDark, paddingBottom: 20, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerTop:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 24, paddingTop: 8, marginBottom: 20 },
  headerTitle:    { fontFamily: 'serif', fontSize: 22, fontWeight: '600', color: COLORS.white, lineHeight: 28 },
  headerSub:      { fontSize: 13, color: COLORS.greenSoft, marginTop: 4 },
  weekBadge:      { backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  weekBadgeText:  { fontSize: 12, fontWeight: '600', color: COLORS.white },

  daysRow:        { paddingHorizontal: 18, gap: 8 },
  dayBtn:         { alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.08)', minWidth: 48 },
  dayBtnActive:   { backgroundColor: COLORS.greenSoft },
  dayLabel:       { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5 },
  dayLabelActive: { color: COLORS.greenDark },
  dayNum:         { fontSize: 16, fontWeight: '700', color: COLORS.white, marginTop: 2 },
  dayNumActive:   { color: COLORS.greenDark },

  scroll:         { flex: 1, backgroundColor: COLORS.cream },
  scrollContent:  { padding: 20, paddingBottom: 32 },
  sectionLabel:   { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },

  summaryRow:     { flexDirection: 'row', gap: 10, marginBottom: 20 },
  summaryCard:    { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, padding: 14, borderLeftWidth: 4, borderWidth: 1, borderColor: COLORS.border },
  summaryVal:     { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  summaryLbl:     { fontSize: 11, color: COLORS.textMuted, marginTop: 3 },

  mealCard:       { backgroundColor: COLORS.white, borderRadius: 20, padding: 16, borderLeftWidth: 4, borderWidth: 1, borderColor: COLORS.border, marginBottom: 12 },
  mealCardTop:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  timeBadge:      { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  timeBadgeText:  { fontSize: 11, fontWeight: '700' },
  tagBadge:       { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  tagText:        { fontSize: 10, fontWeight: '600' },
  mealName:       { fontSize: 16, fontWeight: '600', color: COLORS.textDark, lineHeight: 22, marginBottom: 10 },
  mealFooter:     { flexDirection: 'row', gap: 8 },
  mealChip:       { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.cream, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  chipDot:        { width: 6, height: 6, borderRadius: 3 },
  chipText:       { fontSize: 12, color: COLORS.textMuted },

  tipCard:        { backgroundColor: COLORS.greenDark, borderRadius: 20, padding: 18, flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginTop: 8 },
  tipIcon:        { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tipStar:        { width: 14, height: 14, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 2, transform: [{ rotate: '45deg' }] },
  tipText:        { flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20 },
  tipBold:        { fontWeight: '700', color: COLORS.white },
});