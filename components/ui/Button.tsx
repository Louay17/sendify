import { ActivityIndicator, Pressable, PressableProps, ViewStyle } from 'react-native';

import { scale } from '@/utils/responsive';
import { makeStyles, Text, theme } from '@/theme';
import { useState } from 'react';

type ButtonProps = {
  label?: string;
  isLoading?: boolean;
} & PressableProps;

const Button = ({ label, isLoading, disabled, ...props }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const styles = useStyles();

  return (
    <Pressable
      disabled={disabled || isLoading}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={styles.container(isPressed, !!disabled) as ViewStyle}
      {...props}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          style={styles.loaderIcon}
          color={theme.colors.text_disabled}
        />
      )}
      <Text
        textAlign="center"
        variant="type_button_l"
        color={disabled ? 'text_disabled' : 'text_onSuturated'}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const useStyles = makeStyles(theme => ({
  container: (isPressed: boolean, disabled: boolean) => ({
    width: '100%',
    height: scale(58),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.m_8,
    backgroundColor: disabled
      ? theme.colors.action_bg_disabled
      : isPressed
        ? theme.colors.action_bg_primary_hover
        : theme.colors.action_bg_primary,
  }),
  loaderIcon: { marginRight: scale(4) },
}));

export default Button;
