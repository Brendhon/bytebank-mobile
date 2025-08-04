
import { Image, ScrollView, Text, View } from 'react-native';
import HomeIllustration from '@/components/illustrations/HomeIllustration';

export const BenefitsSection = () => {
  return (
    <ScrollView className={styles.scrollView}>
      {/* Hero Section */}
      <View className={styles.section}>
        <Text className={styles.sectionDescription}>
          Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
        </Text>
      </View>

      {/* Illustration */}
      <View className={styles.sectionIllustration}>
        <HomeIllustration width={300} height={300} />
      </View>

      {/* Benefits */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          Vantagens do nosso banco:
        </Text>
        <View className={styles.sectionBenefits}>
          {benefits.map((item, idx) => (
            <View key={idx} className={styles.container}>
              {item.icon}
              <Text className={styles.title}>{item.title}</Text>
              <Text className={styles.description}>{item.description}</Text>
            </View>
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