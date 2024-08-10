import {Image, Text, TouchableOpacity} from "react-native";
import {Link} from "expo-router";

export default function RenderItem({ item }){
    return(
        <TouchableOpacity>
            <Link href={{ pathname: '/details', params: item }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <Text>{item.name}</Text>
                <Text>{item.current_owner.slice(0,5) + "..." + item.current_owner.slice(-5)}</Text>
            </Link>
        </TouchableOpacity>
    );
}
