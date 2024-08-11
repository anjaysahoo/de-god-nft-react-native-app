import {StyleSheet, Image} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NftModel} from "@/models/nft.model";
import { useFocusEffect } from '@react-navigation/native';
import RenderItem from "@/components/RenderItem";

export default function Bookmarked() {
    const [bookmarkedNFTs, setBookmarkedNFTs] = useState<NftModel[]>([]);

    useFocusEffect(
        useCallback(() => {
            // Fetch the bookmarked NFTs when the screen is focused
            AsyncStorage.getItem('bookmarkedNFTs').then((data) => {
                if (data) {
                    setBookmarkedNFTs(JSON.parse(data));
                }
            });
        }, [])
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Image
                    source={{ uri: "https://i.seadn.io/gcs/files/0f98e562496514deec72096435a77eef.jpg?auto=format&dpr=1&w=3840" }}
                    style={styles.deGodLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Bookmarked NFTs</ThemedText>
            </ThemedView>
            <ThemedView style={styles.cardContainer}>
                    {bookmarkedNFTs.map((item) => (
                        <RenderItem
                            key={item.token_id}
                            item={item}
                        />
                    ))}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    deGodLogo: {
        height: 250,
        width: 420,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardContainer: {
        flex: 1,
        gap: 15,
    },
    loadingIndicator: {
        marginVertical: 16,
    },
});
