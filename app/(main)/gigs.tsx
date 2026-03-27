import { theme } from '@/components/theme';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

const Page = () => {

  const router = useRouter();
  const [gigs, setGigs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMyGigs();
  }, []);

  const getMyGigs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setUser(user);

    // Get venue
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('id')
      .eq('userId', user.id)
      .single();

    if (venueError || !venue) {
      console.log('No venue found');
      return;
    }

    // Get gigs
    const { data: gigs, error } = await supabase
      .from('gigs')
      .select('*')
      .eq('venue_id', venue.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setGigs(gigs);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      // onPress={() => router.push(`/gig/${item.id}`)} // 🔥 future detail page
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} />
      </View>

      <Text style={styles.sub}>🎧 {item.genre}</Text>
      <Text style={styles.sub}>📍 {item.location}</Text>
      <Text style={styles.price}>R{item.budget}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={defaultStyles.container}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Gigs</Text>

        <TouchableOpacity onPress={() => router.push('/create-gig')}>
          <Ionicons name="add-circle-outline" size={28} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* List */}
      {gigs.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="musical-notes-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No gigs yet</Text>

          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => router.push('/create-gig')}
          >
            <Text style={{ color: '#fff' }}>Create your first gig</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={gigs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
      )}

    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  sub: {
    color: '#666',
    fontSize: 13,
  },

  price: {
    marginTop: 8,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  emptyText: {
    color: '#999',
  },

  createBtn: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

});