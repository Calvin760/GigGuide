import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ModalHeaderText from '../components/ModalHeaderText';
import { theme } from '../components/theme';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getUserData } from '../services/userService';

const _layout = () => {

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "inter": require("../assets/fonts/Inter-Regular.ttf"),
    "inter-md": require("../assets/fonts/Inter-Medium.ttf"),
    "inter-sb": require("../assets/fonts/Inter-SemiBold.ttf"),
    "inter-b": require("../assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) return null; // wait until fonts are loaded

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace('/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);
    if (res.success) setUserData(res.data);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTransparent: true,
          headerTitle: (props) => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: '#fff',
                borderColor: theme.colors.textGrey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}>
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={'#1D4ED8'}/>
            </TouchableOpacity>
          ),
        }}
      />
      
    
    </Stack>
    </GestureHandlerRootView>
  );
};

export default _layout;