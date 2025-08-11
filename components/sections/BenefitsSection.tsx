
import HomeIllustration from '@/components/illustrations/HomeIllustration';
import { Image, ScrollView, Text, View } from 'react-native';
import { AnimatedView } from '../animation/AnimatedComponents';

// Interface for benefit item
interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
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
  return (
    <AnimatedView delay={delay} className={className}>
      <Text className={className}>
        {children}
      </Text>
    </AnimatedView>
  );
};

// Static illustration component
const StaticIllustration = ({ delay }: { delay: number }) => {
  return (
    <AnimatedView delay={delay} className={styles.sectionIllustration}>
      <HomeIllustration width={300} height={300} />
    </AnimatedView>
  );
};

// Separate component for static benefit item
const BenefitItem = ({ item }: { item: BenefitItemProps }) => {
  // Delay is calculated based on the index of the item and the delay of the previous items
  const delay = item.index * 300 + 1200;

  // Return the animated view with the item's data
  return (
    <AnimatedView delay={delay} className={styles.container}>
      {item.icon}
      <Text className={styles.title}>{item.title}</Text>
      <Text className={styles.description}>{item.description}</Text>
    </AnimatedView>
  );
};

export const BenefitsSection = () => {
  return (
    <ScrollView className={styles.scrollView}>
      {/* Hero Section */}
      <View className={styles.section}>
        <AnimatedText className={styles.sectionDescription} delay={300}>
          Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
        </AnimatedText>
      </View>

      {/* Illustration */}
      <StaticIllustration delay={600} />

      {/* Benefits */}
      <View className={styles.section}>
        <AnimatedText className={styles.sectionTitle} delay={900}>
          Vantagens do nosso banco:
        </AnimatedText>
        <View className={styles.sectionBenefits}>
          {benefits.map((item, idx) => <BenefitItem key={idx} item={{ ...item, index: idx }} />)}
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
  sectionTitle: 'text-xl font-bold text-dark mb-6 text-center',
  sectionDescription: 'text-dark mb-2 text-2xl font-bold text-center',
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