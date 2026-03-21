import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => {
    return (
      <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
        {/* Image */}
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* Heart Icon */}
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => console.log('Heart clicked', item.id)}
        >
          <Ionicons name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Card Content */}
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0.8}
          onPress={() => router.push(`/listing/${item.id}`)}
        >
          {/* Title + Rating */}
          <View style={styles.rowSpace}>
            <Text style={[styles.title, { flexShrink: 1 }]} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.row}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>
                {item.rating?.toFixed(1) ?? '4.5'}
              </Text>
            </View>
          </View>

          {/* Location */}
          <Text style={styles.location}>{item.location}</Text>

          {/* Price */}
          <View style={styles.row}>
            <Text style={styles.price}>R {item.price}</Text>
            <Text>per night</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" style={{ margin: 16 }} />}
      <FlatList
        ref={listRef}
        data={items}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
  heartIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  title: { fontSize: 16, fontFamily: 'inter-sb' },
  rating: { fontFamily: 'inter-sb', marginLeft: 4 },
  location: { fontFamily: 'inter', marginTop: 4 },
  price: { fontFamily: 'inter-sb', marginRight: 4 },
});

export default Listings;