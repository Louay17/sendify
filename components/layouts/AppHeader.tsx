import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Box, Text } from '@/theme';
import { scale } from '@/utils/responsive';
import { ChevronLeftIcon } from '../icons';

const AppHeader = ({ title, rightIcon }: { title?: string; rightIcon?: JSX.Element }) => {
  return (
    <Box flexDirection="row" alignItems="center" px="m_16" justifyContent="space-between">
      <Pressable hitSlop={scale(42)}>
        <ChevronLeftIcon />
      </Pressable>
      <Text variant="type_general_subtitle1" color="dark">
        {title}
      </Text>
      {rightIcon}
    </Box>
  );
};

export default AppHeader;
