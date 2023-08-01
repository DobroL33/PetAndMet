import React from 'react';
import adopt_process_1 from '../images/adopt_process_1.png'
import adopt_process_2 from '../images/adopt_process_2.png'
import adopt_process_3 from '../images/adopt_process_3.png'
import adopt_process_4 from '../images/adopt_process_4.png'
import adopt_process_5 from '../images/adopt_process_5.png'
import { Container, Grid, Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

interface NumberedDivProps {
  title: string;
  text: string;
  img:string
}

const NumberedDiv: React.FC<NumberedDivProps> = ({ title, text,img}) => {
  return (
    <Container  style={{ borderRadius: 5, border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
       <Grid container spacing={2}>
            <Grid xs={3}>
                <img
                    src={img}
                    alt={`${img} 이미지`}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginTop: '30px' }}
                    />
            </Grid>
            <Grid xs={9} style={{textAlign: 'left'}}> 
                <Box style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '15px', marginBottom:'15px' }}>{title}</Box>
                <Box style={{ fontSize: '16px' }}>{text}</Box>
            </Grid>
        </Grid>
    </Container>
  );
};

const AdoptProcess: React.FC = () => {
    const imgs = [adopt_process_1,adopt_process_2, 
                  adopt_process_3, adopt_process_4, adopt_process_5]
    const title = ['1. 입양 가능 동물 확인', '2. 입양 전 교육', '3. 입양 신청', '4. 방문상담 및 입양', '5. 입양 후기 공유']
    const text = ["보호소에서 입양 가능한 '보호동물'을 확인합니다.", "입양을 희망하시는 분은 '입양자 교육'을 이수해주세요.(입양자 교육은 해당 보호소를 통해 이수 받으실 수 있습니다.)",
                 '입양신청을 통해 방문 예정일과 시간을 선택하여 신청해  주세요.(입양 신청 후 방문일자는 수정이 불가 합니다.)', 
                 '입양신청 시 선택한 날짜와 시간에 맞춰 방문하여 상담 후 입양여부 결정', "'입양 후기' 게시판에 입양된 동물의 행복한 일상을 공유해주세요." ]
  
    return (
    <>
        <div style={{ padding: 20 }}>
            <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
            입양 절차
            </Typography>
        </div>
        {
            imgs.map((img, i) => {
                return (
                    <NumberedDiv img={img} title={title[i]} text={text[i]}></NumberedDiv>
                )
            })
        }
        <Button>입양 신청하러 가기</Button>
    </>
  );
};

export default AdoptProcess;
export{};