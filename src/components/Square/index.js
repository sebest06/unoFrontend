import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './square.module.css';

/*export class Square extends React.Component {

    render() {
      return (
        <button className={styles.square} onClick={() => this.props.onClick() } >  
          {this.props.value}
        </button>
      );
    }
  }
*/

function Square(props) {
  return (
    <button className={styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  export default Square;