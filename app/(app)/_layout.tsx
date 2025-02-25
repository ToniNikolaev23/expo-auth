import { AuthProvider, useAuth } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { token, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;
    const inAuthGroup = segments[1] === "(authenticated)";

    if (token && !inAuthGroup) {
      router.replace("/(app)/(authenticated)/(tabs)/messages");
    } else if (!token && inAuthGroup) {
      router.replace("/");
    }
  }, [initialized, token]);
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="privacy"
        options={{ title: "Privacy Policy", presentation: "modal" }}
      />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
          headerBackTitle: "Login",
        }}
      />
    </Stack>
  );
}
