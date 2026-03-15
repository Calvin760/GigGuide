import ScreenWrapper from '@/constants/ScreenWrapper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ExploreHeader = () => {
    const categories = [
        { id: 'dj', title: 'DJs', icon: 'music-note' }, // MaterialIcons
        { id: 'live-music', title: 'Live Music', icon: 'guitar-electric' }, // MaterialCommunityIcons
        { id: 'club', title: 'Clubs', icon: 'nightlife' }, // MaterialCommunityIcons
        { id: 'party', title: 'Parties', icon: 'party-popper' }, // MaterialCommunityIcons
        { id: 'workshop', title: 'Workshops', icon: 'school' }, // MaterialIcons
        { id: 'festival', title: 'Festivals', icon: 'festival' }, // MaterialCommunityIcons
    ];

    // Map icon names to actual icon components
    const IconMap = {
        'music-note': MaterialIcons,
        school: MaterialIcons,
        'guitar-electric': MaterialCommunityIcons,
        nightlife: MaterialCommunityIcons,
        'party-popper': MaterialCommunityIcons,
        festival: MaterialCommunityIcons,
    };
  return (
    <ScreenWrapper>
        <View>
            <View style={styles.container}></View>
        </View>
      </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    container: {

    }
})
export default ExploreHeader