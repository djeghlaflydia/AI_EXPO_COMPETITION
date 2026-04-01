import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, spacing } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'WelcomeOnboarding'>;
};

type Slide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const slides: Slide[] = [
  {
    id: '1',
    title: 'Bienvenue sur NutriAlgérie',
    description: 'Votre nutritionniste personnel algérien dans votre poche. Des repas adaptés à votre culture.',
    icon: 'restaurant-outline',
    color: '#10B981',
  },
  {
    id: '2',
    title: 'Cuisinez Local & Économisez',
    description: 'Optimisez vos achats au marché et préparez des recettes délicieuses sans dépasser votre budget.',
    icon: 'wallet-outline',
    color: '#F59E0B',
  },
  {
    id: '3',
    title: 'Suivez Votre Santé',
    description: 'Une IA qui comprend vos besoins médicaux et physiques pour une vie plus saine au quotidien.',
    icon: 'heart-outline',
    color: '#EF4444',
  },
];

export default function WelcomeOnboardingScreen({ navigation }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentSlide + 1),
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const renderSlide = (slide: Slide) => {
    return (
      <View key={slide.id} style={styles.slide}>
        <View style={[styles.iconContainer, { backgroundColor: slide.color + '15' }]}>
          <Ionicons name={slide.icon as any} size={100} color={slide.color} />
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          setCurrentSlide(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
        scrollEventThrottle={16}
      >
        {slides.map(renderSlide)}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [
                width * (index - 1),
                width * index,
                width * (index + 1),
              ],
              outputRange: [10, 25, 10],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange: [
                width * (index - 1),
                width * index,
                width * (index + 1),
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity, backgroundColor: slides[currentSlide].color },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: slides[currentSlide].color }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Commencer' : 'Continuer'}
          </Text>
          <Ionicons 
            name={currentSlide === slides.length - 1 ? "checkmark-circle" : "arrow-forward"} 
            size={20} 
            color={colors.surface} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  skipText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingTop: height * 0.1,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
