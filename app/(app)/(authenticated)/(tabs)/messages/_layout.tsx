import { COLORS } from "@/utils/colors";
import { Stack } from "expo-router";
import { View } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Messages" }} />
      <Stack.Screen name="[id]" options={{ title: "" }} />
    </Stack>
  );
};

export default Layout;
