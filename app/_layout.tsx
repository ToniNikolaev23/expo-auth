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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
