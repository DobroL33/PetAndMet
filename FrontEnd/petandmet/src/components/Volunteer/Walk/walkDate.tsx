import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCenterData } from "hooks/Center/useCenterData";

function WalkDate() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const { centerData } = useCenterData();

  const name = centerData?.name;
  const email = centerData?.email;
  const phone = centerData?.phone;
  const address = centerData?.address;

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
          원활한 신청을 위해 사전에 연락 해보시는건 어떨까요? <br></br>
          {phone} {email}
        </p>
      </LocalizationProvider>
    </>
  );
}

export default WalkDate;
