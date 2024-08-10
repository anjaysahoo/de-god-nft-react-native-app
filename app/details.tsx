import {View, Platform, Text, StyleSheet, Button} from 'react-native';
import {Link, router, useLocalSearchParams} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NftModel} from "@/models/nft.model";

export default function Details() {
    const nftData = useLocalSearchParams();


    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        console.log("use effect called")
        AsyncStorage.getItem('bookmarkedNFTs').then((data) => {
            console.log("current data : ", data);
            if (data) {
                const bookmarkedNFTs = JSON.parse(data);
                console.log("bookmarkedNFTs data : ", bookmarkedNFTs);
                console.log("nftData : ", nftData);
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
        const updatedData = await AsyncStorage.getItem('bookmarkedNFTs');
        console.log(  "updatedData : ", updatedData)
    };

    // If the page was reloaded or navigated to directly, then the modal should be presented as
    // a full screen page. You may need to change the UI to account for this.
    const isPresented = router.canGoBack();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
            {!isPresented && <Link href="../">Dismiss</Link>}
            {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <Text style={styles.textColor}>{nftData.name}</Text>
            <Button title={isBookmarked ? 'Unbookmark' : 'Bookmark'} onPress={toggleBookmark} />
        </View>
    );
}


const styles = StyleSheet.create({
    textColor: {
        color: 'white',
    }
});
