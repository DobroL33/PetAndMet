import { Box, Button, Container, Typography } from "@mui/material";
import BoardDetail from "../../containers/components/BoardDetail"

function QnaDetail(){
    return(
        <>
        <Container>
            <div style={{ padding: 20 }}>
                <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
                    Q & A 게시글 
                </Typography>
            </div>
            <BoardDetail></BoardDetail>

            <Box sx={{textAlign  : 'right', width : '88%'}}>
                <Button sx={{backgroundColor : '#1E90FF', "&:hover":{backgroundColor :'#4FC3F7'}, color : 'black', marginRight:'5px'}}>수정</Button>
                <Button sx={{backgroundColor : '#FF0044', "&:hover":{backgroundColor :'#FA8072'}, color : 'black'}}>돌아가기</Button>
            </Box>
        </Container>
        </>
    )
}
export default QnaDetail
export{}