import { AntDesign, FontAwesome5, Octicons } from '@expo/vector-icons'
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

const SignUp = () => {

  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onsubmit = async () => {
    setErrorMsg(null);

    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      setErrorMsg("Please fill all the fields");
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
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
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color:theme.colors.text}}>
            Please fill the details to create a new account
          </Text>

          <Input 
            icon={<FontAwesome5 name="user" size={26} strokeWidth={1.6}/>}
            placeholder='Enter your name'
            onChangeText={value=> nameRef.current = value}
            />

          <Input
            icon={<Octicons name="mail" size={26} strokeWidth={1.6} />}
            placeholder='Enter your email'
            onChangeText={value => emailRef.current = value}
          />

          <Input
            icon={<AntDesign name="lock" size={26} strokeWidth={1.6} />}
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
          />

          {errorMsg && (
            <Text style={{ color: "red", marginTop: 8 }}>
              {errorMsg}
            </Text>
          )}
          
          <Text style={styles.forgotPassword}>
            Forgot password?
          </Text>

          {/* SignUp Button */}
          <Button title={'Sign Up'} loading ={loading} onPress={onsubmit} />

        </View>
        {/* Footer */}
        <View style={styles.footer} >
          <Text style={styles.footerText} >
            Already have an account.
          </Text>
          <Pressable onPress={() => router.push('login')}>
            <Text style={[styles.footerText, { color: theme.colors.primary }, {fontWeight: theme.fontWeights.semibold}]} >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
      </ScreenWrapper>
  )
}

export default SignUp

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