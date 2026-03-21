import { theme } from '@/components/theme';
import ScreenWrapper from '@/constants/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Page = () => {

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [genre, setGenre] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPublish = () => {
    if (!title || !budget || !genre) {
      Alert.alert('Missing fields', 'Please fill all required fields');
      return;
    }

    // 🔥 Later connect to Supabase
    console.log({
      title,
      budget,
      genre,
      eventType,
      description,
      location,
      image,
    });

    Alert.alert('Success', 'Gig posted!');
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="close" size={26} onPress={() => router.back()} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Gig</Text>

        <TouchableOpacity onPress={onPublish}>
          <Text style={styles.publish}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* User Info */}
        <View style={styles.userRow}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Your Profile</Text>
            <Text style={styles.sub}>Posting a gig</Text>
          </View>
        </View>

        {/* Image */}
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="image-outline" size={30} />
              <Text>Add event photo</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>

          <TextInput
            placeholder="Event Title (e.g. Club Night DJ Needed)"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Budget (R)"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Genre Needed (Amapiano, Hip Hop...)"
            value={genre}
            onChangeText={setGenre}
            style={styles.input}
          />

          <TextInput
            placeholder="Event Type (Club, Wedding, Festival)"
            value={eventType}
            onChangeText={setEventType}
            style={styles.input}
          />

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />

          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 100 }]}
            multiline
          />

        </View>

      </ScrollView>
    </ScreenWrapper>
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
    fontSize: 18,
    fontWeight: '600',
  },

  publish: {
    color: theme.colors.primary,
    fontWeight: '600',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },

  name: {
    fontWeight: '600',
  },

  sub: {
    color: '#666',
    fontSize: 12,
  },

  imageBox: {
    height: 180,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

  form: {
    paddingHorizontal: 16,
    gap: 12,
  },

  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 14,
  },

});