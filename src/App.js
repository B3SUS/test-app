import {Route, Routes} from "react-router-dom";
import './index.css';
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/product-page/:id' element={<ProductPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
