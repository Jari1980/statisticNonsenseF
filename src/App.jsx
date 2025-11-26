import CsvDiagram from "./components/CsvDiagram";
import Product from "./components/Product";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          alignItems: "center"
        }}
      >
        <h1>Statistic Nonsense</h1>
        <CsvDiagram />
        <hr style={{ width: "100%", border: "1px solid #ccc" }} />
        <Product />
      </div>
    </>
  );
}

export default App;
