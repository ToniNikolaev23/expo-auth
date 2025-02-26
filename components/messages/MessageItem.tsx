import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Message } from "@/utils/api";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";
import { COLORS } from "@/utils/colors";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const colorScheme = useColorScheme();

  return (
    <Link
      href={`/`}
      asChild
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === "dark" ? COLORS.backgroundDark : "#fff",
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: colorScheme === "dark" ? "#fff" : COLORS.background },
              ]}
              numberOfLines={1}
            >
              {message.content}
            </Text>
            <Text style={styles.time}>
              {formatDistanceToNow(new Date(message.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
    fontFamily: "Inter_400Regular",
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
});
