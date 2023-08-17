import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCenterData } from "hooks/Center/useCenterData";
import { Button } from "react-bootstrap";
import useWalkForm from "hooks/Volunteer/useWalkForm";
import { useAccessToken } from "hooks/useAccessToken";
import useAnimal from "hooks/Animal/useAnimal";
import AnimalDetail from "containers/components/AnimalDetail";
import { GetAnimal } from "hooks/Animal/AnimalData";
import { useState, useEffect } from "react";
import { useStore } from "hooks/Volunteer/useWalkStore";

interface AnimalData {
  name: string | null;
  age: number | null;
  specie: string | null;
  breed: string | null;
  gender: string | null;
  character: string | null;
  find_place: string | null;
  center_uuid: string;
  enter_date: string | null;
  adoption_status: string | null;
  enter_age: number | null;
  notice_date: string | null;
  adoption_start_date: string | null;
  photo_url: string | null;
}

interface CenterData {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface WalkForm {
  date: string;
  time: number;
  center_uuid: string;
  animal_uuid: string;
  // status: string;
  // user_uuid: string;
}

interface WalkDateProps {
  animalUuid: string | null;
  centerUuid: string | null;
}

function WalkDate() {
  const { animalUuid, centerUuid } = useStore();
  const { userUuid, accessToken } = useAccessToken();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const { centerData } = useCenterData();
  const Animal = useAnimal();
  const animal_uuid = Animal.animalData.animal_uuid;
  const [animalDetail, setAnimalDetail] = useState<AnimalData | null>(null); // 객체나 null로 초기화

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const info = await GetAnimal(animal_uuid, accessToken);
  //       if (info !== undefined) {
  //         setAnimalDetail(info);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  console.log("흠animalDetail");
  console.log(animalDetail);

  const name = centerData?.name;
  const email = centerData?.email;
  const phone = centerData?.phone;
  const address = centerData?.address;

  let selectedDate = value?.format("YYYY-MM-DD");
  let selectedHour = value?.hour();

  // console.log(AnimalData);
  // console.log("center_uuid");
  // console.log(center_uuid);

  // PM 시간 대 (12:00 PM 이후)를 조정
  // if (value?.format("A") === "PM" && selectedHour) {
  //   selectedHour += 12;
  // }
  const selectedTime = String(selectedHour).padStart(2, "0"); // 시간을 두 자릿수 형식으로 변경 (예: 05, 13 등)

  const { sendWalkForm } = useWalkForm();

  // 저기 두 개 값 넣어서 보내야됨.
  const handleFormSubmit = () => {
    const formData: WalkForm = {
      date: selectedDate as string,
      time: Number(selectedTime),
      center_uuid: centerUuid as string,
      animal_uuid: animalUuid as string,
    };
    console.log(formData);
    sendWalkForm(formData);
  };
  console.log("마지막==========");
  console.log(animalUuid);
  console.log(centerUuid);

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{ monthShort: `M` }}
      >
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label="날짜와 시간을 정해주세요"
            format="YYYY년 MM월 DD일 hh:mm분"
            showDaysOutsideCurrentMonth
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
        <br></br>
        <p>
          {name}에 {value?.format("YYYY년 MM월 DD일 a hh:mm분 ")} 신청하시나요?
        </p>
        <br></br>
        <p>주소는 {address} 입니다.</p>
        <br></br>
        <p>
          원활한 신청을 위해 연락 먼저 해보시는건 어떨까요? <br></br>
          {phone} {email}
        </p>
        <Button
          variant="contained"
          onClick={handleFormSubmit}
          style={{
            backgroundColor: "#FFA629",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            marginTop: "40px",
            // marginBottom: "10px",
          }}
        >
          신청하기
        </Button>
      </LocalizationProvider>
    </>
  );
}

export default WalkDate;
