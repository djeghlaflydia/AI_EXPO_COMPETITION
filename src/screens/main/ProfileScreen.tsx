import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, SafeAreaView, TouchableOpacity, Image,
} from 'react-native';

const COLORS = {
  greenDark: '#1B4332', greenMid: '#2D6A4F', greenSoft: '#74C69D',
  greenPale: '#D8F3DC', cream: '#F8F4EF', peach: '#F4A261',
  peachPale: '#FEF3E2', white: '#FFFFFF', textDark: '#1B2A22',
  textMuted: '#6B8C7A', border: 'rgba(27,67,50,0.07)',
  red: '#E63946', redPale: '#FDECEA',
};

// ── Info Row ───────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

// ── Editable Row ───────────────────────────────────────
function EditableRow({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, styles.editableValue]}>{value} ✎</Text>
    </View>
  );
}

// ── Section Card ───────────────────────────────────────
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionDivider} />
      {children}
    </View>
  );
}

// ── Profile Screen ─────────────────────────────────────
export default function ProfileScreen() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName]     = useState('Ahmed Benali');
  const [age, setAge]       = useState('28');
  const [weight, setWeight] = useState('78');
  const [height, setHeight] = useState('178');
  const [editMode, setEditMode] = useState(false);

  const bmi = (Number(weight) / ((Number(height) / 100) ** 2)).toFixed(1);

  const handlePickAvatar = () => {
    // TODO: integrate react-native-image-picker
    // ImagePicker.launchImageLibrary({ mediaType: 'photo' }, res => {
    //   if (res.assets?.[0]?.uri) setAvatar(res.assets[0].uri);
    // });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.greenDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greetingName}>My Profile</Text>
            <Text style={styles.greetingSub}>Your personal information</Text>
          </View>
          <TouchableOpacity
            style={[styles.editBtn, editMode && styles.editBtnActive]}
            onPress={() => setEditMode(e => !e)}
          >
            <Text style={[styles.editBtnText, editMode && styles.editBtnTextActive]}>
              {editMode ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitials}>
                  {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.avatarEditBtn} onPress={handlePickAvatar}>
              <Text style={styles.avatarEditIcon}>✎</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarName}>{name}</Text>
          <Text style={styles.avatarSub}>ahmed.benali@email.com</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsPill}>
          {[
            { val: `${weight} kg`, lbl: 'Weight' },
            { val: `${height} cm`, lbl: 'Height' },
            { val: bmi,            lbl: 'BMI'    },
            { val: `${age} yr`,    lbl: 'Age'    },
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

        {/* Personal Info */}
        <Text style={styles.sectionLabel}>Personal Information</Text>
        <SectionCard title="Basic Info">
          {editMode ? (
            <>
              <EditableRow label="Full Name" value={name}   onChange={setName}   />
              <EditableRow label="Age"        value={age}    onChange={setAge}    />
              <EditableRow label="Weight (kg)" value={weight} onChange={setWeight} />
              <EditableRow label="Height (cm)" value={height} onChange={setHeight} />
            </>
          ) : (
            <>
              <InfoRow label="Full Name"    value={name}         />
              <InfoRow label="Age"          value={`${age} years`} />
              <InfoRow label="Weight"       value={`${weight} kg`} />
              <InfoRow label="Height"       value={`${height} cm`} />
              <InfoRow label="BMI"          value={`${bmi} — Normal`} />
            </>
          )}
        </SectionCard>

        {/* Diet & Health */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Diet & Health</Text>
        <SectionCard title="Health Profile">
          <InfoRow label="Activity Level" value="Moderately Active" />
          <InfoRow label="Goal"           value="Lose Weight"       />
          <InfoRow label="Diet Type"      value="Balanced"          />
          <InfoRow label="Daily Calories" value="2,200 kcal"        />
        </SectionCard>

        {/* Budget */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Budget</Text>
        <SectionCard title="Financial Limits">
          <InfoRow label="Daily Budget"   value="800 DA"    />
          <InfoRow label="Monthly Budget" value="15,000 DA" />
        </SectionCard>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: COLORS.greenDark },

  header:           { backgroundColor: COLORS.greenDark, paddingHorizontal: 24, paddingBottom: 28, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerTop:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 8, marginBottom: 20 },
  greetingName:     { fontFamily: 'serif', fontSize: 22, fontWeight: '600', color: COLORS.white, lineHeight: 28 },
  greetingSub:      { fontSize: 13, color: COLORS.greenSoft, marginTop: 4 },
  editBtn:          { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 18, paddingVertical: 7, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  editBtnActive:    { backgroundColor: COLORS.greenSoft, borderColor: COLORS.greenSoft },
  editBtnText:      { fontSize: 13, fontWeight: '600', color: COLORS.white },
  editBtnTextActive:{ color: COLORS.greenDark },

  avatarSection:    { alignItems: 'center', marginBottom: 20 },
  avatarWrap:       { position: 'relative', marginBottom: 10 },
  avatarImg:        { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  avatarFallback:   { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.greenSoft, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.25)' },
  avatarInitials:   { fontSize: 26, fontWeight: '700', color: COLORS.greenDark },
  avatarEditBtn:    { position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.greenDark },
  avatarEditIcon:   { fontSize: 12, color: COLORS.greenDark },
  avatarName:       { fontSize: 18, fontWeight: '700', color: COLORS.white },
  avatarSub:        { fontSize: 13, color: COLORS.greenSoft, marginTop: 2 },

  statsPill:        { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 50, paddingVertical: 10, paddingHorizontal: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'space-between' },
  statsItem:        { alignItems: 'center', flex: 1 },
  statsVal:         { fontSize: 14, fontWeight: '600', color: COLORS.white },
  statsLbl:         { fontSize: 10, color: COLORS.greenSoft, marginTop: 2 },
  statsDivider:     { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  scroll:           { flex: 1, backgroundColor: COLORS.cream },
  scrollContent:    { padding: 20, paddingBottom: 32 },
  sectionLabel:     { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },

  sectionCard:      { backgroundColor: COLORS.white, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: COLORS.border },
  sectionTitle:     { fontSize: 15, fontWeight: '600', color: COLORS.textDark, marginBottom: 12 },
  sectionDivider:   { height: 1, backgroundColor: COLORS.border, marginBottom: 4 },

  infoRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoLabel:        { fontSize: 14, color: COLORS.textMuted, fontWeight: '500' },
  infoValue:        { fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  editableValue:    { color: COLORS.greenMid },

  logoutBtn:        { marginTop: 24, alignItems: 'center', paddingVertical: 14, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(230,57,70,0.2)', backgroundColor: COLORS.redPale },
  logoutText:       { fontSize: 15, fontWeight: '600', color: COLORS.red },
});