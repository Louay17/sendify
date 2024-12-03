import { Box, makeStyles, Text, theme } from '@/theme';
import LottieView from 'lottie-react-native';
import { scale } from '@/utils/responsive';
import { Image } from 'expo-image';
import { UserData } from '../types';
import { Keyboard, Pressable } from 'react-native';
import { ChevronLeftIcon, TunisianCurrency } from '@/components/icons';
import { ScrollView } from 'moti';
import { formatAmount } from '@/utils/formatter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import { createRef, useEffect } from 'react';

type Props = {
  receiver: UserData;
  transaction: {
    id: string;
    moneySent: number;
    feeAmount: number;
    totalAmount: number;
  };
  onDismiss: () => void;
};

const SuccessTransaction = ({ receiver, transaction, onDismiss }: Props) => {
  const styles = useStyles();
  const animationRef = createRef<LottieView>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      animationRef.current?.play();
    }, 400);

    return () => {
      animationRef.current?.reset();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Box height={scale(56)} px="m_16" justifyContent="center">
        <Pressable hitSlop={scale(42)} onPress={onDismiss}>
          <ChevronLeftIcon />
        </Pressable>
      </Box>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Box>
          <Box alignItems="center">
            <LottieView
              ref={animationRef}
              loop={false}
              duration={2000}
              resizeMode="cover"
              style={{ width: scale(157), height: scale(157) }}
              source={require('@/assets/animations/success.json')}
            />
            <Text variant="type_title_h3" textAlign="center" color="text_title">
              Transaction completed
            </Text>
          </Box>
          <Box mt="l_32" />
          <Box
            gap="m_16"
            padding="m_16"
            borderRadius="l_12"
            borderColor="gray8"
            borderWidth={scale(1)}
            marginHorizontal="m_16"
          >
            <Box alignItems="center" alignSelf="center">
              <Image source={receiver.avatar} contentFit="contain" style={styles.avatar} />
              <Box mt="m_16" />
              <AmountText amount={transaction.totalAmount} size="large" />
              <Text variant="type_general_body2" color="gray200">
                Money sent
              </Text>
            </Box>
            <Box gap="m_16">
              <Box height={scale(1)} backgroundColor="gray8" />
              <Box gap="s_8">
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Text variant="type_general_body2" color="text_disabled">
                    Amount
                  </Text>
                  <AmountText amount={transaction.moneySent} />
                </Box>
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Text variant="type_general_body2" color="text_disabled">
                    Fee
                  </Text>
                  <AmountText amount={transaction.feeAmount} />
                </Box>
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Text variant="type_general_body2" color="text_disabled">
                    Total
                  </Text>
                  <AmountText amount={transaction.feeAmount} />
                </Box>
              </Box>
              <Box height={scale(1)} backgroundColor="gray8" />
              <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                <Text variant="type_general_body2" color="text_disabled">
                  Total
                </Text>
                <Text variant="type_general_subtitle2" color="text_title">
                  {transaction.id}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" padding="m_16">
          <Button label="Done" onPress={onDismiss} />
        </Box>
      </ScrollView>
    </>
  );
};
const Sizes = {
  small: {
    integerSize: scale(16),
    decimalSize: scale(14),
    currencySize: scale(9),
  },
  large: {
    integerSize: scale(32),
    decimalSize: scale(24),
    currencySize: scale(18),
  },
};

const AmountText = ({ amount, size = 'small' }: { amount: number; size?: 'small' | 'large' }) => {
  const { integerSize, decimalSize, currencySize } = Sizes[size] || Sizes['small'];
  return (
    <Box flexDirection="row" gap={size === 'small' ? 'xs_4' : 'sm_12'} alignItems="center">
      <Text
        variant="type_title_h2"
        color="text_title"
        fontSize={integerSize}
        lineHeight={integerSize}
      >
        -
      </Text>
      <Box flexDirection="row" alignItems="center" gap="xs_4">
        <TunisianCurrency
          width={currencySize}
          height={currencySize + 2}
          style={{ top: scale(0.5) }}
          color={theme.colors.text_title}
        />
        <Box flexDirection="row" alignItems="baseline">
          <Text
            variant="type_title_h2"
            color="text_title"
            fontSize={integerSize}
            lineHeight={integerSize}
          >
            {formatAmount(amount).split('.')[0]}
          </Text>
          <Text
            variant="type_general_body1"
            color="text_title"
            fontSize={decimalSize}
            lineHeight={decimalSize}
          >{`.${formatAmount(amount).split('.')[1]}`}</Text>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  container: { flex: 1, width: '100%', backgroundColor: theme.colors.bg_main },
  contentContainer: {
    flexGrow: 1,
    width: '100%',
    paddingTop: scale(12),
    justifyContent: 'space-between',
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: theme.borderRadii.xl_100,
  },
}));

export default SuccessTransaction;
