import { AntDesign, FontAwesome5, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Input from '../components/Input'
import { theme } from '../components/theme'
import ScreenWrapper from '../constants/ScreenWrapper'
import { hp, wp } from '../helpers/common'

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const onsubmit = async ()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('SignUp', "Please fill all the fields!");
      return
    }
  }
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
            onChangeText={value=> emailRef.current = value}
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