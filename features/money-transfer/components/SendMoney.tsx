import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { MotiView } from 'moti';

import { Box, makeStyles, Text } from '@/theme';
import { scale } from '@/utils/responsive';
import { isNumber } from '@/utils/validators';
import { formatAmount } from '@/utils/formatter';
import { AmountInput } from '@/components/ui';
import { TunisianCurrency } from '@/components/icons';
import { FEE_DISCOUNT_THRESHOLD, PREDEFINED_AMOUNTS } from '../constants';

const transition = LinearTransition.duration(300);

type SendMoneyProps = {
  amountToSent?: string;
  feesAmount?: number;
  currency: string;
  setAmountToSent: (amount: string) => void;
};

const SendMoney = ({ amountToSent, feesAmount, setAmountToSent, currency }: SendMoneyProps) => {
  const styles = useStyles();

  return (
    <Box flex={1} gap="xl_64" justifyContent="space-between">
      <Box width="100%" px="m_16">
        <AmountInput
          value={amountToSent}
          icon={<TunisianCurrency />}
          onChangeText={setAmountToSent}
        />
        <Box mb="m_16" />
        {amountToSent && isNumber(amountToSent) && Number(amountToSent) < FEE_DISCOUNT_THRESHOLD ? (
          <MotiView
            from={{ translateY: -scale(15), opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.discountBox}
          >
            <Text variant="type_general_caption1" py="xs_4" px="s_8" color="text_success">
              Enjoy your first 20 DT of the day with a fee of 5 millimes.
            </Text>
          </MotiView>
        ) : null}
        <Animated.View layout={transition}>
          <Box gap="xs_4">
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="type_general_body1" color="text_subtitle">
                Fees:
              </Text>
              <Text variant="type_general_body1" color="text_subtitle">
                {formatAmount(feesAmount || 0)} {currency}
              </Text>
            </Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="type_general_subtitle1" color="text_title">
                Total:
              </Text>
              <Text variant="type_general_subtitle1" color="text_title">
                {formatAmount(
                  amountToSent && feesAmount && isNumber(amountToSent) && isNumber(feesAmount)
                    ? Number(amountToSent) + Number(feesAmount)
                    : 0
                )}{' '}
                {currency}
              </Text>
            </Box>
          </Box>
        </Animated.View>
      </Box>
      <Box
        px="l_32"
        gap="m_16"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
        mb="l_32"
      >
        {PREDEFINED_AMOUNTS.map(
          ({ label, amount }) =>
            isNumber(amount) && (
              <Pressable key={amount} onPress={() => setAmountToSent(`${amount}`)}>
                <Box
                  py="s_8"
                  px="m_16"
                  borderRadius="xl_100"
                  borderWidth={scale(1)}
                  borderColor={
                    amountToSent && Number(amountToSent) === amount
                      ? 'border_secondary'
                      : 'border_neutral'
                  }
                  backgroundColor={
                    amountToSent && Number(amountToSent) === amount
                      ? 'bg_secondary_subtle'
                      : 'bg_main'
                  }
                >
                  <Text variant="type_button_m" color="text_title">
                    {label}
                  </Text>
                </Box>
              </Pressable>
            )
        )}
      </Box>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  discountBox: {
    backgroundColor: theme.colors.green100,
    borderRadius: theme.borderRadii.s_4,
    marginBottom: theme.spacing.xs_4,
  },
}));

export default SendMoney;