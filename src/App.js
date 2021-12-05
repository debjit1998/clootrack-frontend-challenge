import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store/reducers/chartDataReducer";
import Visualizer from "./components/visualizer";
import Loader from "./components/loader";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chartData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch({
          type: actions.ADD_DATA,
          payload: data,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="app">
      {loading && <Loader />}
      {!loading && !chartData.length && (
        <h1 style={{ textAlign: "center" }}>
          Unable to load data. Please reload the page and try again.
        </h1>
      )}
      {!!chartData.length &&
        chartData.map(({ type, elements }, index) => (
          <Visualizer
            key={index}
            type={type}
            elements={elements}
            index={index}
          />
        ))}
    </div>
  );
}

export default App;
