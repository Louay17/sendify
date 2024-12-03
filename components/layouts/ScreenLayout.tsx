import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, makeStyles } from '@/theme';
import AppHeader from './AppHeader';
import { scale } from '@/utils/responsive';

export default function ScreenLayout({ title, children }: PropsWithChildren<{ title?: string }>) {
  return (
    <SafeAreaView style={styles().container}>
      <Box
        height={scale(56)}
        justifyContent="center"
        backgroundColor="white"
        borderBottomWidth={scale(1)}
        borderBottomColor="border_neutral"
      >
        <AppHeader title={title} rightIcon={<View />} />
      </Box>
      {children}
    </SafeAreaView>
  );
}

const styles = makeStyles(theme => ({
  container: { flex: 1, width: '100%', backgroundColor: theme.colors.bg_main },
}));
