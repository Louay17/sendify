import { Pressable } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

import { Box, makeStyles, Text } from '@/theme';
import { scale, wp } from '@/utils/responsive';
import { CloseIcon, ErrorIcon } from '../icons';

const toastConfig = {
  customError: ({ text1 }: BaseToastProps) => (
    <Box
      width={wp(87)}
      height={scale(56)}
      borderRadius="m_8"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      flexDirection="row"
      gap="sm_12"
      px="sm_12"
      style={useStyles().container}
    >
      <ErrorIcon />
      <Box flex={1}>
        <Text variant="type_general_subtitle2" textAlign="left" color="text_title">
          {text1}
        </Text>
      </Box>
      <Pressable hitSlop={scale(40)} onPress={() => Toast.hide()}>
        <CloseIcon />
      </Pressable>
    </Box>
  ),
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

const useStyles = makeStyles(theme => ({
  container: {
    elevation: 8,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: scale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: scale(4.65),
  },
}));

export default CustomToast;
