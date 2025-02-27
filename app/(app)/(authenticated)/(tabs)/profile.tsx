import { useAuth } from "@/context/AuthContext";
import { getUserInfo, uploadImage } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

let API_URL = process.env.EXPO_PUBLIC_API_URL;

const Page = () => {
  const { onLogout, token } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadImageMutation.mutate({
        uri: result.assets[0].uri,
        token: token || "",
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage}>
        {user?.data?.avatar ? (
          <>
            <Image
              source={{ uri: `${API_URL}${user?.data?.avatar}` }}
              style={styles.avatar}
            />
          </>
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>
              {user?.data?.name?.charAt(0).toUpperCase() || "?"}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user?.data?.name || "No name"}</Text>
        <Text style={styles.email}>{user?.data?.email || "No email"}</Text>
      </View>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    fontSize: 50,
    color: "#fff",
  },
});
