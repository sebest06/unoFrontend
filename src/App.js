import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
import Hook from './components/Hook';
import Config from './components/Config';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  //
  const value = params.id; // "some_value"
  const servidor = params.server;

  if(value)
  {
    return (
      <div className="App">
        <Hook userid={value} servidor={servidor}></Hook>
      </div>
    );
  }

  return (
    <div className="App">
      {value 
        ? <Hook userid={value} servidor={servidor}></Hook>  
        : <Config></Config>
      }
    </div>
  );
}

/*
  <Router>
    <Routes>
      <Route path="/" element={<Config />} />
      <Route path="/play/:id/server/:server" element={<Hook></Hook>} />
    </Routes>
  </Router>
*/

export default App;
