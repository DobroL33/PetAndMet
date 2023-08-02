import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function WalkDate() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

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
        <p>선택한 값: {value?.format("YYYY년 MM월 DD일 a hh:mm분 ")}</p>
      </LocalizationProvider>
    </>
  );
}

export default WalkDate;
