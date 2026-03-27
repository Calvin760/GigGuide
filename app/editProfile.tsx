import Button from '@/components/Button';
import { theme } from '@/components/theme';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@/contexts/AuthContext';
import { hp, wp } from '@/helpers/common';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {

    const { user } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        bio: '',
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchUserData = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('name, phoneNumber, bio, image')
                .eq('id', user.id)
                .single();

            if (error) {
                console.log(error);
                return;
            }

            setFormData({
                name: data?.name || '',
                phoneNumber: data?.phoneNumber || '',
                bio: data?.bio || '',
            });

            setProfileImage(data?.image || null);
        };

        fetchUserData();
    }, [user]);

    // ✅ FIXED image picker
    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    // ✅ Convert image → blob (REQUIRED for Supabase)
    const uploadImage = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const fileName = `${user.id}-${Date.now()}`;

        const { data, error } = await supabase.storage
            .from('users')
            .upload(fileName, blob, {
                contentType: 'image/jpeg',
            });

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
            .from('users')
            .getPublicUrl(fileName);

        return publicUrl.publicUrl;
    };

    const handleSaveProfile = async () => {

        if (!formData.name.trim()) {
            Alert.alert('Error', 'Name is required');
            return;
        }

        setLoading(true);

        try {
            let imageUrl = profileImage;

            // upload only if new image
            if (profileImage && profileImage.startsWith('file')) {
                imageUrl = await uploadImage(profileImage);
            }

            const { error } = await supabase
                .from('users')
                .update({
                    name: formData.name,
                    phoneNumber: formData.phoneNumber,
                    bio: formData.bio,
                    image: imageUrl,
                })
                .eq('id', user.id);

            if (error) throw error;

            Alert.alert('Success', 'Profile updated');

            // ✅ FIXED navigation
            router.replace('/(main)/profile');

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: hp(4) }}>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} />
                    </TouchableOpacity>

                    <Text style={styles.header}>Edit Profile</Text>

                    <View style={{ width: 26 }} />
                </View>

                {/* Profile Image */}
                <View style={styles.profileImageContainer}>
                    <Image
                        source={{
                            uri: profileImage || 'https://i.pravatar.cc/150'
                        }}
                        style={styles.profileImage}
                    />

                    <TouchableOpacity
                        style={styles.changeImageButton}
                        onPress={handleImagePick}
                    >
                        <Text style={styles.changeImageButtonText}>
                            Change Picture
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.form}>

                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={hp(3)} color={theme.colors.primary} />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={formData.name}
                            onChangeText={(text) =>
                                setFormData({ ...formData, name: text })
                            }
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="call-outline" size={hp(3)} color={theme.colors.primary} />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChangeText={(text) =>
                                setFormData({ ...formData, phoneNumber: text })
                            }
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={[styles.inputContainer, styles.bioContainer]}>
                        <Ionicons name="text-outline" size={hp(3)} color={theme.colors.primary} />
                        <TextInput
                            style={[styles.input, styles.bioInput]}
                            placeholder="Bio"
                            value={formData.bio}
                            onChangeText={(text) =>
                                setFormData({ ...formData, bio: text })
                            }
                            multiline
                        />
                    </View>

                    <Button
                        title="Save"
                        buttonStyle={styles.button}
                        onPress={handleSaveProfile}
                        loading={loading}
                    />

                    <Button
                        title="Cancel"
                        buttonStyle={[styles.button, { backgroundColor: 'red' }]}
                        onPress={() => router.back()}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: hp(4),
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    changeImageButton: {
        marginTop: hp(1),
        backgroundColor: theme.colors.primary,
        paddingVertical: hp(1),
        paddingHorizontal: wp(4),
        borderRadius: 25,
    },
    changeImageButtonText: {
        color: '#fff',
        fontWeight: '700',
    },
    form: {
        paddingHorizontal: wp(5),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: hp(3),
        paddingHorizontal: wp(4),
        marginBottom: hp(2),
        height: hp(6),
    },
    input: {
        flex: 1,
        marginLeft: wp(2),
    },
    bioContainer: {
        height: hp(14),
    },
    bioInput: {
        height: hp(14),
        textAlignVertical: 'top',
    },
    button: {
        marginTop: hp(1),
    },
});