import {useState} from 'react';
import { Button, Container, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function NoticeCreate(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    return(
        <>
        <Container>
        <div style={{ padding: 20 }}>
            <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
                Q & A 게시글 작성
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
        label="제목" 
        variant="outlined" 
        onChange={(e) =>{
            setTitle(e.target.value)
            console.log(title)
          }}
        />
    
      <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={15}
          onChange={(e) =>{
            setContent(e.target.value)
            console.log(content)
          }}
        />
        </Box>

        <Box sx={{textAlign  : 'right', width : '90%'}}>
           <Button sx={{backgroundColor : 'blue', "&:hover":{backgroundColor :'#4FC3F7'}, color : 'black'}}>작성</Button>
           <Button sx={{backgroundColor : 'red', "&:hover":{backgroundColor :'#FA8072'}, color : 'black'}}>돌아가기</Button>
           </Box>
        </Container>
    </>
    )
}

export default NoticeCreate
export{};