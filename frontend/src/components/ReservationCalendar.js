import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { listOfCarOfReservations } from "../action/carsAction";

function ReservationCalendar() {
  const dispatch = useDispatch();

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [
    {
      title: "Najem",
      startAccessor: "działa",
      allDay: false,
      start: new Date(2022, 1, 1, 10, 0),
      end: new Date(2022, 1, 1, 23, 59),
      color: "#3399ff",
    },
    {
      title: "Najem",
      allDay: false,
      start: new Date(2022, 1, 2),
      end: new Date(2022, 1, 4),
      color: "#3399ff",
    },
    {
      title: "Najem",
      allDay: false,
      start: new Date(2022, 1, 4, 0, 0),
      end: new Date(2022, 1, 4, 11, 30),
      color: "#3399ff",
    },
    {
      title: "Rezerwacja",
      allDay: false,
      start: new Date(2022, 1, 0, 12, 30),
      end: new Date(2022, 1, 0, 15, 30),
      color: "#b30000",
    },
  ];

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  dispatch(listOfCarOfReservations());

  //główny UseEffect
  useEffect(() => {
    console.log("wchodze do useEffecta");
  }, []);

  return (
    <div>
      <div>
        <Calendar
          localizer={localizer}
          culture={"pt-BR"}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "day", "agenda"]}
          style={{
            height: 500,
            margin: "70px",
            color: "black",
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
            event,
            start,
            end,
            isSelected,
            style: {
              backgroundColor: event.color,
              color: "white",
              borderRadius: "0px",
              opacity: 0.9,
            },
          })}
        />
      </div>
    </div>
  );
}

export default ReservationCalendar;
