import ScreenWrapper from '@/constants/ScreenWrapper';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

const categories = [
    { name: "Clubbing", icon: "speaker", type: "MaterialIcons" },
    { name: "Wedding", icon: "saxophone", type: "MaterialCommunityIcons" },
    { name: "Birthday", icon: "cake", type: "MaterialIcons" },
    { name: "Corporate", icon: "business-center", type: "MaterialIcons" },
    { name: "Festival", icon: "speaker", type: "MaterialIcons" },
];

interface Props {
    onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const selectCategory = (index: number) => {
        setActiveIndex(index);

        onCategoryChanged?.(categories[index].name);

        // Auto-scroll to active category
        itemsRef.current[index]?.measureLayout?.(
            scrollRef.current as any,
            (x, y, width) => {
                scrollRef.current?.scrollTo({ x: x - 16, animated: true });
            }
        );
    };

    const getIconComponent = (type: string) => {
        switch (type) {
            case "MaterialIcons": return MaterialIcons;
            case "MaterialCommunityIcons": return MaterialCommunityIcons;
            default: return FontAwesome6;
        }
    };

    return (
        <ScreenWrapper bg="#fff">
            <View>
                <View style={styles.container}>
                    {/* Search + Filter */}
                    <View style={styles.actionRow}>
                        <Link href={'/(modals)/booking'} asChild>
                            <TouchableOpacity style={styles.searchBtn}>
                                <Ionicons name='search' size={24} style={{ marginRight: 10 }} />
                                <View>
                                    <Text style={theme.typography.subtitle}>Next show</Text>
                                    <Text style={[theme.typography.body, { color: theme.colors.textGrey }]}>
                                        upcoming events · near you
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Link>

                        <TouchableOpacity
                            style={styles.filterBtn}
                            onPress={() => router.push('/create-gig')}
                        >
                            <Ionicons name="add-outline" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Horizontal Categories */}
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 16 }}
                    >
                        {categories.map((item, index) => {
                            const IconComponent = getIconComponent(item.type);
                            const isActive = index === activeIndex;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    ref={(el) => (itemsRef.current[index] = el)}
                                    onPress={() => selectCategory(index)}
                                    style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
                                >
                                    <IconComponent
                                        size={24}
                                        name={item.icon as any}
                                        style={{ transform: [{ scale: isActive ? 1.2 : 1 }] }}
                                    />
                                    <Text style={isActive ? styles.categoryTextActive : styles.categoryText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff", height: 130 },
    actionRow: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 24,
    },
    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.colors.textGrey,
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 14,
        borderRadius: 30,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 1, height: 1 },
        marginRight: 12, // <-- add spacing here
    },
    categoryBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 12,
        marginRight: 16,
    },
    categoryBtnActive: {
        borderBottomColor: '#000',
        borderBottomWidth: 3,
        paddingBottom: 4,
    },
    categoryText: {
        fontSize: 12,
        fontFamily: 'Inter-sb',
        color: theme.colors.textGrey,
    },
    categoryTextActive: {
        fontSize: 12,
        fontFamily: 'Inter-sb',
        color: theme.colors.text,
    },
});

export default ExploreHeader;