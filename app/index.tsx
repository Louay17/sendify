import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { MotiView } from 'moti';

import { Button } from '@/components/ui';
import { WalletIcon } from '@/components/icons';
import { ScreenLayout } from '@/components/layouts';
import { formatAmount } from '@/utils/formatter';
import { scale, wp } from '@/utils/responsive';
import { Box, makeStyles, Text } from '@/theme';
import { UserCard } from '@/features/profile/components';
import { useReceiver } from '@/features/money-transfer/hooks';
import { SendMoney, SuccessTransaction } from '@/features/money-transfer/components';
import { isNumber } from '@/utils/validators';
import { FEE_DISCOUNT_THRESHOLD } from '@/features/money-transfer/constants';

export default function Home() {
  const styles = useStyles();
  const { receiverId } = useLocalSearchParams();
  const receiver = useReceiver({ id: receiverId as string });
  const [amountToSent, setAmountToSent] = useState<string>();
  const [transactionSucceded, setTransactionSucceded] = useState(false);

  const feesAmount = useMemo(() => {
    if (!amountToSent) return 0;

    const amount = parseFloat(amountToSent);

    // If the amount is less than 20 TND, apply the discount (5 millimes)
    if (amount < FEE_DISCOUNT_THRESHOLD) {
      return 5;
    }

    // Calculate 1% of the amount
    const fee = amount * 0.01;

    // Apply maximum cap of 3 TND
    return fee > 3000 ? 3000 : fee;
  }, [amountToSent]);

  const currentBalance = useMemo(() => {
    if (!receiver) return 0;

    return receiver.balance - Number(Number(amountToSent) + feesAmount);
  }, [amountToSent, receiver?.balance, feesAmount]);

  useEffect(() => {
    if (receiver?.balance && receiver.balance < Number(Number(amountToSent) + feesAmount)) {
      Toast.show({
        type: 'customError',
        text1: 'insufficient funds',
        swipeable: true,
      });
    }
  }, [receiver?.balance, amountToSent, feesAmount]);

  if (!receiver) return null;

  return (
    <ScreenLayout title="Send money">
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={scale(36)}
        style={styles.fullSpace}
      >
        <ScrollView
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <Box width="100%" alignItems="center">
            <UserCard
              phoneNumber={receiver.phone}
              fullname={receiver.fullname}
              avatar={receiver.avatar}
            />
          </Box>
          <Box mt="l_32" />
          <Box flex={1} width="100%" alignItems="center">
            <Box
              px="s_8"
              py="xs_4"
              gap="s_8"
              flexDirection="row"
              alignItems="center"
              borderRadius="xl_100"
              backgroundColor="action_bg_disabled"
            >
              <Box flexDirection="row" alignItems="center" gap="xs_4">
                <WalletIcon />
                <Text variant="type_general_body2" color="text_subtitle" textTransform="capitalize">
                  {`balance:`}
                </Text>
              </Box>
              <Text variant="type_general_subtitle2" color="text_title">
                {`${formatAmount(currentBalance)} ${receiver.currency}`}
              </Text>
            </Box>
            <Box mt="s_8" />
            <SendMoney
              amountToSent={amountToSent}
              setAmountToSent={setAmountToSent}
              feesAmount={feesAmount}
              currency={receiver.currency}
            />
          </Box>
        </ScrollView>
        <Box width="100%" padding="m_16">
          <Button
            disabled={
              !amountToSent ||
              !isNumber(amountToSent) ||
              receiver.balance < Number(Number(amountToSent) + feesAmount)
            }
            label="Send money"
            onPress={() => setTransactionSucceded(true)}
          />
        </Box>
      </KeyboardAvoidingView>
      {transactionSucceded && (
        <MotiView
          from={{ translateX: wp(100) }}
          animate={{ translateX: 0 }}
          transition={{ type: 'timing', duration: 400 }}
          style={StyleSheet.compose(StyleSheet.absoluteFill, { backgroundColor: 'white' })}
        >
          <SuccessTransaction
            receiver={receiver}
            transaction={{
              id: Math.floor(Math.random() * 1e13).toString(),
              feeAmount: feesAmount,
              moneySent: Number(amountToSent),
              totalAmount: Number(amountToSent) + feesAmount,
            }}
            onDismiss={() => {
              setAmountToSent(undefined);
              setTransactionSucceded(false);
            }}
          />
        </MotiView>
      )}
    </ScreenLayout>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: theme.colors.bg_main,
  },
  fullSpace: { flex: 1, width: '100%' },
  contentContainer: { flexGrow: 1, width: '100%', paddingVertical: scale(24) },
}));
