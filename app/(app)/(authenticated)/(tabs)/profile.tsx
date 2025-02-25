import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

const Page = () => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default Page;
