import { useAuth } from "@/context/AuthContext";
import { deleteMessage, fetchMessage, updateMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Burnt from "burnt";
import { ErrorState } from "@/components/common/ErrorState";

const IconButton = ({
  icon,
  onPress,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.iconButton}
    >
      <Ionicons
        name={icon}
        size={24}
        color={disabled ? "gray" : COLORS.primary}
      />
    </TouchableOpacity>
  );
};

const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: message,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["message", id],
    queryFn: () => fetchMessage(Number(id)),
  });

  useEffect(() => {
    if (message?.data?.content) {
      setEditText(message.data.content);
    }
  }, [message?.data?.content]);

  const updateMutation = useMutation({
    mutationFn: () => updateMessage(Number(id), { content: editText }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["message", id] });
      setIsEditing(false);

      if (!data) {
        Burnt.alert({
          title: "Failed to update message",
          message: "Please try again",
          duration: 3,
          preset: "error",
        });
      } else {
        Burnt.toast({
          title: "Message update successfully",
          duration: 3,
        });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteMessage(Number(id)),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      Burnt.toast({
        title: "Message delete successfully",
        duration: 3,
      });

      router.back();
    },
  });

  if (isLoading) return <ActivityIndicator style={styles.center} />;
  if (isError)
    return <ErrorState onRetry={refetch} message="Failed to load message" />;
  if (!message)
    return <ErrorState onRetry={refetch} message="Message not found" />;

  const isOwner = message?.data?.userId === userId;

  const handleUpdate = () => {
    if (editText.trim() !== message?.data?.content) {
      updateMutation.mutate();
    } else {
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Message #${id}`,
        }}
      />
      {isOwner ? (
        <View style={[styles.ownMessageContainer]}>
          {isEditing ? (
            <>
              <TextInput
                multiline
                value={editText}
                onChangeText={setEditText}
                style={[styles.input]}
              />
              <View style={styles.controls}>
                <IconButton
                  icon="checkmark"
                  onPress={handleUpdate}
                  disabled={updateMutation.isPending}
                />
                <IconButton icon="close" onPress={() => setIsEditing(false)} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.messageText}>{message?.data?.content}</Text>
              <View style={styles.controls}>
                <IconButton icon="pencil" onPress={() => setIsEditing(true)} />
                <IconButton
                  icon="trash"
                  onPress={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                />
              </View>
            </>
          )}
        </View>
      ) : (
        <View style={styles.ownMessageContainer}>
          <Text style={styles.messageText}>{message?.data?.content}</Text>
        </View>
      )}
    </View>
  );
};

export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  iconButton: {
    padding: 8,
  },
  center: {
    alignItems: "center",
  },
  ownMessageContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    justifyContent: "flex-end",
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    borderColor: "#fff",
  },
});
