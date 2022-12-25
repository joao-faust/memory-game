import React, { Fragment } from 'react';

export default function GameOver(props) {
  return (
    props.show ? 
    <div id='gameOver'>
      <div>Congratulations you completed the game</div>
      <div>
        <button id='restart' onClick={props.handleRestart}>      
          Play again
        </button>
      </div>
    </div> : <Fragment />
  );
}
