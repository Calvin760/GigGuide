import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
const Page = () => {
    const {user, } = useAuth();

    console.log('user', user);
    const onLogOut = async ()=>{

        const {error} = await supabase.auth.signOut();
        if(error){
            Alert.alert('Sign Out', "Error signing out")
        }
    }
    return (

        <View>
            <Text>Profile</Text>
            <Button title="Logout" onPress={onLogOut} />
        </View>
    )
}

export default Page