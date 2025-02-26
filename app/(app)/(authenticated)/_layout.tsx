import { COLORS } from "@/utils/colors";
import { Stack } from "expo-router";

const Layout = () => {
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-msg"
        options={{
          presentation: "formSheet",
          title: "New Message",
          sheetAllowedDetents: [0.3, 0.8],
          sheetGrabberVisible: true,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
