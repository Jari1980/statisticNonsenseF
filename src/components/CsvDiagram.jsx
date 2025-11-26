import { useState, useMemo } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CsvDiagram = () => {
  const [data, setData] = useState([]);
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [chartType, setChartType] = useState("pie");

  //Data sorted for linechart
  const processed = useMemo(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
    let totalA = 0;
    let totalB = 0;
    return sorted.map((item) => {
      if (item.button === "A") totalA++;
      if (item.button === "B") totalB++;

      return {
        time: item.time,
        love: totalA,
        like: totalB,
      };
    });
  });

  const pressButton = async (button, love) => {
    try {
      await axios.post(
        `http://localhost:8080/api/button/${button}?value=${love}`
      );
      console.log(`Button ${button} registered`);
    } catch (err) {
      console.error(err);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/clicks");
      const arr = res.data.map((d) => ({
        ...d,
        time: new Date(d.time),
      }));
      setData(arr);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = data.filter((d) => {
    const t = d.time.getTime();
    const min = minTime ? new Date(minTime).getTime() : -Infinity;
    const max = maxTime ? new Date(maxTime).getTime() : Infinity;
    return t >= min && t <= max;
  });

  const numericData = filteredData.map((d) => ({
    ...d,
    buttonValue: d.button === "A" ? 1 : 0,
  }));

  const pieData = [
    {
      name: "I really Love Broccoli",
      value: filteredData.filter((d) => d.button === "A").length,
    },
    {
      name: "I like Broccoli",
      value: filteredData.filter((d) => d.button === "B").length,
    },
  ];

  const pieColors = ["#ff5733", "#3399ff"];

  return (
    <div style={{ padding: 30 }}>
      <br />
      <h2>Read and write data from and to a CSV file</h2>
      <h5>Click on either like button to add log, with button selection and timestamp, in csv file which will be displayed in diagram</h5>
      <hr />

      <button
        className="buttonA"
        onClick={() => pressButton("A", "I really Love Broccoli")}
      >
        I Really Love Broccoli
      </button>
      <button
        className="buttonB"
        onClick={() => pressButton("B", "I like Broccoli")}
      >
        I Like Broccoli
      </button>
      <button className="showDiagramButton" onClick={loadData}>
        Show Diagram
      </button>

      <h3>Choose Diagram Type</h3>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      <br/>
      <br/>

      <h3>Filter by Timestamp (optional)</h3>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="datetime-local"
          value={minTime}
          onChange={(e) => setMinTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
        />
      </div>
      <br/>
      <br/>

      {chartType !== "pie" && numericData.length > 0 && (
        <>
          {chartType === "line" && (
            <LineChart width={900} height={450} data={processed}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey="love"
                stroke="green"
                name="I really Love Broccoli"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="like"
                stroke="orange"
                name="I like Broccoli"
                dot={false}
              />
            </LineChart>
          )}

          {chartType === "bar" && (
            <BarChart width={900} height={450} data={numericData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={(t) => new Date(t).toLocaleTimeString()}
              />
              <YAxis ticks={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="buttonValue"
                fill="#3399ff"
                name="Button (A=1, B=0)"
              />
            </BarChart>
          )}
        </>
      )}

      {chartType === "pie" && (
        <PieChart width={600} height={400}>
          <Tooltip />
          <Legend />
          <Pie
            data={pieData}
            cx={300}
            cy={200}
            outerRadius={150}
            dataKey="value"
            label
          >
            {pieData.map((entry, i) => (
              <Cell key={i} fill={pieColors[i]} />
            ))}
          </Pie>
        </PieChart>
      )}
    </div>
  );
};

export default CsvDiagram;
