import {StyleSheet, Image, View, Text, TouchableOpacity, FlatList} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NftModel} from "@/models/nft.model";

export default function TabTwoScreen() {
  const [bookmarkedNFTs, setBookmarkedNFTs] = useState<NftModel[]>([]);
    console.log("bookmarked tab called")

    useEffect(() => {
        AsyncStorage.getItem('bookmarkedNFTs').then((data) => {
            console.log("bookmarked data : ", data)
            if (data) {
                setBookmarkedNFTs(JSON.parse(data));
            }
        });
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
        >
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Text>{item.current_owner.slice(0,5) + "..." + item.current_owner.slice(-5)}</Text>
        </TouchableOpacity>
    );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
          <Image
              source={{ uri: "https://i.seadn.io/gcs/files/0f98e562496514deec72096435a77eef.jpg?auto=format&dpr=1&w=3840" }}
              style={styles.reactLogo}
          />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bookmarked NFTs</ThemedText>
      </ThemedView>
        <ThemedView style={styles.titleContainer}>
            <View>
                <FlatList
                    data={bookmarkedNFTs}
                    keyExtractor={(item) => item.token_id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
    reactLogo: {
        height: 250,
        width: 420,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
