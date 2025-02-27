import { AuthProvider } from "@/context/AuthContext";
import {
  Inter_400Regular,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Slot } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});
const RootLayout = () => {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
