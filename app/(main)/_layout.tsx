import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { theme } from '../../components/theme';

const Layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
            fontFamily: theme.typography.title.fontFamily,
        } 
    }}>
        <Tabs.Screen name="home" options={{
            tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => <Ionicons name='home-outline' color={color} size={size} />
        }} />

        <Tabs.Screen name="gigs" options={{
              tabBarLabel: "My Gigs",
              headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name='library-outline' color={color} size={size} />
        }} />

        <Tabs.Screen name="inbox" options={{
            tabBarLabel: "Inbox",
            headerShown: false,
              tabBarIcon: ({ color, size }) => <Feather name='message-square' color={color} size={size} />
        }} />

        {/* <Tabs.Screen name="explore" options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ color, size }) => <Ionicons name='search' color={color} size={size} />
        }} /> */}

        <Tabs.Screen name="profile" options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name='person-circle-outline' color={color} size={size} />
        }} />

    </Tabs>

  );

}

export default Layout