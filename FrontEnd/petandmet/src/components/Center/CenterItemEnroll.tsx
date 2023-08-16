import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAccessToken } from "hooks/useAccessToken";
import { ItemEnroll } from "hooks/Center/CenterItem";
function ItemRegister() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [target_price, setTargetPrice] = useState('');
    const { accessToken, centerUuid } = useAccessToken()
    const Data = {
        center_uuid: centerUuid, 
        item_name: name,
        item_url: url,
        item_target_price: parseInt(target_price),
    };

    const goToEnroll =async () => {           
        await ItemEnroll(Data, accessToken)
        navigate(-1)
    }
    const goToBack = () =>{
        navigate(-1)
    }

    return(
        <>
        <Container>     
            <div style={{ padding: 20 }}>
                <Typography
                    variant="h4"
                    style={{ color: '#FFA629', fontWeight: 'bold' }}
                >
                    후원 물품 등록
                </Typography>
            </div>  
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
                label="주소"
                onChange={(e) => setUrl(e.target.value)}
                />
            <TextField 
                id="outlined-basic" 
                label="목표 가격" 
                variant="outlined" 
                onChange={(e) => setTargetPrice(e.target.value)}
                />
        </Box>
        <Box>
            <Button
                sx={{
                    backgroundColor: '#1E90FF',
                    '&:hover': { backgroundColor: '#4FC3F7' },
                    color: 'black',
                    marginRight: '5px',
                }}
                onClick={goToEnroll}
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
        </Container>
    </>
    )
}

export default ItemRegister;
export{};
