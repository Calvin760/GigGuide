import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

export default function VenueProfile() {
    const { user } = useAuth();
    const router = useRouter();

    const [venueName, setVenueName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        if (!venueName || !location) {
            Alert.alert('Error', 'Fill required fields');
            return;
        }

        const { error } = await supabase.from('venues').insert({
            userId: user.id,
            venue_name: venueName,
            location: location,
            capacity: Number(capacity),
            description: 'description',
        });

        if (error) {
            Alert.alert('Error', error.message);
            return;
        }

        await supabase
            .from('users')
            .update({ onboarding_completed: true })
            .eq('id', user.id);

        router.replace('/(main)/home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Organizer Profile</Text>

            <TextInput
                placeholder="Venue / Organizer Name"
                style={styles.input}
                onChangeText={setVenueName}
            />

            <TextInput
                placeholder="Location"
                style={styles.input}
                onChangeText={setLocation}
            />

            <TextInput
                placeholder="Capacity"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setCapacity}
            />

            <TextInput
                placeholder="Description"
                style={styles.input}
                onChangeText={setDescription}
            />

            <Button title="Create Profile" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },
});