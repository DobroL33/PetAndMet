import { useNavigate, useLocation } from "react-router-dom"
import { Container, Typography, Button, InputLabel, FormControl,
    Box, TextField, Grid, Select, MenuItem } from "@mui/material";
import {useState} from 'react'
import { useAccessToken } from "hooks/useAccessToken";
import { PostWalkUpdate } from "hooks/Center/useCenterWalk";
interface WalkApplication {
    date : string,
    time : number,
    status : string,
    walk_id : number,
    animal_uuid : string | null,
    center_uuid : string | null,
    user_uuid : string | null
}

interface postWalk {
    walk_id : number,
    status_result : string,
}

function WalkUpdate(){

    const navigate = useNavigate()
    const location = useLocation()
    const Data = location.state as WalkApplication
    const [changeStatus, setChangeStatus] =  useState(Data.status)
    const { accessToken } = useAccessToken()
    
    const goToBack = () =>{
        navigate(-1)
    }
    const goToUpdate = async () => {
        const updatedData: postWalk = {
            walk_id : Data.walk_id,
            status_result : changeStatus,
        };
        console.log(updatedData)
        await PostWalkUpdate(updatedData, accessToken)
        navigate(-1)
      };
      console.log(changeStatus, Data.walk_id)
    return(
        <>
        <Container>     
            <div style={{ padding: 20 }}>
                <Typography
                    variant="h4"
                    style={{ color: '#FFA629', fontWeight: 'bold' }}
                    >
                    산책 정보 수정
                </Typography>
            </div> 

            <Grid>
                <Grid>
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
                            label="신청 날짜" 
                            variant="outlined" 
                            defaultValue={Data.date}
                            disabled
                            />
                        <TextField
                            id="outlined-multiline-static"
                            label="신청 시간"
                            defaultValue={Data.time}
                            disabled
                            />
                        <TextField 
                            id="outlined-basic" 
                            label="신청 대상 보호소" 
                            variant="outlined" 
                            defaultValue={Data.center_uuid}
                            disabled
                            />
                        <TextField 
                            id="outlined-basic" 
                            label="신청 번호" 
                            variant="outlined" 
                            defaultValue={Data.walk_id}
                            disabled
                            />
                        <TextField 
                            id="outlined-basic" 
                            label="신청 대상 동물ID" 
                            variant="outlined" 
                            defaultValue={Data.animal_uuid}
                            disabled
                            />
                        <TextField 
                            id="outlined-basic" 
                            label="신청 사용자ID" 
                            variant="outlined" 
                            defaultValue={Data.user_uuid}
                            disabled
                            />
                        <FormControl sx={{ '& > *': { width: '100%' } }}>
                            <InputLabel sx={{paddingRight: 105}}>승인 상태</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    value={changeStatus}
                                    label= "승인 상태"
                                    onChange={(e) => setChangeStatus(e.target.value)}
                                >
                                    <MenuItem value="APPROVAL">APPROVAL</MenuItem>
                                    <MenuItem value="PENDING">PENDING</MenuItem>
                                    <MenuItem value="REJECTION">REJECTION</MenuItem>
                                </Select>
                        </FormControl>

                    </Box>   
                </Grid>
                <Grid item xs={6}>
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
    </Container>
            </>
    )
}

export default WalkUpdate
export{}