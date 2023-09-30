import "./App.css";
import FlightList from "./components/FlightList/FlightList";
import Filters from "./components/Fitlers/Filters";

function App() {
  return (
    <main className="main">
      <Filters />
      <FlightList />
    </main>
  );
}

export default App;
