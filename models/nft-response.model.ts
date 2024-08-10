export interface nftResponseModel {
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    is_spam: boolean;
    type: string;
    nft_data: {
        token_id: string;
        token_balance: number | null;
        token_url: string;
        original_owner: string;
        current_owner: string;
        external_data: {
            name: string;
            description: string;
            asset_url: string;
            asset_file_extension: string;
            asset_mime_type: string;
            asset_size_bytes: string;
            image: string;
            image_256: string;
            image_512: string;
            image_1024: string;
            animation_url: string | null;
            external_url:string;
            attributes: [
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value:string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                },
                {
                    trait_type: string;
                    value: string;
                }
            ],
            thumbnails: {
                image_256: string;
                image_512: string;
                image_1024: string;
                image_opengraph_url: string;
                thumbhash:string;
            },
            image_preview: string;
            asset_properties: {
                asset_width: number;
                asset_height: number;
                dominant_color: string;
            }
        },
        asset_cached: boolean;
        image_cached: boolean;
    }
}
