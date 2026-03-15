import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getUserData } from '../services/userService'

const _layout = ()=>{
  return(
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  )
}
const MainLayout = () => {
  const {setAuth, setUserData} = useAuth();
  const router = useRouter()
  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event, session) =>{
      console.log('session user', session?.user?.id)

      if(session){
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace('/home');
        // move to home screen
      }else{
        setAuth(null);
        router.replace('/welcome')
      }
    })
  },[]);

  const updateUserData = async (user)=>{
      let res = await getUserData(user?.id);
      if(res.success) setUserData(res.data);
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="listing/[id]" options={{headerTitle: ''}}/>
    </Stack>
  );
}

export default _layout