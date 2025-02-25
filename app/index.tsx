import { COLORS } from "@/utils/colors";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter, Link } from "expo-router";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "a@a.com",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Image
          source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
          style={styles.image}
        />
        <Text style={styles.header}>Galaxies</Text>
        <Text style={styles.subHeader}>The app to be.</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="john@doe.com"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={COLORS.placeholder}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!!errors.email || !!errors.password}
          style={[
            styles.button,
            !errors.email && !errors.password ? {} : styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Register</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/privacy" asChild>
          <TouchableOpacity style={{ alignItems: "center", paddingTop: 4 }}>
            <Text style={styles.outlineButtonText}>Privacy</Text>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
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
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#fff",
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 4,
    height: 50,
    color: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    zIndex: 1000,
  },
});
