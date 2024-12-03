import { useEffect } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Stack } from 'expo-router/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from 'theme';
import { CustomToast } from '@/components/ui';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    'Ubuntu-Bold': require('@/assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-Medium': require('@/assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Regular': require('@/assets/fonts/Ubuntu-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen
            name="index"
            initialParams={{ receiverId: 'user_1' }}
            options={{
              headerShown: false,
              statusBarStyle: 'dark',
              statusBarTranslucent: true,
              statusBarBackgroundColor: 'white',
            }}
          />
        </Stack>
        <CustomToast />
      </KeyboardProvider>
    </ThemeProvider>
  );
}
