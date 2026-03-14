import { Link } from 'expo-router';
import { Alert, Button, StyleSheet, Text } from 'react-native';
import ScreenWrapper from '../../constants/ScreenWrapper';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Home = () => {

    const {user, setAuth} = useAuth();
    
    console.log('user', user);
    const onLogOut = async ()=>{
        // setAuth(null);
        const {error} = await supabase.auth.signOut();
        if(error){
            Alert.alert('Sign Out', "Error signing out")
        }
    }
  return (
    <ScreenWrapper>
      <Text>home</Text>
      <Link href={"/(modals)/booking"}>
        Bookings
      </Link>
      <Button title="Logout" onPress={onLogOut} />
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})