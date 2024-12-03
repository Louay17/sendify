import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import MaskInput, { createNumberMask, MaskInputProps } from 'react-native-mask-input';

import { scale } from '@/utils/responsive';
import { Box, makeStyles, Text } from '@/theme';

type AmountInputProps = {
  icon: JSX.Element;
  onChangeText?: (value: string) => void;
  containerStyle?: ViewStyle;
} & MaskInputProps;

const CURRENCY = createNumberMask({
  separator: '.',
  delimiter: ',',
  precision: 3,
});

const AmountInput = ({
  icon,
  value,
  onChangeText,
  containerStyle,
  ...inputProps
}: AmountInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useStyles();
  const ref = useRef<any>(null);

  const handleChangeText = useCallback(
    (_: string, unmaskedValue: string) => {
      // Remove leading zeros and reset the value if it's starting with "0"
      const trimmedValue = unmaskedValue.replace(/^0+/, '');

      if (trimmedValue === '' || trimmedValue === '0') {
        onChangeText?.('');
      } else {
        onChangeText?.(trimmedValue);
      }
    },
    [onChangeText]
  );

  return (
    <Box
      width="100%"
      style={StyleSheet.compose(styles.container(isFocused) as ViewStyle, containerStyle)}
    >
      <Box height="100%" justifyContent="center">
        {icon}
      </Box>
      <MaskInput
        ref={ref}
        value={value}
        style={styles.input}
        textAlign="right"
        inputMode="numeric"
        verticalAlign="middle"
        keyboardType="numeric"
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        mask={CURRENCY}
        caretHidden={!value}
        {...inputProps}
      />
      {!value ? <CustomPlaceholder focusOnInput={() => ref?.current?.focus()} /> : null}
    </Box>
  );
};

const CustomPlaceholder = ({ focusOnInput }: { focusOnInput: () => void }) => (
  <Box
    zIndex="z_99"
    height="100%"
    width="auto"
    position="absolute"
    right={scale(16)}
    justifyContent="center"
  >
    <Pressable onPress={focusOnInput}>
      <Box flexDirection="row" alignItems="baseline">
        <Text
          variant="type_general_subtitle2"
          fontSize={scale(40)}
          lineHeight={scale(40)}
          color="text_disabled"
        >
          0
        </Text>
        <Text
          variant="type_general_subtitle2"
          fontSize={scale(28)}
          lineHeight={scale(28)}
          color="text_disabled"
        >
          .000
        </Text>
      </Box>
    </Pressable>
  </Box>
);

const useStyles = makeStyles(theme => ({
  container: (isFocused: boolean) => ({
    height: scale(73),
    flexDirection: 'row',
    borderWidth: scale(2),
    borderRadius: theme.borderRadii.m_8,
    borderColor: isFocused ? theme.colors.border_secondary : theme.colors.border_neutral,
    paddingHorizontal: theme.spacing.m_16,
  }),
  input: {
    flex: 1,
    fontSize: scale(40),
    lineHeight: scale(40),
    fontFamily: 'Ubuntu-Medium',
    color: theme.colors.text_title,
  },
}));

export default AmountInput;
