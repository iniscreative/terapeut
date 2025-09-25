import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, Heart, Lightbulb, Shield, Target } from 'lucide-react-native';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function OmOssScreen() {
  const team = [
    { name: 'Dr. Anna Lindström', role: 'VD & Grundare', description: 'Legitimerad psykolog med 15 års erfarenhet inom klinisk diagnostik.', avatar: 'AL' },
    { name: 'Dr. Erik Johansson', role: 'CTO', description: 'Teknisk chef med expertis inom AI och medicinsk teknologi.', avatar: 'EJ' },
    { name: 'Maria Karlsson', role: 'Produktchef', description: 'Specialist på användarupplevelse inom hälso- och sjukvård.', avatar: 'MK' },
    { name: 'Dr. Lars Nilsson', role: 'Medicinsk Rådgivare', description: 'Neurolog med fokus på diagnostiska verktyg och metoder.', avatar: 'LN' },
  ];

  const values = [
    { icon: Heart,   title: 'Patientfokus', description: 'Allt vi gör syftar till att förbättra patientvården och behandlingsresultat.', color: '#dc2626' },
    { icon: Target,  title: 'Precision',    description: 'Vi strävar efter högsta möjliga noggrannhet i all diagnostik.',             color: '#2563eb' },
    { icon: Lightbulb, title: 'Innovation', description: 'Vi utvecklar ständigt nya lösningar för framtidens sjukvård.',             color: '#d97706' },
    { icon: Shield,  title: 'Säkerhet',     description: 'Patientdata skyddas med branschens högsta säkerhetsstandarder.',          color: '#059669' },
  ];

  const milestones = [
    { year: '2020', event: 'Mindeli grundades av Dr. Anna Lindström' },
    { year: '2021', event: 'Första AI-algoritmen för diagnostik lanserades' },
    { year: '2022', event: 'GDPR-certifiering och expansion till Norge' },
    { year: '2023', event: '500+ terapeuter anslöt sig till plattformen' },
    { year: '2024', event: 'Lansering av avancerade analysverktyg' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#7c3aed', '#8b5cf6', '#a78bfa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Om Oss</Text>
        <Text style={styles.headerSubtitle}>Vår mission att revolutionera diagnostik</Text>
      </LinearGradient>

      {/* Mission Section */}
      <View style={styles.missionContainer}>
        <Text style={styles.sectionTitle}>Vår Mission</Text>
        <Text style={styles.missionText}>
          Mindeli grundades med visionen att demokratisera tillgången till högkvalitativ medicinsk diagnostik. 
          Vi tror på att kombinera den senaste teknologin med djup klinisk expertis för att skapa verktyg 
          som verkligen gör skillnad i patienters liv.
        </Text>
        <Text style={styles.missionText}>
          Genom att använda artificiell intelligens och maskininlärning hjälper vi vårdpersonal att fatta 
          mer informerade beslut, minska diagnostiska fel och förbättra behandlingsresultat.
        </Text>
      </View>

      {/* Values Section */}
      <View style={styles.valuesContainer}>
        <Text style={styles.sectionTitle}>Våra Värderingar</Text>
        <View style={styles.valuesGrid}>
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <View key={index} style={styles.valueCard}>
                <View style={[styles.valueIcon, { backgroundColor: `${value.color}15` }]}>
                  <IconComponent size={28} color={value.color} />
                </View>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.teamContainer}>
        <Text style={styles.sectionTitle}>Vårt Team</Text>
        <Text style={styles.teamIntro}>
          Bakom Mindeli står ett team av erfarna läkare, tekniker och produktspecialister
        </Text>
        <View style={styles.teamGrid}>
          {team.map((member, index) => (
            <View key={index} style={styles.teamCard}>
              <View style={styles.teamAvatar}>
                <Text style={styles.avatarText}>{member.avatar}</Text>
              </View>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
              <Text style={styles.teamCardDescription}>{member.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Timeline Section */}
      <View style={styles.timelineContainer}>
        <Text style={styles.sectionTitle}>Vår Resa</Text>
        {milestones.map((milestone, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineYear}>
              <Text style={styles.yearText}>{milestone.year}</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineEvent}>{milestone.event}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.statsCard}>
          <Text style={styles.statsTitle}>Mindeli idag</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Terapeuter</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10,000+</Text>
              <Text style={styles.statLabel}>Diagnoser</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Länder</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Nöjdhet</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaContainer}>
        <LinearGradient colors={['#059669', '#10b981']} style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Bli en del av vår resa</Text>
          <Text style={styles.ctaDescription}>
            Gå med i hundratals terapeuter som redan förbättrar patientvården med Mindeli
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.ctaButtonText}>Kom igång idag</Text>
            <ArrowRight size={20} color="#059669" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  headerTitle: { fontSize: 32, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#ddd6fe' },

  missionContainer: { paddingHorizontal: 20, paddingVertical: 30 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 20 },
  missionText: { fontSize: 16, color: '#6b7280', lineHeight: 24, marginBottom: 16 },

  valuesContainer: { paddingHorizontal: 20, marginBottom: 30 },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  valueCard: {
    backgroundColor: '#ffffff',
    width: (width - 56) / 2,
    padding: 20, borderRadius: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  valueIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  valueTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8, textAlign: 'center' },
  valueDescription: { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20 },

  teamContainer: { paddingHorizontal: 20, marginBottom: 30 },
  teamIntro: { fontSize: 16, color: '#6b7280', marginBottom: 24, textAlign: 'center' }, // <- renombrado
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  teamCard: {
    backgroundColor: '#ffffff',
    width: (width - 56) / 2,
    padding: 20, borderRadius: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  teamAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarText: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
  teamName: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4, textAlign: 'center' },
  teamRole: { fontSize: 14, color: '#7c3aed', marginBottom: 8, textAlign: 'center' },
  teamCardDescription: { fontSize: 12, color: '#6b7280', textAlign: 'center', lineHeight: 16 }, // <- renombrado

  timelineContainer: { paddingHorizontal: 20, marginBottom: 30 },
  timelineItem: { flexDirection: 'row', marginBottom: 20 },
  timelineYear: { width: 60, alignItems: 'center', marginRight: 20 },
  yearText: { fontSize: 16, fontWeight: '700', color: '#7c3aed' },
  timelineContent: {
    flex: 1, backgroundColor: '#ffffff', padding: 16, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  timelineEvent: { fontSize: 14, color: '#1f2937', lineHeight: 20 },

  statsContainer: { paddingHorizontal: 20, marginBottom: 30 },
  statsCard: { borderRadius: 20, padding: 32 },
  statsTitle: { fontSize: 20, fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 20 },
  statItem: { alignItems: 'center', minWidth: 80 },
  statNumber: { fontSize: 28, fontWeight: '800', color: '#7c3aed', marginBottom: 4 },
  statLabel: { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  ctaContainer: { paddingHorizontal: 20, marginBottom: 40 },
  ctaCard: { borderRadius: 20, padding: 32, alignItems: 'center' },
  ctaTitle: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 8 },
  ctaDescription: { fontSize: 16, color: '#a7f3d0', textAlign: 'center', marginBottom: 24 },
  ctaButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 12, gap: 8 },
  ctaButtonText: { fontSize: 16, fontWeight: '600', color: '#059669' },
});
