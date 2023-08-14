import { useState, useEffect } from 'react'
import { Container, Button } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import logo from 'images/new_logo.jpg'
import { useLocation} from 'react-router-dom'

interface BoardDetailProps {
  board: {
    title: string;
    photoUrl: string;
    content: string;
  };
}
function BoardDetail({board}:BoardDetailProps) {
 
  const location = useLocation();
  // const board = location.state
  // const [photoUrlBase64, setPhotoUrlBase64] = useState('');

  // useEffect(() => {
  //   // Convert Blob to base64
  //   if (board.photoUrl) {
  //     fetch(board.photoUrl)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error('Failed to fetch');
  //         }
  //         return res.blob();
  //       })
  //       .then((blob) => {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           if (reader.result) {
  //             setPhotoUrlBase64(reader.result as string);
  //             console.log('photoUrlBase64 after setting:', reader.result);

  //           }
  //         };
  //         reader.readAsDataURL(blob);
  //         console.log(reader)
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch:', error);
  //         console.log(board.photoUrl)
  //       });
  //   }
  // }, []);
  // console.log(board)
  // console.log(photoUrlBase64)
  return (
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
            value={board.title}
            InputProps={{
              readOnly: true,
            }}
          />

          {/* {photoUrlBase64 && <img src={photoUrlBase64} alt="board_photo"></img>} */}
            <img src={board.photoUrl} alt=''></img>
          <TextField
            id="outlined-multiline-static"
            multiline
            defaultValue={board.content}
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
export {}
