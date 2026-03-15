import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const Home = () => {

  return (
    <View style={{flex: 1}} >

    <Stack.Screen options={{
      header: ()=> <ExploreHeader/>
    }}
    />
    <Listings/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})