import Fab from "@/components/fab/fab";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
      <Fab />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
