import customAxios from "utils/axiosUtil"

const GetWalkResigster =async (accessToken: string | unknown) => {
    try{
        const res = await customAxios.get('/walk/center', {
            headers:{
                Authorization : `${accessToken}`
            }
        })
        // console.log('신청 받음 산책 정보 획득', res.data.response)
        return res.data.response.walk_times
    } catch(error){
        console.log(error)
    }
}

interface postWalk {
    walk_id : number,
    status_result : string,
}


const PostWalkUpdate =async (params:postWalk, accessToken : string | unknown) => {
    try{
        const res = await customAxios.post('/walk/status', params, 
        {
            headers: {
                Authorization : `${accessToken}`
            }
        })
        if (res.data.success) {
            console.log('산책 수정 완료', res.data);
        } else {
            console.log('산책 수정 실패', res.data.error);
        }
        console.log('산책 수정', res)
    } catch(error){
        console.log(error)
    }
}

export{GetWalkResigster, PostWalkUpdate}