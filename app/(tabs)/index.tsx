import {Text, Image, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {fetchNFTs} from "@/api/covalent";
import {Link} from "expo-router";
import {NftModel} from "@/models/nft.model";

export default function HomeScreen() {
    const [nfts, setNFTs] = useState<NftModel[]>([]);


    useEffect(() => {
        fetchNFTs().then(setNFTs);
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <Link href={{ pathname: '/modal', params: item }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <Text>{item.name}</Text>
                <Text>{item.current_owner.slice(0,5) + "..." + item.current_owner.slice(-5)}</Text>
            </Link>
        </TouchableOpacity>
    );

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
              <FlatList
                  data={nfts}
                  keyExtractor={(item) => item.token_id.toString()}
                  renderItem={renderItem}
              />
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
