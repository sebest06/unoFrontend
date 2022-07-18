import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const BaseURL = "http://192.168.54.101:8000";

export class Maso extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }

    updateHand(data)
    {
        console.log(data);
    }

    handleClick(i) {
        var array = this.state.cards.slice(); 
        delete array[i];
        this.setState({
            cards: array
        });
    }

    render() {
        const moves = "";        
        /*const card = this.state.cards;
        const moves = card.map((carta, move) => {
            return (
                <li key={move} onClick={() => this.handleClick(move)}> 
                {carta}
                </li>
            );
        });
        */
        return (
            <ol> { moves }</ol>
        );
    }
}

function Webhook(id){
    const [status, setStatus] = useState("idle");
    const [stockPrices, setStockPrices] = useState([]);

    const updateStockPrices = (data) => {
      const parsedData = JSON.parse(data);
      setStockPrices((stockPrices) =>
        [...stockPrices].map((stock) => {
          if (stock.id === parsedData.id) {
            return parsedData;
          }
          return stock;
        })
      );
    };

    useEffect(() => {
      const eventSource = new EventSource(`${BaseURL}/hand?id=` + id);
      eventSource.onmessage = (e) => updateStockPrices(e.data);
      return () => {
        eventSource.close();
      };
    }, []);
    return (
          <tbody>
            {stockPrices.map(({ id, ticker, price }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{ticker}</td>
                <td>{price}</td>
              </tr>
            ))}
          </tbody>

    );
};

export default Maso;

