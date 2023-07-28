import CardInfo from './card';

function LiveList(){
    return(
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
            <CardInfo key={idx} />))}
    </>
    )}
export default LiveList;
export{};