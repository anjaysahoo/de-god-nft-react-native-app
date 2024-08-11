import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { fetchNFTs } from '@/api/covalent';
import { NftModel } from '@/models/nft.model';
import RenderItem from '@/components/RenderItem';

export default function HomeScreen() {
    const [nfts, setNFTs] = useState<NftModel[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isEndReached, setIsEndReached] = useState(false);

    useEffect(() => {
        loadNFTs();
    }, []);

    const loadNFTs = async () => {
        if (loading || isEndReached) return;

        setLoading(true);
        console.log("load newNFTs : ")
        const newNFTs = await fetchNFTs(page);
        console.log("newNFTs : ", newNFTs)

        if (newNFTs.length > 0) {
            setNFTs(prevNFTs => [...prevNFTs, ...newNFTs]);
            setPage(prevPage => prevPage + 1);
        } else {
            setIsEndReached(true);
        }

        setLoading(false);
    };

    const handleScroll = async (event: { nativeEvent: { layoutMeasurement: any; contentOffset: any; contentSize: any; }; }) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
            console.log("End reached")
            await loadNFTs()
        }
    };

    return (
        <ParallaxScrollView
            onScroll={handleScroll}
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={{ uri: "https://i.seadn.io/gcs/files/0f98e562496514deec72096435a77eef.jpg?auto=format&dpr=1&w=3840" }}
                    style={styles.reactLogo}
                />
            }>
            <View>
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
                {loading && <ActivityIndicator style={styles.loadingIndicator} />}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reactLogo: {
        height: 250,
        width: 420,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    loadingIndicator: {
        marginVertical: 16,
    },
});
