import { useEffect, useState } from "react";
import styles from "./FlightRoute.module.css"
function FlightRoute({ leg }) {
  const [depPoint, setDepPoint] = useState({});
  const [arrPoint, setArrPoint] = useState({});

  useEffect(() => {
    if (leg.segments.length > 1) {
      setArrPoint({
        city: leg.segments[1].arrivalCity.caption,
        airport: leg.segments[1].arrivalAirport.caption,
        airportId: leg.segments[1].arrivalAirport.uid,
      });
    }
    setDepPoint({
      city: leg.segments[0].departureCity.caption,
      airport: leg.segments[0].departureAirport.caption,
      airportId: leg.segments[0].departureAirport.uid,
    });
    setArrPoint({
      city: leg.segments[0].arrivalCity.caption,
      airport: leg.segments[0].arrivalAirport.caption,
      airportId: leg.segments[0].arrivalAirport.uid,
    });
  }, []);

  return (
    <p className={styles.route}>
      <span>{depPoint.city}, </span>
      <span>{depPoint.airport}</span>
      <span className={styles.airportId}>{` (${depPoint.airportId} ) `}&rarr;</span>
      <span> {arrPoint.city}, </span>
      <span>{arrPoint.airport}</span>
      <span className={styles.airportId}>{` (${arrPoint.airportId}) `}</span>
    </p>
  );
}

export default FlightRoute;
