import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function KontaktScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '+46 8 123 456 78',
      description: 'Måndag-Fredag 08:00-17:00',
      color: '#2563eb',
    },
    {
      icon: Mail,
      title: 'E-post',
      value: 'support@mindeli.se',
      description: 'Vi svarar inom 24 timmar',
      color: '#dc2626',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Chatta med oss',
      description: 'Tillgänglig vardagar 09:00-16:00',
      color: '#059669',
    },
  ];

  const offices = [
    {
      city: 'Stockholm',
      address: 'Kungsgatan 12, 111 43 Stockholm',
      phone: '+46 8 123 456 78',
      hours: 'Måndag-Fredag 08:00-17:00',
    },
    {
      city: 'Göteborg',
      address: 'Avenyn 24, 411 36 Göteborg',
      phone: '+46 31 123 456 78',
      hours: 'Måndag-Fredag 08:00-17:00',
    },
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Fel', 'Vänligen fyll i alla obligatoriska fält');
      return;
    }

    Alert.alert(
      'Meddelande skickat',
      'Tack för ditt meddelande! Vi återkommer inom 24 timmar.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({ name: '', email: '', subject: '', message: '' });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#059669', '#10b981', '#34d399']}
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
        <Text style={styles.headerTitle}>Kontakta Oss</Text>
        <Text style={styles.headerSubtitle}>Vi hjälper dig gärna med dina frågor</Text>
      </LinearGradient>

      {/* Contact Methods */}
      <View style={styles.contactMethodsContainer}>
        <Text style={styles.sectionTitle}>Kontaktvägar</Text>
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <TouchableOpacity key={index} style={styles.contactCard}>
              <View style={[styles.contactIcon, { backgroundColor: `${method.color}15` }]}>
                <IconComponent size={24} color={method.color} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={[styles.contactValue, { color: method.color }]}>{method.value}</Text>
                <Text style={styles.contactDescription}>{method.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Skicka ett meddelande</Text>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Namn *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
              placeholder="Ditt fullständiga namn"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-post *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
              placeholder="din@email.se"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Ämne</Text>
            <TextInput
              style={styles.textInput}
              value={formData.subject}
              onChangeText={(value) => setFormData(prev => ({ ...prev, subject: value }))}
              placeholder="Vad gäller ditt meddelande?"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Meddelande *</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput]}
              value={formData.message}
              onChangeText={(value) => setFormData(prev => ({ ...prev, message: value }))}
              placeholder="Beskriv ditt ärende..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Send size={20} color="#ffffff" />
            <Text style={styles.submitButtonText}>Skicka meddelande</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Office Locations */}
      <View style={styles.officesContainer}>
        <Text style={styles.sectionTitle}>Våra kontor</Text>
        {offices.map((office, index) => (
          <View key={index} style={styles.officeCard}>
            <View style={styles.officeHeader}>
              <View style={styles.officeIcon}>
                <MapPin size={20} color="#059669" />
              </View>
              <Text style={styles.officeCity}>{office.city}</Text>
            </View>
            <Text style={styles.officeAddress}>{office.address}</Text>
            <View style={styles.officeDetails}>
              <View style={styles.officeDetail}>
                <Phone size={14} color="#6b7280" />
                <Text style={styles.officeDetailText}>{office.phone}</Text>
              </View>
              <View style={styles.officeDetail}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.officeDetailText}>{office.hours}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={styles.ctaContainer}>
        <LinearGradient
          colors={['#2563eb', '#3b82f6']}
          style={styles.ctaCard}
        >
          <Text style={styles.ctaTitle}>Redo att komma igång?</Text>
          <Text style={styles.ctaDescription}>
            Upptäck hur Mindeli kan förbättra din kliniska praxis
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.ctaButtonText}>Starta gratis provperiod</Text>
            <ArrowRight size={20} color="#2563eb" />
          </TouchableOpacity>
        </LinearGradient>
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
    color: '#a7f3d0',
  },
  contactMethodsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  messageInput: {
    minHeight: 120,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  officesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  officeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  officeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  officeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  officeCity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  officeAddress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    marginLeft: 44,
  },
  officeDetails: {
    marginLeft: 44,
    gap: 8,
  },
  officeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  officeDetailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
});