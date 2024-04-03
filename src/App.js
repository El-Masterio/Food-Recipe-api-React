import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import { Details, Favorites, Home } from './pages';

function App() {
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* :id means that this value can be dynamic */}
          <Route path="/recipe-item/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
