import customAxios from "utils/axiosUtil";

interface AnimalData{
    name: string| null,
    age: number| null,
    specie: string| null,
    breed: string| null,
    gender: string| null,
    character: string| null,
    find_place: string| null,
    center_uuid: string,
    enter_date: string| null,
    adoption_status: string| null,
    enter_age: number| null,
    notice_date: string| null,
    adoption_start_date: string| null,
    photo_url: string| null
  }
  //동물 1마리 상세정보
  const GetAnimal = async (params: string | undefined, accessToken: string | unknown) => {
    try {
      const res = await customAxios.get(`/animal/detail?uuid=${params}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
  
      console.log('동물 정보 획득 완료', res.data.response);
      return res.data.response as AnimalData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  interface EnrollData {
    request: {
        name:string| null,
        age: number| null,
        specie: string| null,
        breed:string| null,
        gender:string| null,
        character:string| null,
        find_place:string| null,
        center_uuid:string| null,
        enter_date:string| null,
        adoption_status:string| null,
        enter_age: number| null,
        notice_date:string| null,
        adoption_start_date:string| null,
      },
      image: File | undefined,
    };

  const EnrollAnimal = async (params: EnrollData, accessToken : string| unknown) => {
    try{
        const formData = new FormData()
        formData.append('image', params.image || '')
        formData.append('request', new Blob([JSON.stringify(params.request)], {
            type: "application/json"
        }))
        const res = await customAxios.post('/animal', formData, {
            headers: {
                Authorization: `${accessToken}` ,
            }}
        )
        return res.data
    }catch(error){
        console.log(error)
        }
    }

  interface UpdateAnimalData{
    uuid: string | null,
    name: string | null,
    age: number | null,
    specie: string | null,
    breed: string | null,
    gender: string,
    character: string,
    find_place: string | null,
    center_uuid: string | unknown,
    enter_date: string | null,
    adoption_status: string,
    enter_age: number | null,
    notice_date: string | null,
    adoption_start_date: string | null,
    photo_url: string | null
  }

  const UpdateAnimal = (params: UpdateAnimalData, accessToken : string| unknown) => {
    try{
        const res = customAxios.patch(`/animal`, params,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        )
        console.log('동물 수정 완료', res)
    }catch(error){
        console.log(error)
        }
    }

  const DeleteAnimal = async (params: string | undefined, accessToken: string | unknown) => {
      
      try{
          const res = customAxios.delete(`/animal/${params}`,
          {
              headers: {
                  Authorization: `${accessToken}`,
                }
            }
            )
            console.log('동물 삭제 완료', res)
    }catch(error){
        console.log(error)
    }
  };
export { GetAnimal, EnrollAnimal, UpdateAnimal ,DeleteAnimal }
