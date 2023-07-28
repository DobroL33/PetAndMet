import { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import kakaopay from '../images/kakaopay.png';

const options = [5000, 10000, 15000, 20000, 50000];

function Charge() {
  const [selectedOption, setSelectedOption] = useState<number>(options[0]);

  const handleOptionChange = (value: number) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
          충전하기
        </Typography>
      </div>

      <Container>
        <div style={{ backgroundColor: '#FFE8A3', borderRadius: 20 }}>
          <Container>
            <Grid container style={{ padding: 10, color: 'white' }}>
              <Grid item xs={3} md={3} style={{ backgroundColor: '#FFA629', borderRadius: 5 }}>
                <Typography variant="body1">보유 포인트</Typography>
                <Typography variant="body2">10000원</Typography>
              </Grid>
              <Grid item xs={1} md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                +
              </Grid>
              <Grid item xs={3} md={3} style={{ backgroundColor: '#FFA629', borderRadius: 5 }}>
                <Typography variant="body1">충전 포인트</Typography>
                <Typography variant="body2">{selectedOption}원</Typography>
              </Grid>
              <Grid item xs={1} md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                =
              </Grid>
              <Grid item xs={4} md={4} style={{ backgroundColor: '#FFA629', borderRadius: 5 }}>
                <Typography variant="body1">총 포인트</Typography>
                <Typography variant="body2">{selectedOption + 10000}원</Typography>
              </Grid>
            </Grid>
          </Container>
          <Container >
            <Grid container style={{justifyContent: 'center', alignItems: 'center' }}>
              <Grid item xs={6} md={6}>
                {options.map((option) => (
                  <div key={option}>
                    <label>
                      <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                      />
                      {option}원
                    </label>
                  </div>
                ))}
              </Grid>
              <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={kakaopay} alt="" style={{width : '35%', borderRadius:30}} />
              </Grid>
            </Grid>
          </Container>
      <Button variant="contained" style={{backgroundColor : '#FFA629'}}>
        결제하기
      </Button>
        </div>
      </Container>
    </div>
  );
}

export default Charge;
export {};