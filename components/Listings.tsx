import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props{

  listings: any[];
  category: string
} 
const Listings = ({ listings: items, category}: Props) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<FlatList>(null)
  useEffect(()=>{
    console.log("reload listings", items.length)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200);

  },[category])

  const renderRow: ListRenderItem<any> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>

          <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
              <Ionicons name='heart-outline' size={24} color={'#000'}/>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 16, fontFamily:'inter-sb'}}>{item.title}</Text>
              <View style={{ flexDirection: 'row', gap:4 }}>
                <Ionicons name='star' size={16}/>
                <Text style={{fontFamily: 'inter-sb'}}>{(Math.random() * 4 + 1).toFixed(1)}</Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'inter' }}>{item.location}</Text>

            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'inter-sb' }}>R {item.price}</Text>
              <Text style={{ fontFamily: 'inter' }}>per night</Text>
            </View>

          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <View >
      <FlatList
      renderItem={renderRow}
      ref={listRef}
       data={loading ? [] : items}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing:{
    padding: 16,
    gap: 10,
    marginVertical: 16,

  },
  image:{
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
})
export default Listings