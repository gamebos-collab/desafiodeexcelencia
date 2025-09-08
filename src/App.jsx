// src/App.jsx
import Router from "./Router";
import Footer from "./components/Footer/Footer"; // se existir

function App() {
  return (
    <div className="app-container">
      <Router />
      <Footer />
    </div>
  );
}

export default App;
