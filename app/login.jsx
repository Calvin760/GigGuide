import { AntDesign, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Input from '../components/Input'
import { theme } from '../components/theme'
import ScreenWrapper from '../constants/ScreenWrapper'
import { hp, wp } from '../helpers/common'
import { supabase } from '../lib/supabase'

const Login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onsubmit = async () => {
    setErrorMsg(null);

    if (!emailRef.current || !passwordRef.current) {
      setErrorMsg("Please fill all the fields");
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    }
  };
  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <BackButton router ={router}/>

        {/* welcome back */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color:theme.colors.text}}>
            Please login to continue
          </Text>

          <Input 
            icon ={ <Octicons name="mail" size={26} strokeWidth={1.6}/>}
            placeholder='Enter your email'
            onChangeText={value=> emailRef.current = value}
            />

          <Input
            icon={<AntDesign name="lock" size={26} strokeWidth={1.6} />}
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
          />
          {errorMsg && (
            <Text style={{ color: 'red', marginTop: 10 }}>
              {errorMsg}
            </Text>
          )}
          <Text style={styles.forgotPassword}>
            Forgot password?
          </Text>

          {/* Login Button */}
          <Button title={'Login'} loading ={loading} onPress={onsubmit} />

        </View>
        {/* Footer */}
        <View style={styles.footer} >
          <Text style={styles.footerText} >
            Don't have an account?
          </Text>
          <Pressable onPress={()=> router.push('SignUp')}>
            <Text style={[styles.footerText, { color: theme.colors.primary }, {fontWeight: theme.fontWeights.semibold}]} >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
      </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText:{
    fontSize: hp(4),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,

  },
  form:{
    gap: 25,
  },
  forgotPassword:{
    textAlign: 'right',
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.text,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText:{
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  }
})