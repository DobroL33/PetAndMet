import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCenterData } from "hooks/Center/useCenterData";
import { Button } from "react-bootstrap";
import useAnimal from "hooks/Animal/useAnimal";
import useWalkForm from "hooks/Volunteer/useWalkForm";
import { useAccessToken } from "hooks/useAccessToken";

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
  status: string;
  user_uuid: string;
}

function WalkDate() {
  const { userUuid } = useAccessToken();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const { centerData } = useCenterData();
  const AnimalData = useAnimal();

  const name = centerData?.name;
  const email = centerData?.email;
  const phone = centerData?.phone;
  const address = centerData?.address;

  let selectedDate = value?.format("YYYY-MM-DD");
  let selectedHour = value?.hour();
  const center_uuid = centerData?.uuid;
  const animal_uuid = AnimalData.animalData.animal_uuid;

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
      center_uuid: center_uuid as string,
      animal_uuid: animal_uuid,
      user_uuid: userUuid as string,
      status: "PENDING",
    };
    console.log("ㅇㅇformData");
    console.log(formData);

    sendWalkForm(formData);
  };

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
          원활한 신청을 위해 사락 해보시는건 어떨까요? <br></br>
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
            marginBottom: "30px",
          }}
        >
          신청하기
        </Button>
      </LocalizationProvider>
    </>
  );
}

export default WalkDate;
