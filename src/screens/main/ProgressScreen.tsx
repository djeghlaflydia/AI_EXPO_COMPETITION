import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, SafeAreaView, Dimensions,
} from 'react-native';
import Svg, { Circle, Polyline, Polygon, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

const COLORS = {
  greenDark: '#1B4332', greenMid: '#2D6A4F', greenSoft: '#74C69D',
  greenPale: '#D8F3DC', cream: '#F8F4EF', peach: '#F4A261',
  white: '#FFFFFF', textDark: '#1B2A22', textMuted: '#6B8C7A',
  border: 'rgba(27,67,50,0.07)',
};

const WEIGHT_DATA = [
  { day: 'Tue', val: 79.2 }, { day: 'Wed', val: 78.8 },
  { day: 'Thu', val: 78.5 }, { day: 'Fri', val: 78.3 },
  { day: 'Sat', val: 78.1 }, { day: 'Sun', val: 78.0 },
  { day: 'Mon', val: 78.0 },
];

const DAYS = [
  { lbl: 'Tue', done: true, pct: 0.9 },
  { lbl: 'Wed', done: true, pct: 0.95 },
  { lbl: 'Thu', done: true, pct: 0.75 },
  { lbl: 'Fri', done: false, pct: 0.3 },
  { lbl: 'Sat', done: true, pct: 0.85 },
  { lbl: 'Sun', done: true, pct: 1.0 },
  { lbl: 'Mon', done: true, pct: 0.88 },
];

// ── Weight Chart ───────────────────────────────────────
function WeightChart() {
  const W = width - 48 - 36;
  const H = 120;
  const minVal = 77.8, maxVal = 79.4;

  const getX = (i: number) => (i / (WEIGHT_DATA.length - 1)) * W + 28;
  const getY = (v: number) => H - ((v - minVal) / (maxVal - minVal)) * (H - 20) - 4;

  const points = WEIGHT_DATA.map((d, i) => `${getX(i)},${getY(d.val)}`).join(' ');
  const areaPoints = [
    ...WEIGHT_DATA.map((d, i) => `${getX(i)},${getY(d.val)}`),
    `${getX(WEIGHT_DATA.length - 1)},${H}`,
    `${getX(0)},${H}`,
  ].join(' ');

  return (
    <Svg width={W + 28} height={H + 20}>
      <Defs>
        <LinearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={COLORS.greenSoft} stopOpacity={0.25} />
          <Stop offset="100%" stopColor={COLORS.greenSoft} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      {[79, 78.5, 78].map((v, i) => (
        <Line key={i} x1={28} y1={getY(v)} x2={W + 28} y2={getY(v)}
          stroke="rgba(27,67,50,0.06)" strokeWidth={1} />
      ))}
      {[79, 78.5, 78].map((v, i) => (
        <SvgText key={i} x={2} y={getY(v) + 3} fontSize={9} fill={COLORS.textMuted}>{v}</SvgText>
      ))}
      <Polygon points={areaPoints} fill="url(#wGrad)" />
      <Polyline points={points} fill="none" stroke={COLORS.greenMid}
        strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {WEIGHT_DATA.map((d, i) => {
        const isLast = i === WEIGHT_DATA.length - 1;
        return isLast ? (
          <Circle key={i} cx={getX(i)} cy={getY(d.val)} r={5}
            fill={COLORS.white} stroke={COLORS.greenMid} strokeWidth={2.5} />
        ) : (
          <Circle key={i} cx={getX(i)} cy={getY(d.val)} r={4} fill={COLORS.greenMid} />
        );
      })}
      {WEIGHT_DATA.map((d, i) => (
        <SvgText key={i} x={getX(i)} y={H + 16} fontSize={9}
          fill={COLORS.textMuted} textAnchor="middle">{d.day}</SvgText>
      ))}
    </Svg>
  );
}

// ── Adherence Ring ─────────────────────────────────────
function AdherenceRing({ pct }: { pct: number }) {
  const r = 36, cx = 45, cy = 45;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);
  return (
    <Svg width={90} height={90}>
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.greenPale} strokeWidth={9} />
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.greenMid} strokeWidth={9}
        strokeDasharray={`${circumference}`} strokeDashoffset={offset}
        strokeLinecap="round" rotation={-90} origin={`${cx},${cy}`} />
      <SvgText x={cx} y={cy + 6} textAnchor="middle" fontSize={18}
        fontWeight="700" fill={COLORS.textDark}>{Math.round(pct * 100)}%</SvgText>
    </Svg>
  );
}

