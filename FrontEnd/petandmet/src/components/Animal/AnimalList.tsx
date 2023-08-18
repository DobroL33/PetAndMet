import { Box, Pagination } from "@mui/material";
import CardInfo from "containers/components/Card";
import { useEffect, useState } from "react";
import { useAnimalList, Animal } from "hooks/Animal/useAnimalList";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function AnimalList() {
  const [animalToShow, setAnimalsToShow] = useState<Animal[]>();
  const { data, refetch } = useAnimalList();
  const location = useLocation()
  const showPagination = location.state as Boolean
  // console.log("애니멀 리스트 data?.response");
  // console.log(data?.response);
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setAnimalsToShow(data.response);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const animalsPerPage = 8;
  const totalAnimals = animalToShow?.length || 0;
  const totalPages = Math.ceil(totalAnimals / animalsPerPage);
  const startIndex = currentPage * animalsPerPage;
  const endIndex = startIndex + animalsPerPage;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
    <Container>
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 이 부분을 추가하여 카드를 자동으로 정렬합니다.
          gap: "8px", // 카드 간 간격 설정
          height: "95%",
        }}
      >
        {animalToShow !== undefined &&
          animalToShow.slice(startIndex, endIndex).map((animal) => (
            <CardInfo key={animal.animal_uuid} animal={animal} />
          ))}
      </Box>
      <Box>
      {showPagination && (
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          page={currentPage + 1}
          onChange={(event, page) => handlePageChange(event, page - 1)}
          sx={{ mt: 2,display:'flex', justifyContent: "center" }}
        />
      )}
      </Box>
    </Container>
    </>
  );
}
export default AnimalList;
