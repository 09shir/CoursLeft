import { Routes, Route } from "react-router-dom"
import './App.css';
import Page from './pages/Page';

function App() {
  return (
    <div className="Page">
      <Routes>
        <Route path="/" element={<Page />}/>
      </Routes>
    </div>
  );
}

export default App;
