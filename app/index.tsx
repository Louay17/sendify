import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { MotiView } from 'moti';

import { Button } from '@/components/ui';
import { Box, makeStyles, Text } from '@/theme';
import { WalletIcon } from '@/components/icons';
import { ScreenLayout } from '@/components/layouts';
import { formatAmount } from '@/utils/formatter';
import { scale, wp } from '@/utils/responsive';
import { isNumber } from '@/utils/validators';
import { UserCard } from '@/features/profile/components';
import { SendMoney, SuccessTransaction } from '@/features/money-transfer/components';
import { calculateFees } from '@/features/money-transfer/helpers/calculations';
import { useReceiver } from '@/features/money-transfer/hooks';

export default function HomeScreen({ route }: { route: any }) {
  const styles = useStyles();
  let receiverId = route?.params?.receiverId;
  if (!receiverId) {
    // INFO:  This is a fallback in case expo-router
    const { id } = useLocalSearchParams();
    receiverId = id;
  }

  const receiver = useReceiver({ id: receiverId as string });
  const [amountToSend, setAmountToSend] = useState<string>();
  const [transactionSucceded, setTransactionSucceded] = useState(false);
  const insufficientFundsToastShown = useRef(false);

  const feesAmount = useMemo(() => {
    if (!amountToSend || !isNumber(amountToSend)) return 0;
    return calculateFees(parseFloat(amountToSend));
  }, [amountToSend]);

  const currentBalance = useMemo(() => {
    if (!receiver?.balance) return 0;
    if (!amountToSend || !isNumber(amountToSend)) return receiver?.balance;
    return receiver.balance - Number(parseFloat(amountToSend) + feesAmount);
  }, [amountToSend, receiver?.balance, feesAmount]);
  console.log(receiver?.balance);

  useEffect(() => {
    if (receiver?.balance && currentBalance < 0) {
      if (!insufficientFundsToastShown.current) {
        Toast.show({ type: 'customError', text1: 'Insufficient funds', swipeable: true });
        insufficientFundsToastShown.current = true;
      }
    } else if (insufficientFundsToastShown.current) {
      Toast.hide();
      insufficientFundsToastShown.current = false; // Reset when funds are sufficient
    }
  }, [receiver?.balance, currentBalance]);

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
              amount={amountToSend}
              changeAmount={setAmountToSend}
              feesAmount={feesAmount}
              currency={receiver.currency}
            />
          </Box>
        </ScrollView>
        <Box width="100%" padding="m_16">
          <Button
            label="Send money"
            onPress={() => {
              setTransactionSucceded(true);
              Keyboard.dismiss();
            }}
            disabled={!amountToSend || !isNumber(amountToSend) || currentBalance < 0}
          />
        </Box>
      </KeyboardAvoidingView>
      {transactionSucceded ? (
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
              moneySent: Number(amountToSend),
              totalAmount: Number(amountToSend) + feesAmount,
            }}
            onDismiss={() => {
              setAmountToSend(undefined);
              setTransactionSucceded(false);
            }}
          />
        </MotiView>
      ) : null}
    </ScreenLayout>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 9999,
    position: 'absolute',
    backgroundColor: theme.colors.bg_main,
  },
  fullSpace: { flex: 1, width: '100%' },
  contentContainer: { flexGrow: 1, width: '100%', paddingVertical: scale(24) },
}));
