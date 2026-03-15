import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Replace the default stack header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />, // your custom header
        }}
      />

      {/* Main content below */}
      <Listings />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});