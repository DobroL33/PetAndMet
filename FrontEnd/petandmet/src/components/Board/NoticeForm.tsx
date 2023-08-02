import {Container, Typography } from "@mui/material";
import InputForm from '../../containers/components/Form';
function NoticeForm(){
    
    return(
      <>
        <Container>
          <div style={{ padding: 20 }}>
              <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
                  공지사항 작성
              </Typography>
              <InputForm ></InputForm>
          </div>
        </Container>
      </>
    )
}

export default NoticeForm
export{};