import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface InputFormProps {
    setTitle: (title : string) => void;
    setContent: (content : string) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // handleImageChange 함수 타입 추가
    title: string
    content : string,
    image : string,
}

function UpdateInputForm({ setTitle, setContent, handleImageChange, title, content, image }: InputFormProps) {
    
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
                label="제목" 
                variant="outlined" 
                onChange={(e) => {
                    setTitle(e.target.value)
                    // console.log(setTitle)
                }}
                defaultValue={title}
                />

            <TextField
                id="outlined-multiline-static"
                label="내용"
                multiline
                rows={15}
                onChange={(e) =>{
                    setContent(e.target.value)
                    // console.log(setContent)
                }}
                defaultValue={content}
                />
            <img src= {image} alt="사진이 없습니다." />
            <input type="file" accept='image/png, image/jpeg, image/jpg'
                    onChange={handleImageChange}
            />
        </Box>

        </Container>
    </>
    )
}

export default UpdateInputForm;
export{};
