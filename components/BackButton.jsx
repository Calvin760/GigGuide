import Octicons from '@expo/vector-icons/Octicons';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from './theme';


const BackButton = ({size=26, router}) => {
  return (
    <Pressable onPress={()=> router.back()} style={styles.button}>
        <Octicons name="chevron-left" strokeWidth={2.5} size={size} color={theme.colors.text} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button:{
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '0,0,0,0.07',
    }
})