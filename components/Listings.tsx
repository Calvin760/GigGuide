import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
          <View style={styles.listing}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
              <Ionicons name='heart-outline' size={24} color={'#000'}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.title}</Text>
            </View>
          </View>
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

  },
  image:{
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
})
export default Listings