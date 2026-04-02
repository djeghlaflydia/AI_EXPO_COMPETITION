import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, SafeAreaView,
} from 'react-native';

const COLORS = {
  greenDark: '#1B4332', greenMid: '#2D6A4F', greenSoft: '#74C69D',
  greenPale: '#D8F3DC', cream: '#F8F4EF', peach: '#F4A261',
  white: '#FFFFFF', textDark: '#1B2A22', textMuted: '#6B8C7A',
  border: 'rgba(27,67,50,0.07)',
};

// ── Metric Card ────────────────────────────────────────
function MetricCard({
  title, value, sub, accentColor, progress, iconBg,
}: {
  title: string; value: string; sub: string;
  accentColor: string; progress: number; iconBg: string;
}) {
  return (
    <View style={[styles.metricCard, { borderLeftColor: accentColor }]}>
      <View style={[styles.metricIconWrap, { backgroundColor: iconBg }]}>
        <View style={[styles.metricDot, { backgroundColor: accentColor }]} />
      </View>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricVal}>{value}</Text>
      <Text style={styles.metricSub}>{sub}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` as any, backgroundColor: accentColor }]} />
      </View>
    </View>
  );
}

// ── Dashboard Screen ───────────────────────────────────
export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greetingName}>Sbah el Khir,{'\n'}Ahmed!</Text>
            <Text style={styles.greetingSub}>April 15, 2026</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>
        <View style={styles.statsPill}>
          {[
            { val: '1,850', lbl: 'kcal eaten' },
            { val: '2,200', lbl: 'kcal goal'  },
            { val: '450',   lbl: 'DA spent'   },
            { val: '800',   lbl: 'DA budget'  },
          ].map((item, i, arr) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.statsDivider} />}
              <View style={styles.statsItem}>
                <Text style={styles.statsVal}>{item.val}</Text>
                <Text style={styles.statsLbl}>{item.lbl}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary */}
        <Text style={styles.sectionLabel}>Today's Summary</Text>
        <View style={styles.cardsRow}>
          <MetricCard
            title="Calories" value="1,850" sub="of 2,200 kcal"
            accentColor={COLORS.greenMid} progress={84} iconBg={COLORS.greenPale}
          />
          <MetricCard
            title="Daily Budget" value="450 DA" sub="of 800 DA"
            accentColor={COLORS.peach} progress={56} iconBg="#FEF3E2"
          />
        </View>

        {/* Meal */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Up Next: Lunch</Text>
        <View style={styles.mealCard}>
          <View style={styles.mealTop}>
            <View style={styles.mealBadge}>
              <Text style={styles.mealBadgeText}>Lunch</Text>
            </View>
          </View>
          <Text style={styles.mealName}>Frik Soup & Grilled Chicken Salad</Text>
          <View style={styles.mealMeta}>
            {[
              { label: '450 kcal',    dot: COLORS.greenSoft },
              { label: '30g Protein', dot: COLORS.greenSoft },
              { label: '250 DA',      dot: COLORS.peach     },
            ].map((chip, i) => (
              <View key={i} style={styles.metaChip}>
                <View style={[styles.metaDot, { backgroundColor: chip.dot }]} />
                <Text style={styles.metaChipText}>{chip.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insight */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Daily Insights</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <View style={styles.insightStar} />
          </View>
          <Text style={styles.insightText}>
            <Text style={styles.insightBold}>You're 200 DA under budget today! </Text>
            Great job sticking to the plan.
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: COLORS.greenDark },
  header:        { backgroundColor: COLORS.greenDark, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerTop:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, paddingTop: 8 },
  greetingName:  { fontFamily: 'serif', fontSize: 22, fontWeight: '600', color: COLORS.white, lineHeight: 28 },
  greetingSub:   { fontSize: 13, color: COLORS.greenSoft, marginTop: 4 },
  avatar:        { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.greenSoft, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  avatarText:    { fontSize: 16, fontWeight: '600', color: COLORS.greenDark },

  statsPill:     { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 50, paddingVertical: 10, paddingHorizontal: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'space-between' },
  statsItem:     { alignItems: 'center', flex: 1 },
  statsVal:      { fontSize: 15, fontWeight: '600', color: COLORS.white },
  statsLbl:      { fontSize: 10, color: COLORS.greenSoft, marginTop: 2 },
  statsDivider:  { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  scroll:        { flex: 1, backgroundColor: COLORS.cream },
  scrollContent: { padding: 20, paddingBottom: 32 },
  sectionLabel:  { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },

  cardsRow:      { flexDirection: 'row', gap: 12 },
  metricCard:    { flex: 1, backgroundColor: COLORS.white, borderRadius: 20, padding: 16, borderLeftWidth: 4, borderWidth: 1, borderColor: COLORS.border },
  metricIconWrap:{ width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  metricDot:     { width: 10, height: 10, borderRadius: 5 },
  metricTitle:   { fontSize: 12, color: COLORS.textMuted, fontWeight: '500', marginBottom: 4 },
  metricVal:     { fontSize: 17, fontWeight: '700', color: COLORS.textDark },
  metricSub:     { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  progressBar:   { height: 5, backgroundColor: COLORS.greenPale, borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  progressFill:  { height: '100%', borderRadius: 3 },

  mealCard:      { backgroundColor: COLORS.white, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: COLORS.border },
  mealTop:       { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  mealBadge:     { backgroundColor: COLORS.greenPale, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 50 },
  mealBadgeText: { fontSize: 11, fontWeight: '600', color: COLORS.greenMid },
  mealName:      { fontSize: 16, fontWeight: '600', color: COLORS.textDark, lineHeight: 22, marginBottom: 10 },
  mealMeta:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaChip:      { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.cream, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  metaDot:       { width: 6, height: 6, borderRadius: 3 },
  metaChipText:  { fontSize: 12, color: COLORS.textMuted },

  insightCard:   { backgroundColor: COLORS.greenDark, borderRadius: 20, padding: 18, flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  insightIcon:   { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  insightStar:   { width: 14, height: 14, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 2, transform: [{ rotate: '45deg' }] },
  insightText:   { flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20 },
  insightBold:   { fontWeight: '700', color: COLORS.white },
});