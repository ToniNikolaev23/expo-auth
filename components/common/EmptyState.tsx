import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="mail-outline" size={48} color="#666" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
});
