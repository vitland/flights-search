
import FlightDates from "../FlightDates/FlightDates";
import FlightRoute from "../FlightRoute/FlightRoute";
import styles from "./FlightCard.module.css";

function FlightCard({ flight }) {
  return (
    <article className={styles.container}>
      <div className={styles.header}>
        <span className={styles.aviaLogo}>{flight.carrier.caption}</span>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{flight.price.total.amount} руб.</span>
          <p className={styles.priceCaption}>стоимость на одного взрослого</p>
        </div>
      </div>
      {flight.legs.map((leg) => {
        return (
          <div
            key={leg.segments[0].arrivalDate}
            className={styles.legContainer}
          >
            <FlightRoute leg={leg} />
            <FlightDates leg={leg} />
            <div>
              {leg.segments.length > 1 ? (
                <p className={styles.transfer}>1 пересадка</p>
              ) : null}
            </div>
            <p className={styles.aviacompany}>{`Рейс выполняет: ${flight.carrier.caption}`}</p>
          </div>
        );
      })}
      <button className={styles.confirmBtn}>Выбрать</button>
    </article>
  );
}

export default FlightCard;
