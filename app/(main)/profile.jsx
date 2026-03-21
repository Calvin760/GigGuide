import { theme } from '@/components/theme';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { supabase } from '../../lib/supabase';

const Page = () => {

    const [user, setUser] = useState(null);
    const [djName, setDjName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            setUser(user);
            setEmail(user.email);

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setDjName(data.dj_name);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setAvatar(data.avatar_url);
            }
        }
    };

    const onSaveUser = async () => {

        try {

            const { error } = await supabase
                .from('profiles')
                .update({
                    dj_name: djName,
                    first_name: firstName,
                    last_name: lastName,
                })
                .eq('id', user.id);

            if (error) throw error;

            Alert.alert('Success', 'Profile updated');

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Could not update profile');
        }

        setEdit(false);

    };

    const onCaptureImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {

            const image = result.assets[0];

            setAvatar(image.uri);

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
                <Text style={styles.header}>DJ Profile</Text>
                <Ionicons name="notifications-outline" size={26} />
            </View>

            <View style={styles.card}>

                <TouchableOpacity onPress={onCaptureImage}>

                    <Image
                        source={{
                            uri: avatar || 'https://i.pravatar.cc/150?img=3'
                        }}
                        style={styles.avatar}
                    />

                </TouchableOpacity>

                {!edit && (

                    <View style={styles.editRow}>

                        <Text style={{ fontSize: 22, fontWeight: '600' }}>
                            {djName || 'Your DJ Name'} </Text>

                        <TouchableOpacity onPress={() => setEdit(true)}> <Ionicons name="create-outline" size={24} color={theme.colors.dark} /> </TouchableOpacity>

                    </View>

                )}

                {edit && (

                    <>

                        <TextInput
                            placeholder="DJ Name"
                            value={djName}
                            onChangeText={setDjName}
                            style={defaultStyles.inputField}
                        />

                        <TextInput
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={defaultStyles.inputField}
                        />

                        <TextInput
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                            style={defaultStyles.inputField}
                        />

                        <TouchableOpacity onPress={onSaveUser}>
                            <Ionicons name="checkmark-outline" size={28} color={theme.colors.dark} />
                        </TouchableOpacity>

                    </>

                )}

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

    editRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

});

export default Page;
