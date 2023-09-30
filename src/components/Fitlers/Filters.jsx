import { useDispatch, useSelector } from "react-redux";
import {
  changeSortByType,
  changeFilterByPrice,
  changeSortByTransfer,
  changeCarriers,
} from "../../features/flights/flightsSlice";
import styles from "./Filters.module.css";
import { useEffect, Fragment, useState } from "react";

function Filters() {
  const [carriers, setCarriers] = useState([]);
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.flights.filters.sortType);
  const { from, to } = useSelector((state) => state.flights.filters.price);
  const { direct, transfer } = useSelector(
    (state) => state.flights.filters.transfer
  );
  const { bestDirect, bestTransfer } = useSelector(
    (state) => state.flights.carriers
  );

  useEffect(() => {
    if ((transfer && direct) || (!transfer && !direct)) {
      const uniq = [...bestDirect, ...bestTransfer]
        .sort((a, b) => a.price.amount - b.price.amount)
        .reduce(
          (a, b) =>
            a.find(({ carrier }) => carrier.uid === b.carrier.uid)
              ? a
              : a.concat(b),
          []
        );
      setCarriers(uniq);
      return;
    }

    if (transfer) {
      const uniq = bestTransfer.reduce(
        (a, b) =>
          a.find(({ carrier }) => carrier.uid === b.carrier.uid)
            ? a
            : a.concat(b),
        []
      );
      setCarriers(uniq);
    }

    if (direct) {
      const uniq = bestDirect.reduce(
        (a, b) =>
          a.find(({ carrier }) => carrier.uid === b.carrier.uid)
            ? a
            : a.concat(b),
        []
      );
      setCarriers(uniq);
    }
  }, [transfer, direct, bestDirect, bestTransfer]);

  return (
    <div className={styles.container}>
      <div className={styles.radioContainer}>
        <h3 className={styles.heading}>Сортировать</h3>
        <label htmlFor="sortType">
          <input
            type="radio"
            checked={sortType === 0}
            value={0}
            onChange={(evt) =>
              dispatch(changeSortByType(Number(evt.target.value)))
            }
          />
          - По возрастанию цены
        </label>
        <label htmlFor="sortType">
          <input
            name={"По убыванию"}
            type="radio"
            checked={sortType === 1}
            value={1}
            onChange={(evt) =>
              dispatch(changeSortByType(Number(evt.target.value)))
            }
          />
          - По убыванию цены
        </label>
        <label>
          <input
            type="radio"
            checked={sortType === 2}
            value={2}
            onChange={(evt) =>
              dispatch(changeSortByType(Number(evt.target.value)))
            }
          />
          - По продолжительности
        </label>
      </div>
      <div className={styles.checkboxContainer}>
        <h3 className={styles.heading}>Фильтровать</h3>
        <label htmlFor="">
          <input
            type="checkbox"
            checked={transfer}
            onChange={() =>
              dispatch(
                changeSortByTransfer({ type: "transfer", value: !transfer })
              )
            }
          />
          - 1 пересадка
        </label>
        <label htmlFor="">
          <input
            type="checkbox"
            checked={direct}
            onChange={() =>
              dispatch(changeSortByTransfer({ type: "direct", value: !direct }))
            }
          />
          - без пересадок
        </label>
      </div>
      <div className={styles.checkboxContainer}>
        <h3 className={styles.heading}>Цена</h3>
        <label htmlFor="">
          От
          <input
            type="text"
            value={from}
            onChange={(evt) =>
              dispatch(
                changeFilterByPrice({
                  type: "from",
                  value: Number(evt.target.value),
                })
              )
            }
          />
        </label>
        <label htmlFor="">
          До
          <input
            type="text"
            value={to}
            onChange={(evt) =>
              dispatch(
                changeFilterByPrice({
                  type: "to",
                  value: Number(evt.target.value),
                })
              )
            }
          />
        </label>
      </div>
      <div className={styles.checkboxContainer}>
        <h3 className={styles.heading}>Фильтровать</h3>
        {carriers.map((item) => (
          <Fragment key={item.carrier.uid}>
            <label htmlFor={item.carrier.uid}>
              <input type="checkbox" id={item.carrier.uid} onChange={()=> dispatch(changeCarriers(item.carrier.uid))}/>
              <span className={styles.airCompany}>
                {item.carrier.caption} - {item.price.amount} р.
              </span>
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Filters;
