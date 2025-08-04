
import HomeIllustration from '@/components/illustrations/HomeIllustration';
import { useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';

// Interface for benefit item
interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Animated text component
const AnimatedText = ({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className: string; 
  delay?: number;
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { 
        duration: 800,
        easing: Easing.out(Easing.cubic)
      })
    );
    
    translateY.value = withDelay(
      delay,
      withTiming(0, { 
        duration: 800,
        easing: Easing.out(Easing.cubic)
      })
    );
  }, [delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value }
      ]
    };
  });

  return (
    <Animated.Text 
      className={className}
      style={animatedStyle}
    >
      {children}
    </Animated.Text>
  );
};

// Animated illustration component
const AnimatedIllustration = ({ delay = 0 }: { delay?: number }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { 
        duration: 1000,
        easing: Easing.out(Easing.cubic)
      })
    );
    
    scale.value = withDelay(
      delay,
      withTiming(1, { 
        duration: 1000,
        easing: Easing.out(Easing.cubic)
      })
    );
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value }
      ]
    };
  });

  return (
    <Animated.View 
      className={styles.sectionIllustration}
      style={animatedStyle}
    >
      <HomeIllustration width={300} height={300} />
    </Animated.View>
  );
};

// Separate component for animated benefit item
const BenefitItem = ({ 
  item, 
  index, 
  delay = 0 
}: { 
  item: BenefitItemProps; 
  index: number; 
  delay?: number;
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    // Animate with delay
    const animationDelay = delay + (index * 300);
    
    opacity.value = withDelay(
      animationDelay,
      withTiming(1, { 
        duration: 600,
        easing: Easing.out(Easing.cubic)
      })
    );
    
    translateY.value = withDelay(
      animationDelay,
      withTiming(0, { 
        duration: 600,
        easing: Easing.out(Easing.cubic)
      })
    );
  }, [delay, index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value }
      ]
    };
  });

  return (
    <Animated.View 
      className={styles.container}
      style={animatedStyle}
    >
      {item.icon}
      <Text className={styles.title}>{item.title}</Text>
      <Text className={styles.description}>{item.description}</Text>
    </Animated.View>
  );
};

export const BenefitsSection = () => {
  return (
    <ScrollView className={styles.scrollView}>
      {/* Hero Section */}
      <View className={styles.section}>
        <AnimatedText 
          className={styles.sectionDescription}
          delay={200}
        >
          Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
        </AnimatedText>
      </View>

      {/* Illustration */}
      <AnimatedIllustration delay={400} />

      {/* Benefits */}
      <View className={styles.section}>
        <AnimatedText 
          className={styles.sectionTitle}
          delay={600}
        >
          Vantagens do nosso banco:
        </AnimatedText>
        <View className={styles.sectionBenefits}>
          {benefits.map((item, idx) => (
            <BenefitItem 
              key={idx}
              item={item}
              index={idx}
              delay={800}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}; 

const styles = {
  icon: 'w-16 h-12',
  title: 'text-green text-lg font-semibold text-center',
  description: 'text-gray text-center',
  container: 'flex flex-col items-center gap-3',
  section: 'mb-2',
  sectionTitle: 'text-2xl font-bold text-dark mb-8 text-center',
  sectionDescription: 'text-dark mb-4 text-3xl font-bold text-center',
  sectionIllustration: 'items-center justify-center flex',
  sectionBenefits: 'my-4 gap-8 mb-10',
  scrollView: 'flex-1 px-4 py-8',
};

const benefits = [
  {
    icon: <Image source={require('@/assets/images/box.png')} className={styles.icon} />,
    title: 'Conta e cartão gratuitos',
    description: 'Nossa conta é digital, sem custo fixo e sem tarifa de manutenção.',
  },
  {
    icon: <Image source={require('@/assets/images/withdrawal.png')} className={styles.icon} />,
    title: 'Saques sem custo',
    description: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
  },
  {
    icon: <Image source={require('@/assets/images/star.png')} className={styles.icon} />,
    title: 'Programa de pontos',
    description: 'Acumule pontos com compras no crédito sem pagar mensalidade!',
  },
  {
    icon: <Image source={require('@/assets/images/devices.png')} className={styles.icon} />,
    title: 'Seguro Dispositivos',
    description: 'Proteja seus dispositivos móveis por uma mensalidade simbólica.',
  },
];