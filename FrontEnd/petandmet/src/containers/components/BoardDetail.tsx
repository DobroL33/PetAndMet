import {useState} from 'react';
import {Container, Button} from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import logo from '../../images/new_logo.jpg'

// title, content, image는 데이터 받으면 다시 수정 할 예정

function BoardDetail(){
    const [title, setTitle] = useState('변경이 안되는지 확인하는 제목');
    const [content, setContent] = useState('변경이 안되는지 확인하는 내용');
    const [image, setImage] = useState(logo)
    return(
        <>
        <Container>       
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
                variant="outlined" 
                value={title}
                InputProps={{
                    readOnly: true,
                  }}
                />
            
            <img src={logo}></img>

            <TextField
                id="outlined-multiline-static"
                multiline
                defaultValue={content}
                rows={15}
                InputProps={{
                    readOnly: true,
                  }}
                />
        </Box>
        </Container>
    </>
    )
}

export default BoardDetail
export{}