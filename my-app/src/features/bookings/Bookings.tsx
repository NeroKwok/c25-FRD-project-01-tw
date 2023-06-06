import React, { useState } from "react";
import "./Bookings.css";
import { useParams } from "react-router-dom";
import { UseHotelInfo } from "../hotel/hotelAPI";
import { Button, Form } from "react-bootstrap";
import {
  DateTimePickerComponent,
  ChangeEventArgs,
} from "@syncfusion/ej2-react-calendars";

function Bookings() {
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);

  let { hotelId } = useParams();
  const hotelIdNum = Number(hotelId);
  const hotelInfo = UseHotelInfo();

  const hotel = hotelInfo.find((hotel) => hotel.id === hotelIdNum);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Start Time: ", startTime);
    console.log("End Time: ", endTime);
    return [];
  };

  const currentDate = new Date();
  currentDate.setMinutes(0);

  const minTime = new Date(currentDate.getTime());
  minTime.setHours(8, 0, 0); // set minimum time to 8:00am

  return (
    <>
      <h2>Hotel Bookings</h2>
      <Form>
        <div>預約酒店為：{hotel?.name}</div>
        <div>
          選擇開始時間* :
          <DateTimePickerComponent
            placeholder="Choose date and time"
            value={startTime}
            step={60}
            format="dd-MMM-yy HH:mm"
            min={minTime}
            max={new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000)}
            onChange={(args: ChangeEventArgs) => {
              const newStartTime = args.value;
              setStartTime(newStartTime);
              console.log("Start Time Changed: ", newStartTime);
              if (
                endTime &&
                newStartTime &&
                newStartTime.getTime() + 3600 * 1000 > endTime.getTime()
              ) {
                setEndTime(new Date(newStartTime.getTime() + 3600 * 1000));
                console.log(
                  "End Time Changed: ",
                  new Date(newStartTime.getTime() + 3600 * 1000)
                );
              }
            }}
          ></DateTimePickerComponent>
        </div>
        <div>
          選擇完結時間* :
          <div>
            <DateTimePickerComponent
              placeholder="Choose date and time"
              value={endTime}
              step={60}
              format="dd-MMM-yy HH:mm"
              min={
                startTime
                  ? new Date(startTime.getTime() + 60 * 60 * 1000)
                  : minTime
              }
              max={
                startTime
                  ? new Date(
                      Math.max(
                        currentDate.getTime() + 3 * 24 * 60 * 60 * 1000,
                        startTime.getTime() + 24 * 60 * 60 * 1000
                      )
                    )
                  : new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000)
              }
              onChange={(args: ChangeEventArgs) => {
                setEndTime(args.value);
                console.log("End Time Changed: ", args.value);
              }}
            ></DateTimePickerComponent>
          </div>
        </div>

        <div>
          Email* : <input type="email"></input>
        </div>
        <div>
          WhatsApp聯絡電話* : <input type="text"></input>
        </div>
        <div>
          備註 : <input type="text"></input>
        </div>
        <Button onClick={(e) => handleSubmit(e)}>預約 及 付款</Button>
      </Form>
    </>
  );
}

export default Bookings;
