import CardInfo from './card';

function AnimalList(){
    return(
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
            <CardInfo key={idx} /> // 반복되는 컴포넌트들은 key prop을 설정해야 합니다.
          ))}
    </>
    )}
export default AnimalList;
export{};