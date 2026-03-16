import listingsData from '@/assets/data/test_listings.json';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
const Home = () => {

  const [category, setCategory] = useState('Clubbing')
  const items  = useMemo(() => listingsData as any, [])
  const OnDataChanged = (category:string) =>{
    
    setCategory(category);
  }
  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      {/* Replace the default stack header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={OnDataChanged} />, // custom header
        }}
      />

      {/* Main content below */}
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});