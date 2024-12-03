import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';

import { scale } from '@/utils/responsive';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  terraCotta: '#EB654A',
  coralRose: '#EF846E',
  tangerine: '#F68E21',
  peachCream: '#FEF4E9',
  gray8: '#EFEFEF',
  gray100: '#B4B5B6',
  gray200: '#989FA3',
  gray300: '#818283',
  gray400: '#505253',
  lightSilver: '#E6E6E6',
  emeraldGreen: '#0EAA7E',
  green100: 'rgba(209, 239, 230, 0.38)',
  dark: '#121212',
  white: '#FFFFFF',
  snowWhite: '#F5F5F5',
  black: '#000000',
};

const theme = createTheme({
  colors: {
    primary: palette.terraCotta,

    text_title: palette.dark,
    text_subtitle: palette.gray300,
    text_onSuturated: palette.white,
    text_disabled: palette.gray100,
    text_success: palette.emeraldGreen,

    bg_main: palette.white,
    bg_disabled: palette.snowWhite,
    bg_secondary_subtle: palette.peachCream,

    icon_default: palette.dark,
    icon_option: palette.gray300,
    action_bg_disabled: palette.snowWhite,
    action_bg_primary: palette.terraCotta,
    action_bg_primary_hover: palette.coralRose,

    border_secondary: palette.tangerine,
    border_neutral: palette.lightSilver,

    ...palette,
  },
  spacing: {
    xs_4: scale(4),
    s_8: scale(8),
    sm_12: scale(12),
    m_16: scale(16),
    ml_24: scale(24),
    l_32: scale(32),
    xl_64: scale(64),
  },
  borderRadii: {
    s_4: scale(4),
    m_8: scale(8),
    l_12: scale(12),
    xl_100: scale(100),
  },
  textVariants: {
    type_title_h1: {
      fontSize: scale(32),
      lineHeight: scale(32) * 1.3,
      fontFamily: 'Ubuntu-Bold',
    },
    type_title_h2: {
      fontSize: scale(28),
      lineHeight: scale(28) * 1.3,
      fontFamily: 'Ubuntu-Medium',
    },
    type_title_h3: {
      fontSize: scale(24),
      lineHeight: scale(24) * 1.3,
      fontFamily: 'Ubuntu-Medium',
    },
    type_title_h4: {
      fontSize: scale(20),
      lineHeight: scale(20) * 1.3,
      fontFamily: 'Ubuntu-Medium',
    },
    type_title_h5: {
      fontSize: scale(18),
      lineHeight: scale(18) * 1.3,
      fontFamily: 'Ubuntu-Medium',
    },
    type_general_subtitle1: {
      fontSize: scale(16),
      lineHeight: scale(16) * 1.5,
      fontFamily: 'Ubuntu-Medium',
    },
    type_general_subtitle2: {
      fontSize: scale(14),
      lineHeight: scale(14) * 1.5,
      fontFamily: 'Ubuntu-Medium',
    },
    type_general_body1: {
      fontSize: scale(16),
      lineHeight: scale(16) * 1.5,
      fontFamily: 'Ubuntu-Regular',
    },
    type_general_body2: {
      fontSize: scale(14),
      lineHeight: scale(14) * 1.5,
      fontFamily: 'Ubuntu-Regular',
    },
    type_general_caption1: {
      fontSize: scale(12),
      lineHeight: scale(12) * 1.5,
      fontFamily: 'Ubuntu-Regular',
    },
    type_general_caption2: {
      fontSize: scale(12),
      lineHeight: scale(12) * 1.5,
      fontFamily: 'Ubuntu-Medium',
    },
    type_button_l: {
      fontSize: scale(18),
      lineHeight: scale(18) * 1.45,
      fontFamily: 'Ubuntu-Medium',
    },
    type_button_m: {
      fontSize: scale(16),
      lineHeight: scale(16) * 1.5,
      fontFamily: 'Ubuntu-Medium',
    },
    type_button_link_l: {
      fontSize: scale(18),
      lineHeight: scale(18) * 1.45,
      fontFamily: 'Ubuntu-Medium',
    },
    type_button_link_m: {
      fontSize: scale(16),
      lineHeight: scale(16) * 1.5,
      fontFamily: 'Ubuntu-Medium',
    },
    type_button_link_s: {
      fontSize: scale(14),
      lineHeight: scale(14) * 1.4,
      fontFamily: 'Ubuntu-Medium',
    },
  },
  zIndices: {
    z_1: 1,
    z_2: 2,
    z_10: 10,
    z_99: 99,
    z_full: 999999,
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
