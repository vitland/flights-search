import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlightCard from "../FlightCard/FlightCard";
import styles from "./FlightList.module.css";

function FlightList() {
  const flightList = useSelector((state) => state.flights.flights);
  const [sortedFlightsArr, setSortedFlightsArr] = useState([]);
  const sortType = useSelector((state) => state.flights.filters.sortType);
  const price = useSelector((state) => state.flights.filters.price);
  const { direct, transfer } = useSelector(
    (state) => state.flights.filters.transfer
  );
  const carriers = useSelector((state) => state.flights.filters.carriers);
  const [currentCardsCount, setCurrentCardsCount] = useState(2);

  useEffect(() => {
    let filteredArr = flightList.filter(({ flight }) => {
      if (
        flight.price.total.amount < price.from ||
        flight.price.total.amount > price.to
      ) {
        return false;
      }
      return true;
    });

    if (!(transfer && direct)) {
      if (transfer) {
        filteredArr = filteredArr.filter(
          ({ flight }) => flight.legs[0].segments.length === 2
        );
      }
      if (direct) {
        filteredArr = filteredArr.filter(
          ({ flight }) => flight.legs[0].segments.length === 1
        );
      }
    }

    if (sortType === 0) {
      filteredArr.sort(
        (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
      );
    }

    if (sortType === 1) {
      filteredArr.sort(
        (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
      );
    }

    if (sortType === 2) {
      filteredArr.sort((a, b) => {
        const traveltimeA = a.flight.legs.reduce(
          (acc, cur) => acc + cur.duration,
          0
        );
        const traveltimeB = b.flight.legs.reduce(
          (acc, cur) => acc + cur.duration,
          0
        );

        return traveltimeA - traveltimeB;
      });
    }

    if (carriers.length !== 0) {
      filteredArr = filteredArr.filter(({ flight }) =>
        carriers.find((carrier) => carrier === flight.carrier.uid)
      );
    }

    setSortedFlightsArr(filteredArr);
  }, [sortType, flightList, price.from, price.to, transfer, direct, carriers]);

  return (
    <section className={styles.container}>
      {sortedFlightsArr.length !== 0 &&
        sortedFlightsArr.slice(0, currentCardsCount).map((flightInfo) => {
          return (
            <FlightCard
              flight={flightInfo.flight}
              key={flightInfo.flightToken}
            />
          );
        })}
      <button onClick={() => setCurrentCardsCount(currentCardsCount + 2)} className={styles.addBtn}>
        Показать еще
      </button>
    </section>
  );
}

export default FlightList;
