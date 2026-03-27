import { theme } from '@/components/theme';
import ScreenWrapper from '@/constants/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
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

  const router = useRouter();
  const { user } = useAuth();

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [genre, setGenre] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  // 📸 Pick Image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🚀 Publish Gig
  const onPublish = async () => {
    if (!title || !budget || !genre || !location) {
      Alert.alert('Missing fields', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Get venue
      const { data: venue, error: venueError } = await supabase
        .from('venues')
        .select('id')
        .eq('userId', user.id)
        .single();

      if (venueError || !venue) {
        throw new Error('You must create a venue first');
      }

      let imageUrl = null;

      // 2️⃣ Upload image
      if (image) {
        const fileName = `${user.id}-${Date.now()}.jpg`;

        const response = await fetch(image);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from('gigs')
          .upload(fileName, blob);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('gigs')
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // 3️⃣ Insert gig
      const { error: insertError } = await supabase.from('gigs').insert({
        venue_id: venue.id,
        title: title,
        description: description,
        genre: genre,
        payment: Number(budget),
        event_date: new Date().toISOString().split('T')[0],
        start_time: '18:00',
        end_time: '23:00',
        // status: 'open',
        // image: imageUrl,
        // location: location,
        // event_type: eventType,
      });

      if (insertError) throw insertError;

      Alert.alert('Success', 'Gig posted!');
      router.back();

    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={26} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Gig</Text>

        <TouchableOpacity onPress={onPublish} disabled={loading}>
          <Text style={styles.publish}>
            {loading ? 'Publishing...' : 'Publish'}
          </Text>
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
            placeholder="Event Title"
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
            placeholder="Genre Needed"
            value={genre}
            onChangeText={setGenre}
            style={styles.input}
          />

          <TextInput
            placeholder="Event Type"
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
            placeholder="Description"
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