// ── Goal Card ──────────────────────────────────────────
function GoalCard({ title, value, sub, accent, iconBg, progress }: {
  title: string; value: string; sub: string;
  accent: string; iconBg: string; progress: number;
}) {
  return (
    <View style={[styles.goalCard, { borderLeftColor: accent }]}>
      <View style={[styles.goalIconWrap, { backgroundColor: iconBg }]}>
        <View style={[styles.goalDot, { backgroundColor: accent }]} />
      </View>
      <Text style={styles.goalTitle}>{title}</Text>
      <Text style={styles.goalVal}>{value}</Text>
      <Text style={styles.goalSub}>{sub}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` as any, backgroundColor: accent }]} />
      </View>
    </View>
  );
}

// ── Meta Chip ──────────────────────────────────────────
function MetaChip({ label, dot }: { label: string; dot: string }) {
  return (
    <View style={styles.metaChip}>
      <View style={[styles.metaDot, { backgroundColor: dot }]} />
      <Text style={styles.metaChipText}>{label}</Text>
    </View>
  );
}

// ── Progress Screen ────────────────────────────────────
export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greetingName}>Your Health,{'\n'}Ahmed!</Text>
            <Text style={styles.greetingSub}>April 1, 2026</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>
        <View style={styles.statsPill}>
          {[
            { val: '78 kg',  lbl: 'current'    },
            { val: '−1.2',   lbl: 'kg this wk' },
            { val: '85%',    lbl: 'adherence'  },
            { val: '6 / 7',  lbl: 'days on plan'},
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

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Goals */}
        <Text style={styles.sectionLabel}>This week's goals</Text>
        <View style={styles.goalsRow}>
          <GoalCard title="Weight loss" value="−1.2 kg" sub="of −1.5 kg goal"
            accent={COLORS.greenMid} iconBg={COLORS.greenPale} progress={80} />
          <GoalCard title="Budget kept" value="560 DA" sub="saved this week"
            accent={COLORS.peach} iconBg="#FEF3E2" progress={70} />
        </View>

        {/* Weight Trend */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Weight trend</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>7-day weight</Text>
          <WeightChart />
          <View style={styles.chipRow}>
            <MetaChip label="Current: 78 kg" dot={COLORS.greenMid} />
            <MetaChip label="−1.2 kg this week" dot={COLORS.greenSoft} />
            <MetaChip label="Goal: 77 kg" dot={COLORS.peach} />
          </View>
        </View>

        {/* Adherence */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Adherence score</Text>
        <View style={styles.card}>
          <View style={styles.adherenceTop}>
            <AdherenceRing pct={0.85} />
            <View style={styles.adherenceInfo}>
              <Text style={styles.adherenceScore}>85%</Text>
              <Text style={styles.adherenceLabel}>
                You followed the plan{'\n'}most days. Good job!
              </Text>
              <View style={styles.chipRow}>
                <MetaChip label="6 of 7 days" dot={COLORS.greenMid} />
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.daysRow}>
            {DAYS.map((d, i) => (
              <View key={i} style={styles.dayCol}>
                <View style={styles.dayBarWrap}>
                  <View style={[styles.dayBar, {
                    height: `${d.pct * 100}%` as any,
                    backgroundColor: d.done ? COLORS.greenMid : COLORS.greenPale,
                  }]} />
                </View>
                <Text style={styles.dayLbl}>{d.lbl}</Text>
                <Text style={[styles.dayMark, { color: d.done ? COLORS.greenMid : COLORS.textMuted }]}>
                  {d.done ? '✓' : '−'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insight */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Weekly insight</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <View style={styles.insightStar} />
          </View>
          <Text style={styles.insightText}>
            <Text style={styles.insightBold}>You're on track for your goal! </Text>
            At this pace, you'll reach 77 kg in about 6 more days. Keep it up!
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: COLORS.greenDark },
  header:          { backgroundColor: COLORS.greenDark, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerTop:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, paddingTop: 8 },
  greetingName:    { fontFamily: 'serif', fontSize: 22, fontWeight: '600', color: COLORS.white, lineHeight: 28 },
  greetingSub:     { fontSize: 13, color: COLORS.greenSoft, marginTop: 4 },
  avatar:          { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.greenSoft, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  avatarText:      { fontSize: 16, fontWeight: '600', color: COLORS.greenDark },

  statsPill:       { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 50, paddingVertical: 10, paddingHorizontal: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'space-between' },
  statsItem:       { alignItems: 'center', flex: 1 },
  statsVal:        { fontSize: 15, fontWeight: '600', color: COLORS.white },
  statsLbl:        { fontSize: 10, color: COLORS.greenSoft, marginTop: 2 },
  statsDivider:    { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  scroll:          { flex: 1, backgroundColor: COLORS.cream },
  scrollContent:   { padding: 20, paddingBottom: 40 },
  sectionLabel:    { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },

  goalsRow:        { flexDirection: 'row', gap: 12 },
  goalCard:        { flex: 1, backgroundColor: COLORS.white, borderRadius: 20, padding: 14, borderLeftWidth: 4, borderWidth: 1, borderColor: COLORS.border },
  goalIconWrap:    { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  goalDot:         { width: 10, height: 10, borderRadius: 5 },
  goalTitle:       { fontSize: 11, color: COLORS.textMuted, fontWeight: '500', marginBottom: 2 },
  goalVal:         { fontSize: 17, fontWeight: '700', color: COLORS.textDark },
  goalSub:         { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  progressBar:     { height: 5, backgroundColor: COLORS.greenPale, borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  progressFill:    { height: '100%', borderRadius: 3 },

  card:            { backgroundColor: COLORS.white, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: COLORS.border },
  cardTitle:       { fontSize: 15, fontWeight: '600', color: COLORS.textDark, marginBottom: 12 },

  chipRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  metaChip:        { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.cream, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  metaDot:         { width: 6, height: 6, borderRadius: 3 },
  metaChipText:    { fontSize: 12, color: COLORS.textMuted },

  adherenceTop:    { flexDirection: 'row', gap: 16, alignItems: 'center' },
  adherenceInfo:   { flex: 1 },
  adherenceScore:  { fontSize: 32, fontWeight: '700', color: COLORS.greenMid, lineHeight: 36 },
  adherenceLabel:  { fontSize: 13, color: COLORS.textMuted, lineHeight: 20, marginTop: 2 },

  divider:         { height: 1, backgroundColor: COLORS.border, marginVertical: 14 },
  daysRow:         { flexDirection: 'row', gap: 6, justifyContent: 'space-between' },
  dayCol:          { flex: 1, alignItems: 'center', gap: 4 },
  dayBarWrap:      { height: 60, width: '100%', justifyContent: 'flex-end' },
  dayBar:          { width: '100%', borderRadius: 4 },
  dayLbl:          { fontSize: 10, color: COLORS.textMuted },
  dayMark:         { fontSize: 10, fontWeight: '600' },

  insightCard:     { backgroundColor: COLORS.greenDark, borderRadius: 20, padding: 18, flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  insightIcon:     { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  insightStar:     { width: 14, height: 14, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 2, transform: [{ rotate: '45deg' }] },
  insightText:     { flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20 },
  insightBold:     { fontWeight: '700', color: COLORS.white },
});