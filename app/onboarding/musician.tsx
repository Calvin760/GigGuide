import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MusicianProfile() {
    const { user } = useAuth();
    const router = useRouter();

    const [stageName, setStageName] = useState('');
    const [genres, setGenres] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');

    const handleSubmit = async () => {
        if (!stageName || !genres) {
            Alert.alert('Error', 'Fill required fields');
            return;
        }

        const { error } = await supabase.from('musician').insert({
            userId: user.id,
            stage_name: stageName,
            genres: genres.split(','),
            price_min: Number(priceMin),
            price_max: Number(priceMax),
        });

        if (error) {
            Alert.alert('Error', error.message);
            return;
        }

        // mark onboarding done
        await supabase
            .from('users')
            .update({ onboarding_completed: true })
            .eq('id', user.id);

        router.replace('/(main)/profile');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Musician Profile</Text>

            <TextInput
                placeholder="Stage Name"
                style={styles.input}
                onChangeText={setStageName}
            />

            <TextInput
                placeholder="Genres (comma separated)"
                style={styles.input}
                onChangeText={setGenres}
            />

            <TextInput
                placeholder="Minimum Price"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setPriceMin}
            />

            <TextInput
                placeholder="Maximum Price"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setPriceMax}
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