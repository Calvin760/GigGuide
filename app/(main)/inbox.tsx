import ScreenWrapper from '@/constants/ScreenWrapper';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Page = () => {
  const router = useRouter();

  // 🔥 Mock data (replace with Supabase later)
  const conversations = [
    {
      id: '1',
      name: 'Club Paradise',
      lastMessage: 'Send me your mix 🔥',
      time: '2m ago',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: '2',
      name: 'DJ Vibe',
      lastMessage: 'What’s your rate?',
      time: '1h ago',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    {
      id: '3',
      name: 'Sunset Festival',
      lastMessage: 'You available this weekend?',
      time: 'Yesterday',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
  ];

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          router.push({
            pathname: '/messages',
            params: {
              hostName: item.name,
            },
          })
        }
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />

        <View style={styles.textContainer}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>

          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Text style={styles.title}>Inbox</Text>

        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // marginVertical: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  time: {
    fontSize: 12,
    color: '#888',
  },

  message: {
    fontSize: 14,
    color: '#666',
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 70,
  },
});