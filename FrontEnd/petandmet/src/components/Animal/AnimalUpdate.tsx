import { Container, Typography, Button, InputLabel, FormControl,
         Box, TextField, Grid, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useAccessToken } from "hooks/useAccessToken";
import { UpdateAnimal } from "hooks/Animal/AnimalData";

interface AnimalData{
    animalDetail :{
        uuid: string| null,
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
    },
    animal_uuid: string | null,
}

function AnimalUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const animal = location.state as AnimalData;
    const [updatedName, setUpdatedName] = useState(animal.animalDetail.name);
    const [updateage, setUpdateage] = useState(animal.animalDetail.age);
    const [updatedSpecie, setupdatedSpecie] = useState(animal.animalDetail.specie);
    const [updatedBreed, setupdatedBreed] = useState(animal.animalDetail.breed);
    const [updateGender, setupdateGender] = useState(animal.animalDetail.gender);
    const [updatedCharacter, setupdatedCharacter] = useState(animal.animalDetail.character);
    const [updatedFindPlace, setupdatedFindPlace] = useState(animal.animalDetail.find_place);
    const [updatedEnterDate, setupdatedEnterDate] = useState(animal.animalDetail.enter_date);
    const [updatedAdoptionStatus, setupdatedAdoptionStatus] = useState(animal.animalDetail.adoption_status);
    const [updatedEnterAge, setupdatedEnterAge] = useState(animal.animalDetail.enter_age);
    const [updatedNoticeDate, setupdatedNoticeDate] = useState(animal.animalDetail.notice_date);
    const [updatedAdoptionStartDate, setupdatedAdoptionStartDate] = useState(animal.animalDetail.adoption_start_date);
    const [updatedPhotoUrl, setupdatedPhotoUrl] = useState(animal.animalDetail.photo_url);
    const { accessToken, centerUuid } = useAccessToken()

    const goToBack = () =>{
        navigate(-1)
    }
    const goToUpdate = async () => {
        const updatedData = {
            uuid: animal.animal_uuid,
            name: updatedName,
            age: updateage,
            specie: updatedSpecie,
            breed: updatedBreed,
            gender: updateGender,
            character: updatedCharacter,
            find_place: updatedFindPlace,
            center_uuid: centerUuid,
            enter_date: updatedEnterDate,
            adoption_status: updatedAdoptionStatus,
            enter_age: updatedEnterAge,
            notice_date: updatedNoticeDate,
            adoption_start_date: updatedAdoptionStartDate,
            photo_url: updatedPhotoUrl
        };
        console.log(updatedData)
        await UpdateAnimal(updatedData, accessToken)
        navigate(-1)
      };
    

    return(
        <>
        <Container>     
            <div style={{ padding: 20 }}>
                <Typography
                    variant="h4"
                    style={{ color: '#FFA629', fontWeight: 'bold' }}
                    >
                    동물 정보 수정
                </Typography>
            </div> 

        <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ mb:5, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {updatedPhotoUrl && (
                        <img src={updatedPhotoUrl} alt="등록된 사진이 없습니다." width='100%' />
                )}            
            </Grid>
 
            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '80%' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField 
                                id="outlined-basic" 
                                label="이름" 
                                variant="outlined" 
                                onChange={(e) => setUpdatedName(e.target.value)}
                                defaultValue={updatedName}
                                />
                            <TextField
                                id="outlined-multiline-static"
                                label="추정 나이"
                                onChange={(e) => setUpdateage(parseInt(e.target.value))}
                                defaultValue={updateage}
                                />
                            <TextField 
                                id="outlined-basic" 
                                label="종류" 
                                variant="outlined" 
                                onChange={(e) => setupdatedSpecie(e.target.value)}
                                defaultValue={updateage}
                                />
                            <TextField 
                                id="outlined-basic" 
                                label="품종" 
                                variant="outlined" 
                                onChange={(e) => setupdatedBreed(e.target.value)}
                                defaultValue={updatedBreed}
                                />
                            <FormControl sx={{ '& > *': { width: '100%' } }}>
                                <InputLabel sx={{paddingRight: 38}}>성별</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        value={updateGender}
                                        label= "성별"
                                        onChange={(e) => setupdateGender(e.target.value)}
                                    >
                                        <MenuItem value="MALE">MALE</MenuItem>
                                        <MenuItem value="FEMALE">FEMALE</MenuItem>
                                    </Select>
                            </FormControl>

                            <FormControl sx={{ '& > *': { width: '100%' } }}>
                                <InputLabel sx={{paddingRight: 38}}>성격</InputLabel>
                                    <Select
                                        labelId="character-label"
                                        id=""
                                        value={updatedCharacter}
                                        label= "성격"
                                        onChange={(e) => setupdatedCharacter(e.target.value)}
                                        >
                                        <MenuItem value="PEACE">PEACE</MenuItem>
                                        <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                        <MenuItem value="SENSITIVE">SENSITIVE</MenuItem>
                                    </Select>
                            </FormControl>

                            <FormControl sx={{ '& > *': { width: '100%' } }}>
                                <InputLabel sx={{paddingRight: 38}}>입양 상태</InputLabel>
                                    <Select
                                        labelId="character-label"
                                        id=""
                                        label="입양 상태"
                                        value={updatedAdoptionStatus}
                                        onChange={(e) => setupdatedAdoptionStatus(e.target.value)}
                                        >
                                        <MenuItem value="POSSIBLE">POSSIBLE</MenuItem>
                                        <MenuItem value="IMPOSSIBLE">IMPOSSIBLE</MenuItem>
                                    </Select>
                            </FormControl>
                        </Box>   
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '80%' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField 
                                id="outlined-basic" 
                                label="만료일" 
                                variant="outlined" 
                                onChange={(e) => setupdatedEnterDate(e.target.value)}
                                defaultValue={updatedEnterAge}
                                />
                            <TextField 
                                id="outlined-basic" 
                                label="발견 장소" 
                                variant="outlined" 
                                onChange={(e) => setupdatedFindPlace(e.target.value)}
                                defaultValue={updatedFindPlace}
                                />  
                            <TextField
                                id="outlined-multiline-static"
                                label="만료 나이"
                                onChange={(e) => setupdatedEnterAge(parseInt(e.target.value))}
                                defaultValue={updatedEnterAge}
                                />
                            <TextField 
                                id="outlined-basic" 
                                label="공고일" 
                                variant="outlined" 
                                onChange={(e) => setupdatedNoticeDate(e.target.value)}
                                defaultValue={updatedNoticeDate}
                                /> 
                            <TextField 
                                id="outlined-basic" 
                                label="공고일" 
                                variant="outlined" 
                                onChange={(e) => setupdatedNoticeDate(e.target.value)}
                                defaultValue={updatedNoticeDate}
                                />

                            <TextField
                                id="outlined-multiline-static"
                                label="입양 시작 날짜"
                                onChange={(e) => setupdatedAdoptionStartDate(e.target.value)}
                                defaultValue={updatedAdoptionStartDate}
                                />
                        </Box>
                        <Box sx={{mt : 3.5, ml: 10}}>
                            <Button
                                sx={{
                                    backgroundColor: '#1E90FF',
                                    '&:hover': { backgroundColor: '#4FC3F7' },
                                    color: 'black',
                                    marginRight: '5px',
                                }}
                                onClick={goToUpdate}
                                >
                                수정
                                </Button>
                                <Button
                                sx={{
                                    backgroundColor: '#FF0044',
                                    '&:hover': { backgroundColor: '#FA8072' },
                                    color: 'black',
                                }}
                                onClick={goToBack}
                                >
                                돌아가기
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
    </>
    )
}

export default AnimalUpdate;
export{};
