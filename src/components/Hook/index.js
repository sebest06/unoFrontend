import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './hook.module.css';
import Carta from './../Carta';
//const BaseURL = "https://juego-uno.herokuapp.com";
//const BaseURL = "http://192.168.54.101:8000";


export const Hook = () => {
  const params = useParams();
  const [status, setStatus] = useState("idle");
  const [hand, setHand] = useState([]);
  const [pila, setPila] = useState([]);
  const [score, setScore] = useState([]);
  const [nombre, setNombre] = useState();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    console.log(params);
  }
  )  ;

  const getCardImg = (card_id) => {
    card_id = card_id % 52;
    const salida = -100 * (card_id % 10) + "px " + -150 * (Math.trunc(card_id / 10)) + "px";
    return salida;
  }

  const updateHand = React.useCallback((data) => {
    const parsedData = JSON.parse(data);
    const playerHand = parsedData["players"].find(element => Number(element['id']) === Number(params.id));
    setHand(playerHand["cartas"]);
    setNombre(playerHand["nombre"]);
    setPila(parsedData["pila"]);
    let scores = [];
    parsedData["players"].forEach(element => scores.push({ nombre: element['nombre'], cartas: element['cartas'].length, uno: element['uno'] }));
    setScore(scores);
    /*var salida = logs;
    salida.push(parsedData["last"]);
    if(salida.length > 10) {salida.shift();}
    setLogs((state) => (salida));*/
  }, [params, logs]);

  const handleClickPickOut = (card) => {
    setStatus("idle");
    fetch(`http://${params.server}/hand?id=` + params.id + `&card=` + card, { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => console.log(result))
      .catch((err) => setStatus("rejected"));
  }

  const handleClickPickUp = () => {
    setStatus("idle");
    fetch(`http://${params.server}/hand?id=` + params.id + `&rise=1`, { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => console.log(result))
      .catch((err) => setStatus("rejected"));
  }

  const handleClickUno = () => {
    setStatus("idle");
    fetch(`http://${params.server}/hand?id=` + params.id + `&uno=1`, { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => console.log(result))
      .catch((err) => setStatus("rejected"));
  }

  const handleClickMezclar = () => {
    setStatus("idle");
    fetch(`http://${params.server}/mezclar?id=` + params.id, { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => console.log(result))
      .catch((err) => setStatus("rejected"));
  }
  const handleClickDeshacer = () => {
    setStatus("idle");
    fetch(`http://${params.server}/back?id=` + params.id, { method: "GET" })
      .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
      .then((result) => console.log(result))
      .catch((err) => setStatus("rejected"));
  }

  useEffect(() => {
    const eventSource = new EventSource(`http://${params.server}/handhook`);
    eventSource.onmessage = (e) => updateHand(e.data);
    return () => {
      eventSource.close();
    };
  }, [updateHand]);

  return (
    <div className="game">
      <div className={styles.pila}>

        <div className={styles.pilacartas}>
          <div className={styles.card} onClick={() => handleClickPickUp()}><Carta card_id="-1" /></div>
        </div>
        <div className={styles.c1}>
          {
            pila.map((value, index) => (
              <div className={styles.card}><Carta card_id={value.card} /></div>
            ))
          }

        </div>
        <div className={styles.ranking}>
          <table>
            <tbody>
              <tr>
                <th>Nombre</th>
                <th>Cartas</th>
              </tr>
              {
                score.map((value, index) => (
                  <tr key={index} className={value["uno"] === true ? "uno" : "none"}>
                    <td className={value["nombre"] === nombre ? "me" : "none"}>{value["nombre"]}</td>
                    <td>{value["cartas"]}</td>
                  </tr>
                ))

              }
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.mano}>
        <ul>
          {
            hand.map((value, index) => (
              <li key={index} onClick={() => handleClickPickOut(value)}><Carta card_id={value} /></li>
            ))
          }
        </ul>
      </div>

      <div className={styles.botones}>

        <button onClick={() => handleClickUno()}>
          UNO!
        </button>

        <button onClick={() => handleClickDeshacer()}>
          Deshacer
        </button>

        <button onClick={() => handleClickMezclar()}>
          Mezclar
        </button>



      </div>
      <div>{status}</div>
    </div>
  );
}

export default Hook;

/*

*/