import { theme } from '@/components/theme';
import ScreenWrapper from '@/constants/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const MessagesPage = () => {
    const router = useRouter();

    const { hostName } = useLocalSearchParams<{
        hostName: string;
    }>();

    const avatar = 'https://i.pravatar.cc/150?img=12';

    const flatListRef = useRef<FlatList>(null);

    const [messages, setMessages] = useState([
        {
            id: '1',
            text: `Hi ${hostName}, I'm interested in your gig 🔥`,
            sender: 'me',
        },
        {
            id: '2',
            text: 'Nice! Send me your mix 🔥',
            sender: 'them',
        },
    ]);

    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            text: input,
            sender: 'me',
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput('');

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderItem = ({ item }: any) => {
        const isMe = item.sender === 'me';

        return (
            <View
                style={[
                    styles.row,
                    { justifyContent: isMe ? 'flex-end' : 'flex-start' },
                ]}
            >
                {!isMe && (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                )}

                <View
                    style={[
                        styles.messageContainer,
                        isMe ? styles.myMessage : styles.theirMessage,
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            { color: isMe ? '#fff' : '#000' },
                        ]}
                    >
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper bg="white">
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                {/* ✅ Header with Back Button */}
                <View style={styles.header}>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} />
                    </TouchableOpacity>

                    <Image source={{ uri: avatar }} style={styles.headerAvatar} />

                    <View>
                        <Text style={styles.headerTitle}>{hostName}</Text>
                        <Text style={styles.subText}>Active now</Text>
                    </View>
                </View>

                {/* Messages */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        padding: 16,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input */}
                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Message..."
                            value={input}
                            onChangeText={setInput}
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={sendMessage}>
                            <Ionicons
                                name="send"
                                size={22}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

export default MessagesPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    subText: {
        color: '#666',
        fontSize: 12,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 12,
    },

    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 6,
    },

    messageContainer: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 14,
    },

    myMessage: {
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 4,
    },

    theirMessage: {
        backgroundColor: '#eee',
        borderBottomLeftRadius: 4,
    },

    messageText: {
        fontSize: 14,
    },

    inputWrapper: {
        padding: 25,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingVertical: 20,
    },

    input: {
        flex: 1,
        marginRight: 8,
    },
});