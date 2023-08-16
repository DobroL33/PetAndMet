import {Table, TableBody, TableCell, TableContainer, TableRow,
    Paper, Button, Container, Grid, TextField} from '@mui/material'
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
          };

return (
<Container sx={{mt : 10}}>
  <Grid sx={{display:'flex', justifyContent:'center', mb: 3}}>
  </Grid>

  <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
    <Table sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
      <TableBody>
        <TableCell sx={{ backgroundColor: '#FFBC5F', width: '20%' }}>
          <TableRow>이름</TableRow>
          <hr />
          <TableRow>입양 상태</TableRow>
          <hr />
          <TableRow>성격</TableRow>
          <hr />
          <TableRow>품종</TableRow>
          <hr />
          <TableRow>종류</TableRow>
        </TableCell>
          <TableCell sx={{ width: '30%' }}>
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="이름" 
                variant="outlined" 
                onChange={(e) => setName(e.target.value)}
                />
            </TableRow>
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="입양 상태" 
                variant="outlined" 
                onChange={(e) => setAdoptionStatus(e.target.value)}
                />
            </TableRow>
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="성격" 
                variant="outlined" 
                onChange={(e) => setCharacter(e.target.value)}
                />
            </TableRow>                
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="품종" 
                variant="outlined" 
                onChange={(e) => setBreed(e.target.value)}
                />
            </TableRow>                
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="종류" 
                variant="outlined" 
                onChange={(e) => setSpecie(e.target.value)}
                />
            </TableRow>                
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="만료 나이" 
                variant="outlined" 
                onChange={(e) => setEnterAge(e.target.value)}
                />
            </TableRow>                
            <hr />
          </TableCell>

        <TableCell sx={{ backgroundColor: '#FFBC5F', width: '20%' }}>
          <TableRow>성별</TableRow>
          <hr />
          <TableRow>발견 장소</TableRow>
          <hr />
          <TableRow>만료일</TableRow>
          <hr />
          <TableRow>공고일</TableRow>
          <hr />
          <TableRow>입양 시작 가능 일시</TableRow>
          <hr />
          <TableRow>나이 (추정)</TableRow>
        </TableCell>
          <TableCell sx={{ width: '30%' }}>
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="성별" 
                variant="outlined" 
                onChange={(e) => setGender(e.target.value)}
                />
            </TableRow>
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="발견 장소" 
                variant="outlined" 
                onChange={(e) => setFindPlace(e.target.value)}
                />
            </TableRow>
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="만료일" 
                variant="outlined" 
                onChange={(e) => setEnterDate(e.target.value)}
                />
            </TableRow>                
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="공고일" 
                variant="outlined" 
                onChange={(e) => setNoticeDate(e.target.value)}
                />
            </TableRow>                
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="입양 가능 시작 일시" 
                variant="outlined" 
                onChange={(e) => setAdoptionStartDate(e.target.value)}
                />
            </TableRow>                
            <hr />
            <TableRow>
                <TextField 
                id="outlined-basic" 
                label="추정 나이" 
                variant="outlined" 
                onChange={(e) => setAge(e.target.value)}
                />
            </TableRow>                
            <hr />

            <input type="file" accept="image/*" onChange={handleImageChange} />          </TableCell>
      </TableBody>
    </Table>
  </TableContainer>

  <Grid sx={{ margin: '30px'}}>
    <CustomButton onClick={Enroll}>등록</CustomButton>
    <CustomButton onClick={goToBack}>돌아가기</CustomButton>
  </Grid>
</Container>
)
}

export default AnimalEnroll
export{}