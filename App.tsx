import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ThemeProvider } from '@shopify/restyle';

import { theme } from 'theme';
import { CustomToast } from '@/components/ui';
import HomeScreen from './app/index';

const RootStack = createNativeStackNavigator();

// NOTE: React Navigation v7 is being used here instead of `expo-router`
// due to an issue with extra padding in SafeAreaView, which is included in expo-router.
// For more information on the issue, refer to the following discussions:
// - https://www.reddit.com/r/expo/comments/1fbryqa/comment/lw26wg6/
// - https://stackoverflow.com/questions/76902587/status-bar-safearea-issue-with-expo-react-native
//
// If you prefer to use `expo-router`, you can switch to it by:
// 1. Updating the `main` field in `package.json` to: "main": "expo-router/entry"
// 2. Reloading the app.

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <KeyboardProvider>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{ receiverId: 'user_1' }}
                options={{
                  headerShown: false,
                  statusBarStyle: 'dark',
                  statusBarBackgroundColor: 'white',
                }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </KeyboardProvider>
        <CustomToast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
