import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { theme } from '../../components/theme';

const Layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
            fontFamily: theme.fontWeights.bold,
        } 
    }}>
        <Tabs.Screen name="home" options={{
            tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => <Ionicons name='home-outline' color={color} size={size} />
        }} />

        <Tabs.Screen name="wishlists" options={{
              tabBarLabel: "Wishlists",
            tabBarIcon: ({ color, size }) => <Ionicons name='heart-outline' color={color} size={size} />
        }} />

        <Tabs.Screen name="inbox" options={{
            tabBarLabel: "Inbox",
              tabBarIcon: ({ color, size }) => <AntDesign name='message' color={color} size={size} />
        }} />

        <Tabs.Screen name="explore" options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ color, size }) => <Ionicons name='search' color={color} size={size} />
        }} />

        <Tabs.Screen name="profile" options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => <Ionicons name='person-circle-outline' color={color} size={size} />
        }} />


    </Tabs>
  )
}

export default Layout