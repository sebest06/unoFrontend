import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet
  } from "react-router-dom";

//const BaseURL = "https://juego-uno.herokuapp.com";
//const BaseURL = "http://192.168.54.101:8000";


export const Config = (props) => {
  const [status, setStatus] = useState("idle");
  const [inputboxes, setInputboxes] = useState([]);
  const [players, setPlayers] = useState([]);
  const [cartas, setCartas] = useState(React.createRef());
  const [urlServer, setUrlServer] = useState(React.createRef());

  const createInputBoxes = (nro) => {
    var mapInput = [];
    var total = nro;

    while (nro > 0) {
      mapInput.push({ id: ( (( total - nro ) * 1000) + getRandomArbitrary(1, 1000)), nombre: React.createRef() });
      nro--;
    }
    setInputboxes(mapInput);
  }

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const startGame = () => {
    var moves = inputboxes.reduce((acc, value) => {
      acc = acc + "player[" + value["id"] + "]=" + value["nombre"].current.value + "&";
      return acc;
    }, "");
    moves += "cartas=" + 56*cartas.current.value;
    setStatus("idle");
    console.log(urlServer.current.value);
    fetch(`http://${urlServer.current.value}/newgame?` + moves, { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => console.log(result))
      .catch((err) => setStatus("rejected"));
  }

  return (
    <div className="config">
      <p>Server: <input id="server" label="server" variant="server" ref={urlServer} /></p>
      <p>Masos: <input id="cartas" label="cartas" variant="cartas" ref={cartas} /></p>
      <p>Players: <input id="players" label="players" variant="players" onChange={(text) => createInputBoxes(text.target.value)} /></p>
      {
        inputboxes.map((value, index) => (
          <p key={index}>Jugador {index}: <input id={"player[" + value["id"] + "]"} ref={value["nombre"]} /><a href={window.location.href + "?id=" + value["id"] + "&server=" + urlServer.current.value}>Play!</a></p>
        ))
      }
      <button onClick={() => startGame()}>
        Empezar
      </button>
      <p> Install your local server in your cellphone. Use Termux</p>
      <p>https://github.com/sebest06/unoBackend</p>
    </div>
  );
}

export default Config;