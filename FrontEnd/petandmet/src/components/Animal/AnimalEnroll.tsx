import { Container, Typography, Button, InputLabel, FormControl,
  Box, TextField, Grid, Select, MenuItem } from "@mui/material";
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';
import { useAccessToken } from "hooks/useAccessToken";
import { EnrollAnimal } from 'hooks/Animal/AnimalData';

const CustomButton = styled(Button)(({ theme }) => ({
backgroundColor: '#FFA629',
color: 'white',
padding: '10px 20px',
borderRadius: '5px',
boxShadow: 'none',
'&:hover': {
backgroundColor: 'orange',
},
margin: '5px',
}))
interface UploadedImage {
    name: string;
    size: number;
    type: string;
    file: File | undefined;
  }

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

function AnimalEnroll() {
    const navigate = useNavigate()
    const { accessToken, centerUuid } = useAccessToken()
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [specie, setSpecie] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [character, setCharacter] = useState('');
    const [find_place, setFindPlace] = useState('');
    const [center_uuid, setCenterUuid] = useState(centerUuid);
    const [enter_date, setEnterDate] = useState('');
    const [adoption_status, setAdoptionStatus] = useState('');
    const [enter_age, setEnterAge] = useState('');
    const [notice_date, setNoticeDate] = useState('');
    const [adoption_start_date, setAdoptionStartDate] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | undefined>(undefined)
    const [preview, setPreview] = useState('')
    const goToBack =() => {
    navigate(-1)
    }

    const data: EnrollData ={
        request: {
            name: name,
            age: parseInt(age),
            specie: specie,
            breed: breed,
            gender: gender,
            character: character,
            find_place: find_place,
            center_uuid: center_uuid,
            enter_date: enter_date,
            adoption_status: adoption_status,
            enter_age: parseInt(enter_age),
            notice_date: notice_date,
            adoption_start_date: adoption_start_date,
        },
        image: uploadedImage
        };

        const Enroll = async () => {
            console.log(data)
            await EnrollAnimal(data, accessToken)
            goToBack()
        }

        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            
            if (file) {
              const newUploadedImage: UploadedImage = {
                name: file.name,
                size: file.size,
                type: file.type,
                file: file
              };
                setUploadedImage(file);
            }
            
            if (file) {
                  const selectedImage = file;
                  const reader = new FileReader();

                  reader.onload = () => {
                    setPreview(reader.result as string);
                  };
                  reader.readAsDataURL(selectedImage);
                }
          };

return (
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
      {preview ? (
          <img src={preview} alt="미리보기" width="100%" />
      ) : (
          <Typography variant="body1">등록된 사진이 없습니다.</Typography>
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
                        onChange={(e) => setName(e.target.value)}
                        
                        />
                    <TextField
                        id="outlined-multiline-static"
                        label="추정 나이"
                        onChange={(e) => setAge(e.target.value)}
                        
                        />
                    <TextField 
                        id="outlined-basic" 
                        label="종류" 
                        variant="outlined" 
                        onChange={(e) => setSpecie(e.target.value)}
                        
                        />
                    <TextField 
                        id="outlined-basic" 
                        label="품종" 
                        variant="outlined" 
                        onChange={(e) => setBreed(e.target.value)}
                        
                        />
                    <FormControl sx={{ '& > *': { width: '100%' } }}>
                        <InputLabel sx={{paddingRight: 38}}>성별</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                value={gender}
                                label= "성별"
                                onChange={(e) => setGender(e.target.value)}
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
                                value={character}
                                label= "성격"
                                onChange={(e) => setCharacter(e.target.value)}
                                >
                                <MenuItem value="PEACE">PEACE</MenuItem>
                                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                <MenuItem value="SENSITIVE">SENSITIVE</MenuItem>
                            </Select>
                    </FormControl>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

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
                        onChange={(e) => setEnterDate(e.target.value)}
                        
                        />
                    <TextField 
                        id="outlined-basic" 
                        label="발견 장소" 
                        variant="outlined" 
                        onChange={(e) => setFindPlace(e.target.value)}
                        
                        />  
                    <TextField
                        id="outlined-multiline-static"
                        label="만료 나이"
                        onChange={(e) => setEnterAge(e.target.value)}
                        
                        />
                    <TextField 
                        id="outlined-basic" 
                        label="공고일" 
                        variant="outlined" 
                        onChange={(e) => setNoticeDate(e.target.value)}
                        
                        /> 
          
                    <TextField
                        id="outlined-multiline-static"
                        label="입양 시작 날짜"
                        onChange={(e) => setAdoptionStartDate(e.target.value)}
                        />

                    <FormControl sx={{ '& > *': { width: '100%' } }}>
                        <InputLabel sx={{paddingRight: 38}}>입양 상태</InputLabel>
                            <Select
                                labelId="character-label"
                                id=""
                                label="입양 상태"
                                value={adoption_status}
                                onChange={(e) => setAdoptionStatus(e.target.value)}
                                >
                                <MenuItem value="POSSIBLE">POSSIBLE</MenuItem>
                                <MenuItem value="IMPOSSIBLE">IMPOSSIBLE</MenuItem>
                            </Select>
                    </FormControl>

                </Box>
                <Box sx={{mt : 3.5, ml: 10}}>
                    <Button
                        sx={{
                            backgroundColor: '#1E90FF',
                            '&:hover': { backgroundColor: '#4FC3F7' },
                            color: 'black',
                            marginRight: '5px',
                        }}
                        onClick={Enroll}
                        >
                        등록
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

export default AnimalEnroll
export{}