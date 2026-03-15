import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Listings = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
        <View style={styles.container}></View>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff'
    }
})

export default Listings

