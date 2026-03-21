import listingsData from '@/assets/data/test_listings.json';
import { theme } from '@/components/theme';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Dimensions, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("Id", id)
  const router = useRouter();
  const listing = (listingsData as any[]).find((item) => item.id === Number(id));

  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  if (!listing) {
    return (
      <View style={styles.container}>
        <Text>Gig not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={scrollRef}
          scrollEventThrottle={16}>

          <Animated.Image
            source={{ uri: listing.image }}
            style={[styles.image, imageAnimatedStyle]}
            resizeMode="cover"
          />

          <View style={styles.infoContainer}>
            <Text style={styles.name}>{listing.name}</Text>

            <Text style={styles.location}>
              {listing.venue_type} in {listing.location}
            </Text>

            <Text style={styles.rooms}>
              {listing.capacity} capacity · {listing.genre} · {listing.duration} hours ·{' '}
              {listing.sets_required} DJ sets
            </Text>

            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={styles.ratings}>
                {listing.rating?.toFixed(1) ?? '4.5'} · {listing.rating_count} event ratings
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.hostView}>
              <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

              <View>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                  Event by {listing.host_name}
                </Text>
                <Text>Organizer since 2024</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.description}>{listing.description}</Text>
          </View>
        </Animated.ScrollView>

        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <TouchableOpacity style={styles.footerText}>
              <Text style={styles.footerPrice}>R{listing.price}</Text>
              <Text>DJ payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]} onPress={() =>
              router.push({
                pathname: '/messages',
                params: {
                  listingId: listing.id,
                  hostName: listing.host_name,
                }
              })
            }>
              <Text style={defaultStyles.btnText}>Apply for Gig</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'inter-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'inter-sb',
  },
  rooms: {
    fontSize: 16,
    color: '#9CA3AF',
    marginVertical: 4,
    fontFamily: 'inter',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'inter-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.textGrey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: theme.colors.textGrey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'inter-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.textGrey,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'inter',
  },
});

export default Page;