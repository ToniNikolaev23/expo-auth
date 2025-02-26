import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Fab = () => {
  return (
    <Link href="/(app)/(authenticated)/new-msg" asChild>
      <TouchableOpacity style={styles.fab}>
        <Ionicons name={"add"} size={24} color="white" />
      </TouchableOpacity>
    </Link>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});
