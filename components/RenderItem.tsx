import { Image, Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import {NftModel} from "@/models/nft.model";

export default function RenderItem({ item }: { item: NftModel }) {
    return (
            <Link style={styles.card} href={{ pathname: '/details', params: item as any}} >
                <View style={styles.image}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.owner}>{item.current_owner.slice(0, 5) + "..." + item.current_owner.slice(-5)}</Text>
                </View>
            </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f9f4dc',
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
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
