import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RoleSelection() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What are you?</Text>

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/onboarding/musician')}
            >
                <Text style={styles.cardTitle}>🎧 Musician</Text>
                <Text style={styles.cardDesc}>Find gigs and get booked</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/onboarding/venue')}
            >
                <Text style={styles.cardTitle}>🏟️ Event Organizer</Text>
                <Text style={styles.cardDesc}>Post gigs and hire talent</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 30 },
    card: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    cardTitle: { fontSize: 20, fontWeight: '600' },
    cardDesc: { color: '#666', marginTop: 5 },
});