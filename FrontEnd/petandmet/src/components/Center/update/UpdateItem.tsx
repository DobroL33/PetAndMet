import { Container, Typography, Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { domain } from "hooks/customQueryClient";
import { useAccessToken } from "hooks/useAccessToken";
import { ItemUpdate} from "hooks/Center/CenterItem";

interface itemData{
    center_item_id : number,
    center_uuid : string | unknown,
    item_name : string | null,
    item_url : string | null,
    item_target_price : number | null
}

function UpdateCenterItem() {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state as itemData
    const [updatedName, setUpdatedName] = useState(item.item_name);
    const [updatedUrl, setupdatedUrl] = useState(item.item_url);
    const [updateTargetPrice, setupdateTargetPrice] = useState(item.item_target_price);
    const { accessToken, centerUuid } = useAccessToken()


    const goToBack = () =>{
        navigate(-1)
    }
    const goToUpdate = async () => {
        const updatedData = {
            center_item_id : item.center_item_id,
            center_uuid : centerUuid,
            item_name : updatedName,
            item_url : updatedUrl,
            item_target_price : updateTargetPrice
        };
        console.log(updatedData)
        await ItemUpdate(updatedData, accessToken, domain)
        navigate(-2)
      };

    return(
        <>
        <Container>     
            <div style={{ padding: 20 }}>
                <Typography
                    variant="h4"
                    style={{ color: '#FFA629', fontWeight: 'bold' }}
                >
                    등록 물품 정보 수정
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
                onChange={(e) => setUpdatedName(e.target.value)}
                defaultValue={updatedName}
                />

            <TextField
                id="outlined-multiline-static"
                label="주소"
                onChange={(e) => setupdatedUrl(e.target.value)}
                defaultValue={updatedUrl}
                />
            <TextField 
                id="outlined-basic" 
                label="목표 가격" 
                variant="outlined" 
                onChange={(e) => setupdateTargetPrice(parseInt(e.target.value))}
                defaultValue={updateTargetPrice}
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

        </Container>
    </>
    )
}

export default UpdateCenterItem;
export{};
