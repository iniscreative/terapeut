import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, ChevronDown, ChevronUp, CircleHelp as HelpCircle, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FAQScreen() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: 'Allmänt',
      questions: [
        {
          question: 'Vad är Mindeli?',
          answer: 'Mindeli är en avancerad plattform för medicinsk diagnostik som använder AI för att hjälpa vårdpersonal med noggrann bedömning och diagnos av patienter.',
        },
        {
          question: 'Vem kan använda Mindeli?',
          answer: 'Mindeli är designat för legitimerad vårdpersonal inklusive läkare, psykologer, terapeuter och andra medicinska specialister.',
        },
        {
          question: 'Vilka typer av diagnoser stöds?',
          answer: 'Vi stöder ett brett spektrum av diagnoser inom mental hälsa, neurologi, kognitiva bedömningar och allmän medicinsk diagnostik.',
        },
      ],
    },
    {
      title: 'Säkerhet & Integritet',
      questions: [
        {
          question: 'Hur säker är patientdata?',
          answer: 'All patientdata krypteras med AES-256 kryptering och lagras säkert enligt GDPR-standarder. Vi genomför regelbundna säkerhetsrevisioner.',
        },
        {
          question: 'Är Mindeli GDPR-kompatibel?',
          answer: 'Ja, Mindeli är fullt GDPR-kompatibel och certifierad. Vi följer alla europeiska dataskyddsregler och ger användare full kontroll över sina data.',
        },
        {
          question: 'Vem har tillgång till patientdata?',
          answer: 'Endast auktoriserad vårdpersonal som du ger tillgång till kan se patientdata. Vi har strikta åtkomstkontroller och loggning av all dataåtkomst.',
        },
      ],
    },
    {
      title: 'Teknisk Support',
      questions: [
        {
          question: 'Vilka enheter stöds?',
          answer: 'Mindeli fungerar på alla moderna webbläsare, iOS och Android-enheter. Vi rekommenderar senaste versionen av Chrome, Safari eller Firefox.',
        },
        {
          question: 'Behöver jag installera någon programvara?',
          answer: 'Nej, Mindeli är en webbaserad plattform som fungerar direkt i din webbläsare. För mobila enheter finns även en app tillgänglig.',
        },
        {
          question: 'Vad händer om jag får tekniska problem?',
          answer: 'Vår tekniska support är tillgänglig 24/7 via chat, e-post eller telefon. Vi har också en omfattande kunskapsbas med guider och tutorials.',
        },
      ],
    },
    {
      title: 'Priser & Abonnemang',
      questions: [
        {
          question: 'Vad kostar Mindeli?',
          answer: 'Vi erbjuder flexibla prisplaner från 299 kr/månad för enskilda terapeuter upp till företagsplaner. Kontakta oss för anpassade priser.',
        },
        {
          question: 'Finns det en gratis provperiod?',
          answer: 'Ja, vi erbjuder en 30-dagars gratis provperiod där du får tillgång till alla funktioner utan begränsningar.',
        },
        {
          question: 'Kan jag avbryta mitt abonnemang när som helst?',
          answer: 'Ja, du kan avbryta ditt abonnemang när som helst utan uppsägningstid. Din data förblir säker och tillgänglig enligt våra databevaranderegler.',
        },
      ],
    },
  ];

  const toggleExpanded = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 100 + questionIndex;
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 100 + questionIndex;
    return expandedItems.includes(itemId);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#d97706', '#f59e0b', '#fbbf24']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowRight size={24} color="#ffffff" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vanliga Frågor</Text>
        <Text style={styles.headerSubtitle}>Hitta svar på dina frågor om Mindeli</Text>
      </LinearGradient>

      {/* Search Suggestion */}
      <View style={styles.searchSuggestion}>
        <HelpCircle size={24} color="#d97706" />
        <View style={styles.searchSuggestionText}>
          <Text style={styles.suggestionTitle}>Hittar du inte svaret?</Text>
          <Text style={styles.suggestionDescription}>
            Kontakta vår support för personlig hjälp
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => router.push('/(public)/kontakt')}
        >
          <MessageCircle size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* FAQ Categories */}
      <View style={styles.faqContainer}>
        {faqCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            
            {category.questions.map((item, questionIndex) => (
              <View key={questionIndex} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.questionHeader}
                  onPress={() => toggleExpanded(categoryIndex, questionIndex)}
                >
                  <Text style={styles.questionText}>{item.question}</Text>
                  {isExpanded(categoryIndex, questionIndex) ? (
                    <ChevronUp size={20} color="#6b7280" />
                  ) : (
                    <ChevronDown size={20} color="#6b7280" />
                  )}
                </TouchableOpacity>
                
                {isExpanded(categoryIndex, questionIndex) && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Contact CTA */}
      <View style={styles.ctaContainer}>
        <LinearGradient
          colors={['#2563eb', '#3b82f6']}
          style={styles.ctaCard}
        >
          <Text style={styles.ctaTitle}>Behöver du mer hjälp?</Text>
          <Text style={styles.ctaDescription}>
            Vårt supportteam är redo att hjälpa dig med alla frågor
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/(public)/kontakt')}
          >
            <Text style={styles.ctaButtonText}>Kontakta Support</Text>
            <ArrowRight size={20} color="#2563eb" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Quick Links */}
      <View style={styles.quickLinksContainer}>
        <Text style={styles.quickLinksTitle}>Snabblänkar</Text>
        <View style={styles.quickLinksGrid}>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.quickLinkText}>Kom igång</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => router.push('../(public)/funktioner')}
          >
            <Text style={styles.quickLinkText}>Funktioner</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => router.push('/(public)/om-oss')}
          >
            <Text style={styles.quickLinkText}>Om oss</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickLinkItem}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.quickLinkText}>Logga in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fef3c7',
  },
  searchSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchSuggestionText: {
    flex: 1,
    marginLeft: 16,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  contactButton: {
    backgroundColor: '#d97706',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqContainer: {
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 16,
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  answerText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
    paddingTop: 16,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  ctaCard: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 16,
    color: '#dbeafe',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  quickLinksContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  quickLinksTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLinkItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickLinkText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
});