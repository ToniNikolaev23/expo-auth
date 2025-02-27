import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import Fab from "@/components/fab/fab";
import { MessageItem } from "@/components/messages/MessageItem";
import { fetchMessages } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Page = () => {
  const {
    data: messages,
    isLoading,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(),
  });

  if (isError) {
    return <ErrorState message="Failed to fetch messages" onRetry={refetch} />;
  }
  return (
    <View style={styles.container}>
      {isPending ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <FlatList
          data={messages?.data}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={isPending} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <>{!isLoading && <EmptyState message="No messages yet!" />}</>
          }
          contentContainerStyle={styles.list}
        />
      )}

      <Fab />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
});
