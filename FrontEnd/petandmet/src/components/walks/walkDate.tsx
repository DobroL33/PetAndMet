import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BasicDateTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker label="날짜와 시간을 정해주세요" leabel-color="black" />
      </DemoContainer>
    </LocalizationProvider>
  );
}
