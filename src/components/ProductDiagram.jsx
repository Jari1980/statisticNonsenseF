import { useEffect, useState } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ProductDiagram() {
  const [products, setProducts] = useState([]);
  const [selectedChart, setSelectedChart] = useState("donut");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api") // Backend endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ---------------------------------------------------
  // Scatterplot data (price vs quantity)
  // ---------------------------------------------------
  const scatterData = products.map((p) => ({
    price: p.price,
    quantity: p.quantity,
    name: p.name,
  }));

  // ============================================================
  // 2. HISTOGRAM:
  //    X-axis = price ranges
  //    Y-axis = total quantity for that range
  // ============================================================
  const ranges = [
    { label: "0-50", min: 0, max: 50 },
    { label: "51-100", min: 51, max: 100 },
    { label: "101-150", min: 101, max: 150 },
    { label: "151-200", min: 151, max: 200 },
    { label: "200+", min: 201, max: Infinity },
  ];

  const histogramData = ranges.map((r) => {
    const totalQty = products
      .filter((p) => p.price >= r.min && p.price <= r.max)
      .reduce((sum, p) => sum + p.quantity, 0);

    return {
      priceRange: r.label,
      totalQuantity: totalQty,
    };
  });

  // ---------------------------------------------------
  // Donut chart data
  // ---------------------------------------------------
  const donutData = products.map((p) => ({
    name: p.name,
    quantity: p.quantity,
  }));

  // ---------------------------------------------------
  // Column chart data (total value)
  // ---------------------------------------------------
  const barData = products.map((p) => ({
    name: p.name,
    value: p.price * p.quantity,
  }));

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  // ---------------------------------------------------
  // Render function for selected chart
  // ---------------------------------------------------
  const renderChart = () => {
    switch (selectedChart) {
      case "donut":
        return (
          <>
            <h2>Donut Chart: Product Quantities</h2>
            <PieChart width={500} height={350}>
              <Pie
                data={donutData}
                dataKey="quantity"
                nameKey="name"
                outerRadius={120}
                innerRadius={60}
                label
              >
                {donutData.map((entry, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </>
        );

      case "scatter":
        return (
          <>
            <h2>Scatterplot: Price vs Quantity</h2>
            <ScatterChart width={600} height={350}>
              <CartesianGrid />
              <XAxis dataKey="price" name="Price" />
              <YAxis dataKey="quantity" name="Quantity" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </>
        );

      case "histogram":
        return (
          <>
            <h2>Histogram: Total Quantity per Price Range</h2>
            <BarChart width={650} height={350} data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priceRange" />
              <YAxis dataKey="totalQuantity" />
              <Tooltip />
              <Bar dataKey="totalQuantity" fill="#82ca9d" />
            </BarChart>
          </>
        );

      case "column":
        return (
          <>
            <h2>Column Chart: Total Value per Product</h2>
            <BarChart width={600} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ff8042" />
            </BarChart>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Diagram</h1>

      {/* Chart Selector */}
      <label>
        Select a chart:{" "}
        <select
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          <option value="donut">Donut Chart (Quantity)</option>
          <option value="scatter">Scatterplot (Price vs Quantity)</option>
          <option value="histogram">Histogram (Price Groups)</option>
          <option value="column">Column Chart (Total Value)</option>
        </select>
      </label>

      <div style={{ marginTop: "30px" }}>{renderChart()}</div>
    </div>
  );
}
