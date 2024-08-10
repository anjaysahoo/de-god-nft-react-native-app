import axios from 'axios';
import {NftModel} from "@/models/nft.model";

const API_KEY = 'cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp';
const CONTRACT_ADDRESS = '0x8821bee2ba0df28761afff119d66390d594cd280';

export const fetchNFTs = async (page = 0, pageSize = 10): Promise<NftModel[]> => {
    const response = await axios.get(
        `https://api.covalenthq.com/v1/eth-mainnet/nft/${CONTRACT_ADDRESS}/metadata/`,
        {
            params: {
                'page-size': pageSize,
                'page-number': page,
            },
            auth: {
                username: API_KEY,
                password: '',
            },
        }
    );

    const res: NftModel[] = [];
    for(let i = 0; i < response.data.data.items.length; i++) {
        res.push({
            token_id: response.data.data.items[i].nft_data.token_id,
            current_owner: response.data.data.items[i].nft_data.current_owner,
            name: response.data.data.items[i].nft_data.external_data.name,
            image: response.data.data.items[i].nft_data.external_data.image,
        });
    }

    console.log("res : ",res);

    return res;
};
