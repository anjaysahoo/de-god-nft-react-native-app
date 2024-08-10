import { Image, StyleSheet, View} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {fetchNFTs} from "@/api/covalent";
import {NftModel} from "@/models/nft.model";
import RenderItem from "@/components/RenderItem";

export default function HomeScreen() {
    const [nfts, setNFTs] = useState<NftModel[]>([]);


    useEffect(() => {
        fetchNFTs().then(setNFTs);
    }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
            source={{ uri: "https://i.seadn.io/gcs/files/0f98e562496514deec72096435a77eef.jpg?auto=format&dpr=1&w=3840" }}
            style={styles.reactLogo}
        />
      }>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">All NFTs</ThemedText>
        </ThemedView>
      <ThemedView style={styles.titleContainer}>
          <View>
              {nfts.map((item) => (
                  <RenderItem
                      key={item.token_id}
                      item={item}
                  />
              ))}
          </View>
      </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 420,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
