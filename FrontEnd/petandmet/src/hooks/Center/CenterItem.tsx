import customAxios from 'utils/axiosUtil'

interface item{
    center_uuid : string | unknown,
    item_name : string | null,
    item_url : string | null,
    item_target_price : number | null
}
const ItemEnroll = async (params: item, accessToken : string| unknown) => {
        try{
            const response = await customAxios.post(`/center/item`, params,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
            )
            return response.data
        }catch(error){
            console.log(error)
        }
    }

interface itemData{
    center_item_id : number,
    center_uuid : string | unknown,
    item_name : string | null,
    item_url : string | null,
    item_target_price : number | null
}
const ItemUpdate =async (params: itemData, accessToken : string| unknown) => {
    
    try{
        const response =  await customAxios.patch(`/center/item`, params,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        )
        console.log(response)
        return response.data
    }catch(error){
        console.log(error)
    }
}

const ItemDelete = async (params: number, accessToken : string| unknown) => {

    try{
        const response = await customAxios.delete(`/center/item/${params}`,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        )
        console.log('물품 삭제 완료', response)
    }catch(error){
        console.log(error)
    }
}
export { ItemEnroll, ItemUpdate, ItemDelete }

    