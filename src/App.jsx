import { useState } from "react";
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
import CsvDiagram from "./components/CsvDiagram";

function App() {
  

  return (
    <>
    <h1>Statistic Nonsense</h1>
    <CsvDiagram />
    </>
  );
}

export default App;
