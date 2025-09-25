import { Tabs } from 'expo-router';
import { HelpCircle, Home, Info, Layers, Mail } from 'lucide-react-native';

export default function PublicLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#6b7280',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          paddingTop: 6,
          paddingBottom: 14,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="funktioner"
        options={{
          title: 'Funktioner',
          tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="om-oss"
        options={{
          title: 'Om oss',
          tabBarIcon: ({ color, size }) => <Info color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="kontakt"
        options={{
          title: 'Kontakt',
          tabBarIcon: ({ color, size }) => <Mail color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          tabBarIcon: ({ color, size }) => <HelpCircle color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
