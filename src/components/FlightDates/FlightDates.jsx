import { useEffect, useState } from "react";
import { useDateTime } from "../../hooks/useDateTime";
import styles from "./FlightDates.module.css"
import {AiOutlineClockCircle} from "react-icons/ai"

function FlightDates({ leg }) {
  const { getMonth, getWeekDay, getDay, getTime, convertTime } = useDateTime();
  const [depDate, setDepDate] = useState({
    day: "",
    weekDay: "",
    time: "",
    month: "",
  });
  const [arrDate, setArrDate] = useState({
    day: "",
    weekDay: "",
    time: "",
    month: "",
  });
  const [duration, setDuration] = useState(convertTime(leg.duration));

  useEffect(() => {
    if (leg.segments.length > 1) {
      setArrDate({
        day: getDay(leg.segments[1].arrivalDate),
        weekDay: getWeekDay(leg.segments[1].arrivalDate),
        time: getTime(leg.segments[1].arrivalDate),
        month: getMonth(leg.segments[1].arrivalDate),
      });
    }
    setArrDate({
      day: getDay(leg.segments[0].arrivalDate),
      weekDay: getWeekDay(leg.segments[0].arrivalDate),
      time: getTime(leg.segments[0].arrivalDate),
      month: getMonth(leg.segments[0].arrivalDate),
    });
    setDepDate({
      day: getDay(leg.segments[0].departureDate),
      weekDay: getWeekDay(leg.segments[0].departureDate),
      time: getTime(leg.segments[0].departureDate),
      month: getMonth(leg.segments[0].departureDate),
    });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.hours}>
        {depDate.time}
        <span className={styles.date}>{` ${depDate.day} ${depDate.month} ${depDate.weekDay}`}</span>
      </p>
      <p className={styles.duration}><AiOutlineClockCircle/> {duration}</p>
      <p className={styles.hours}> 
        <span className={styles.date}>{`${arrDate.day} ${arrDate.month} ${arrDate.weekDay} `}</span>
        {arrDate.time}
      </p>
    </div>
  );
}

export default FlightDates;
