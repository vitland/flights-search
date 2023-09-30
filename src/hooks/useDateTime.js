export function useDateTime() {
  function getTime(date) {
    return new Date(date).toLocaleString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  function getDay(date) {
    return new Date(date).toLocaleString("ru", { day: "2-digit" });
  }
  function getWeekDay(date) {
    return new Date(date).toLocaleString("ru", { weekday: "short" });
  }
  function getMonth(date) {
    return new Date(date).toLocaleString("ru", { month: "short" });
  }
  function convertTime(minutes) {
    const m = +minutes % 60;
    const h = (+minutes - m) / 60;

    const hhmm =
      
      h.toString() +
      " ч " +
      (m < 10 ? "0" : "") +
      m.toString() +
      " мин";
    return hhmm;
  }
  return {
    getMonth,
    getWeekDay,
    getDay,
    getTime,
    convertTime
  };
}

// const dateConversion = (date) => {
//   const dateSrt = new Date(date);
//   // const dateSrt = new Date(date).toLocaleString("ru", {
//   //   month: "short",
//   //   day: "2-digit",
//   //   weekday:"short",
//   //   hour: "2-digit",
//   //   minute:"2-digit"
//   // });
//   // const time = dateSrt.toLocaleString("ru", {
//   //   hour: "2-digit",
//   //   minute: "2-digit",
//   // });
//   // const month = dateSrt.toLocaleString("ru", { month: "short" });
//   // const day = dateSrt.toLocaleString("ru", { day: "2-digit" });
//   // const weekDay = dateSrt.toLocaleString("ru", { weekday: "short" });
//   // return {
//   //   time,
//   //   month,
//   //   day,
//   //   weekDay,
//   // };
//   return `${dateSrt.toLocaleString("ru", {
//     hour: "2-digit",
//     minute: "2-digit",
//   })} ${dateSrt.toLocaleString("ru", {
//     day: "2-digit",
//   })} ${dateSrt.toLocaleString("ru", {
//     month: "short",
//   })} ${dateSrt.toLocaleString("ru", { weekday: "short" })}`;
// };
