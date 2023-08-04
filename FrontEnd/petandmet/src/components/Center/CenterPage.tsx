import {Box, Container, Grid, Button} from '@mui/material';
import AnimalList from '../Animal/AnimalList';

function CenterPage(){
    return(
    <>
    {/* 수정 버튼은 사용자가 보호소 일때만 보이도록 수정 예정 */}
        <Container sx={{
                mt : 10,
                display: 'grid',
                width : '80%',
                height: '100%',
                borderRadius : 5,}}>
            <Grid container sx={{bgcolor: '#F0F0F0',
                                 textAlign: 'justify',
                                 alignItems:'center',
                                 marginY: '3px', 
                                 whiteSpace : 'nowrap',
                                 border : '2px solid orange',
                                 borderRadius : '5px'}}>
                <Grid xs={6} sx={{fontSize : '2rem'}}>
                    <p> OOO 보호소</p>
                </Grid>
                <Grid xs={4}>
                    <span>장소 : </span>
                    <span> OO시 OO구</span><br />
                    <span>Tel : </span>
                    <span>000 - 000 - 0000</span><br />
                    <span>E-mail : </span>
                    <span> ooooo@ooooo.com</span>
                </Grid>
                <Grid xs={2} sx={{textAlign : 'end'}}>
                        <Button>수정</Button>
                    </Grid>
            </Grid>
            <Grid>
                <Grid container 
                      justifyContent="center" 
                      alignItems="center" 
                      sx={{bgcolor: '#E5E5E5',
                           marginY: '3px',
                           borderRadius : '5px'}}>
                    <Grid xs={2} sx={{textAlign: 'justify',
                                      fontSize :'1.5rem',
                                      whiteSpace : 'nowrap',
                                      display:'inline-block'}}>
                                      보호동물</Grid>
                    <Grid xs={10} sx={{textAlign : 'end'}}>
                        <Button>더보기</Button>
                        <Button>수정</Button>
                    </Grid>
                    <Box sx={{
                        mt:1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: '8px', // 카드 간 간격 설정
                        height: '90%',
                        justifyContent : 'center',
                        alignItems : 'center'
                    }}>
                        <AnimalList></AnimalList>
                    </Box>
                </Grid>
            </Grid>
            <Grid container 
                  justifyContent="center"
                  alignItems="center" 
                  sx={{ bgcolor: '#E5E5E5',
                        textAlign: 'justify',
                        alignItems:'center',
                        marginY: '3px',
                        borderRadius : '5px'}}>

                <Grid xs={2} sx={{textAlign: 'justify', 
                                  fontSize :'1.5rem',
                                  whiteSpace : 'nowrap'}}>물품</Grid>
                <Grid xs={10} sx={{textAlign : 'end'}}>
                    <Button>더보기</Button>
                    <Button>수정</Button>
                </Grid>
                <Box sx={{
                    mt:1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '8px', // 카드 간 간격 설정
                    height: '90%',
                }}>
                </Box>
            </Grid>
        </Container>
    </>
    )
}
export default CenterPage;
export{};