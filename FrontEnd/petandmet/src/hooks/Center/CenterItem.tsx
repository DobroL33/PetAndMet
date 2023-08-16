import axios from "axios"

interface item{
    center_uuid : string | unknown,
    item_name : string | null,
    item_url : string | null,
    item_target_price : number | null
}
const ItemEnroll = (params: item, accessToken : string| unknown, domain : string) => {
        try{
            axios.post(`${domain}/center/item`, params,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
            ).then((res) =>{
                console.log('등록 완료', res)
            })
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
const ItemUpdate = (params: itemData, accessToken : string| unknown, domain : string) => {
    console.log(params)
    console.log(accessToken)
    console.log(domain)
    try{
        axios.patch(`${domain}/center/item`, params,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        ).then((res) =>{
            console.log('물품 수정 완료', res)
        })
    }catch(error){
        console.log(error)
    }
}

const ItemDelete = (params: number, accessToken : string| unknown, domain : string) => {
    console.log(params)
    console.log(accessToken)
    console.log(domain)
    try{
        axios.delete(`${domain}/center/item/${params}`,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        ).then((res) =>{
            console.log('물품 삭제 완료', res)
        })
    }catch(error){
        console.log(error)
    }
}
export { ItemEnroll, ItemUpdate, ItemDelete }

    