import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Stack } from 'expo-router/stack';

import { theme } from 'theme';
import { CustomToast } from '@/components/ui';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <KeyboardProvider>
          <Stack screenOptions={{ headerShown: false, header: () => null }}>
            <Stack.Screen name="index" initialParams={{ id: 'user_1' }} />
          </Stack>
        </KeyboardProvider>
        <CustomToast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
