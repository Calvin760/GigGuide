import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import { theme } from '../components/theme'
import ScreenWrapper from '../constants/ScreenWrapper'
import { hp, wp } from '../helpers/common'

const Welcome = () => {
    const router = useRouter();
  return (
    <ScreenWrapper bg ='white' >
        <StatusBar style='dark'/>
        <View style={styles.container}>

            {/* welcome Image*/}
            <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/GigGuide.png')}/>

            {/* title */}
            <View style={{ marginTop: -hp(20), gap: 12 }}>
                  <Text style={styles.title}>GigGuide</Text>
                  <Text style={styles.punchline}>
                      Discover New Opportunities, Book Events, and Manage Your DJ Gigs Seamlessly.
                  </Text>
            </View>
            {/* footer */}
            <View style={styles.footer}>
                <Button 

                    title='Getting Started'
                    buttonStyle={{marginHorizontal: wp(3)}}
                    onPress={()=> router.push('SignUp')}

                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>
                            Already have an account!
                        </Text>
                      <Pressable onPress={() => router.push('login')}>
                            <Text style={[styles.loginText, {color: theme.colors.primary}]}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
            </View>
        </View>

      </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center',
        marginTop: hp(15)
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.typography.title,
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: theme.colors.text,
    },
    footer:{
        gap: 30,
        width: '100%'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText:{
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    }
})