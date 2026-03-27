import { theme } from '@/components/theme';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

const Page = () => {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [djName, setDjName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            setUser(user);
            setEmail(user.email);

            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setDjName(data.name);
                // setFirstName(data.name);
                // setLastName(data.last_name);
                setAvatar(data.avatar_url);
            }
        }
    };

    const onLogOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            Alert.alert('Error', 'Could not sign out');
        }
    };

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>

                <TouchableOpacity onPress={() => router.push('/editProfile')}>
                    <Ionicons name="create-outline" size={26} />
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Image
                    source={{
                        uri: avatar || 'https://i.pravatar.cc/150?img=3'
                    }}
                    style={styles.avatar}
                />

                <Text style={{ fontSize: 22, fontWeight: '600' }}>
                    {djName || 'Your Stage Name'}
                </Text>

                <Text>{firstName} {lastName}</Text>
                <Text>{email}</Text>
            </View>

            <Button title="Log Out" onPress={onLogOut} color={theme.colors.dark} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        alignItems: 'center',
        gap: 14,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.textGrey,
    },
});

export default Page;