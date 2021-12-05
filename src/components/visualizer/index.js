import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { actions } from "../../store/reducers/chartDataReducer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const backgroundColor = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
  "rgba(255, 200, 64, 0.6)",
  "rgba(100, 159, 64, 0.6)",
  "rgba(100, 255, 64, 0.6)",
  "rgba(150, 159, 85, 0.6)",
];

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};

function Visualizer({ type, elements, index }) {
  const dispatch = useDispatch();
  const [barBackgroundColor, setBarBackgroundColor] = useState([
    ...Array(10).fill("rgba(53, 162, 235, 0.8)"),
  ]);
  let data = {};
  if (type === "Bar")
    data = {
      labels: elements.map((_, index) => `Element ${index + 1}`),
      datasets: [
        {
          data: elements,
          backgroundColor: barBackgroundColor,
        },
      ],
    };
  else if (type === "Pie") {
    data = {
      labels: elements.map((_, index) => `Element ${index + 1}`),
      datasets: [
        {
          label: "Pie Chart",
          backgroundColor: backgroundColor.slice(0, elements.length),
          borderColor: backgroundColor.slice(0, elements.length),
          data: elements,
          borderWidth: 1,
        },
      ],
    };
  }

  const handleFocus = (changeIndex) => {
    setBarBackgroundColor((prev) =>
      prev.map((_, index) => {
        if (changeIndex === index) return "rgb(250, 234, 5)";
        return "rgba(53, 162, 235, 0.8)";
      })
    );
  };

  const handleBlur = () => {
    setBarBackgroundColor((prev) => prev.map(() => "rgba(53, 162, 235, 0.8)"));
  };
  const handleChange = (elIndex, typeOfChart, event) => {
    if (typeOfChart === "Pie" && +event.target.value > 100) return;
    dispatch({
      type: actions.CHANGE_DATA,
      payload: {
        type: typeOfChart,
        itemIndex: index,
        elIndex,
        value: +event.target.value,
      },
    });
  };

  if (type === "Bar")
    return (
      <>
        <h2 className="chart-header">Chart {index + 1}</h2>
        <div className="chart-container">
          <Bar options={options} data={data} height={500} />
        </div>
        <div className="input-group">
          {elements.map((el, index) => (
            <div key={index} className="input-container">
              <label style={{ fontWeight: "bold" }}>Element {index + 1}</label>
              <br />
              <input
                className="input"
                type="number"
                value={el}
                onChange={handleChange.bind(null, index, "Bar")}
                onFocus={handleFocus.bind(null, index)}
                onBlur={handleBlur}
                min={0}
              />
            </div>
          ))}
        </div>
      </>
    );
  if (type === "Pie")
    return (
      <>
        <h2 className="chart-header">Chart {index + 1}</h2>
        <div className="chart-container">
          <Pie
            data={data}
            height={300}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="input-group">
          {elements.map((el, index) => (
            <div key={index} className="input-container">
              <label style={{ fontWeight: "bold" }}>Element {index + 1}</label>
              <br />
              <input
                className="input"
                type="number"
                value={el}
                onChange={handleChange.bind(null, index, "Pie")}
                min={0}
                max={100}
              />
            </div>
          ))}
        </div>
      </>
    );
  return null;
}

Visualizer.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  elements: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Visualizer;
