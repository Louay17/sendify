import Toast, { BaseToastProps } from 'react-native-toast-message';
import { Box, Text } from '@/theme';
import { scale, wp } from '@/utils/responsive';
import { Pressable, StyleSheet } from 'react-native';
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
      style={styles.container}
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

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: scale(4.65),

    elevation: 8,
  },
});

export default CustomToast;
