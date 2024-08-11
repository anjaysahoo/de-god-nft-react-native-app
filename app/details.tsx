import {View, Text, StyleSheet, Image } from 'react-native';
import {Link, router, useLocalSearchParams} from 'expo-router';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NftModel} from "@/models/nft.model";
import Button from "@/components/Button";

export default function Details() {
    const nftData = useLocalSearchParams();

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('bookmarkedNFTs').then((data) => {
            if (data) {
                const bookmarkedNFTs = JSON.parse(data);
                setIsBookmarked(bookmarkedNFTs.some((element: NftModel) => element.token_id.toString() === nftData.token_id.toString()));
            }
        });
    }, [nftData]);

    const toggleBookmark = async () => {
        const data = await AsyncStorage.getItem('bookmarkedNFTs');
        let bookmarkedNFTs = data ? JSON.parse(data) : [];

        if (isBookmarked) {
            bookmarkedNFTs = bookmarkedNFTs.filter((element: NftModel) => element.token_id.toString() !== nftData.token_id.toString());
        } else {
            bookmarkedNFTs.push(nftData);
        }

        await AsyncStorage.setItem('bookmarkedNFTs', JSON.stringify(bookmarkedNFTs));
        setIsBookmarked(!isBookmarked);
    };

    // If the page was reloaded or navigated to directly, then the modal should be presented as
    // a full screen page. You may need to change the UI to account for this.
    const isPresented = router.canGoBack();
    return (
        <View style={styles.container}>
            {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
            {!isPresented && <Link href="../">Dismiss</Link>}
            <View style={styles.image}>
                <Image source={{ uri: nftData.image }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{nftData.name}</Text>
                <Text style={styles.owner}>{nftData.current_owner}</Text>
            </View>
            <Button
                title={isBookmarked ? 'Unbookmark' : 'Bookmark'}
                onPress={toggleBookmark}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    image: {
        width: 350,
        height: 350,
        borderRadius: 15,
        elevation: 25,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f8c7a3',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    owner: {
        color: '#888',
        marginTop: 4,
    },
});
