import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const _layout = ()=>{
  return(
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  )
}
const MainLayout = () => {
  const {setAuth} = useAuth();
  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event, session) =>{
      console.log('session user', session?.user)

      if(session){
        // set auth
        // move to home screen
      }else{
        // set auth null
        // move to welcom screen
      }
    })

    
  })
  return (
    <Stack 

    screenOptions={{headerShown: false}}

    />
  )
}

export default _layout