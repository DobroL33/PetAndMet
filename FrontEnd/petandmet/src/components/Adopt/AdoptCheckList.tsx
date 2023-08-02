import { Container } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFA629',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'orange',
  },
  margin : '5px',
}));

function CheckList() {
  // 상태 배열로 각 체크박스의 선택 여부를 관리
  const [checklist, setChecklist] = useState<boolean[]>([
    false,false,false,false,false,false,false,false,false,false,
  ]);

  // 체크박스 선택 상태를 토글하는 함수
  const toggleCheckbox = (index: number) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  // 10가지 질문 리스트
  const questions: string[] = [
    '훈련, 산책, 놀이 등에 매일 일정 시간을 할애 할 수 있습니까?',
    '반려 동물의 주 보호자를 정하셨습니까?',
    '반려 동물을 혼자 집에 오래 남겨두지 않을 수 있습니까?',
    '반려 동물의 생활에 필요한 기본 물품을 제공할 수 있습니까?',
    '반려 동물이 질병에 걸리거나 치료가 필요할 때 돌봐 줄 수 있습니까?',
    '장기적으로 반려할 수 있는 확신이 있습니까?',
    '이미 키우는 반려동물이 있다면 합사에 대해 충분히 고민 하였습니까?',
    '입양하고자 하는 동물이 현재 거주 중인 공간에 적합한 크기의 동물입니까?',
    '보호자 부재 시 대신하여 돌봐줄 사람이 있습니까?',
    '동물에 의한 알레르기 반응은 없습니까?',
  ];

  // 모든 체크박스가 선택되었는지 확인하는 함수
  const isAllChecked = checklist.every((checked) => checked);

  return (
    <>
      <div style={{ padding: 20 }}>
        <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
          반려 동물 입양 전 자가진단 체크리스트
        </Typography>
      </div>    <Container sx={{ backgroundColor: '#FFBC5F', padding: '20px', borderRadius: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #FFFFFF' }}>
            <label>
                <input
                type="checkbox"
                checked={checklist[index]}
                onChange={() => toggleCheckbox(index)}
                />
                {question}
            </label>
            </div>
        ))}
        </Box>
        <p style={{opacity: 0.5}}>* 모든 체크를 완료해야 버튼이 활성화 됩니다.</p>
    </Container>
      {/* 모든 체크박스가 선택되지 않은 경우 비활성화된 버튼 */}
      {!isAllChecked && <CustomButton disabled>입양 시설 알아보기</CustomButton>}

      {/* 모든 체크박스가 선택되어 활성화된 버튼 */}
      {isAllChecked && <CustomButton onClick={() => alert('버튼이 클릭되었습니다!')}>입양 시설 알아보기</CustomButton>}
    </>
  );
}

export default CheckList;
export {};