import { Container, Grid, Typography, LinearProgress, Button } from "@mui/material";
import pay from "../../images/kakaopay.png";

function ItemDetail() {
  return (
    <>
      <Container>
      <div style={{ padding: 20 }}>
        <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
          후원 물품
        </Typography>
      </div>
        <Grid container
              spacing={2} 
              justifyContent='center' 
              alignItems="center" 
              marginBottom={10}
              >
          <Grid item xs={4} textAlign='center'>
            <img src={pay} alt="" width='100%' />
          </Grid>
          <Grid item xs={8} textAlign="left">
            <Typography variant="body1" marginBottom={3}>물품 명 : 000</Typography>
            <Typography variant="body1" marginBottom={3}>목표 가격 : 00,000원</Typography>
            <Typography variant="body1" marginBottom={3}>남은 금액 : 00,000원</Typography>

            <LinearProgress variant="determinate" value={10} sx={{ width: "50%", height: 15 }} />
          </Grid>
        <Grid container justifyContent='flex-end'>
            <Button sx={{bgcolor: 'blue', color:'white'}}>후원하기</Button>
            <Button sx={{bgcolor: 'blue', color:'white'}}>수정</Button>
            <Button sx={{bgcolor: 'red', color:'white'}}>삭제</Button>
        </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ItemDetail;
export{}