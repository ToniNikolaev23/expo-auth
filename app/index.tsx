import { COLORS } from "@/utils/colors";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/register" asChild>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  outlineButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
