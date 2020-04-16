import React from 'react';
import { Context, SnakeGame } from 'react-game-snake';
import { connect } from 'react-redux';
import axios from 'axios';

const sendScore = (props) => {
  const { nickname, token } = props.options.user;

  if (nickname === 'guest' || token.accessToken === '') {
    return;
  }

  const config = {
    headers: { Authorization: token.accessToken },
  };
  axios
    .post(
      'http://13.209.41.64:4100/scores/scores',
      { gameTitle: 'Snake', score: props.game.points },
      config,
    )
    .then(alert(`You loosed with ${props.game.points} points.`))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const Snake = (props) => {
  return (
    <div>
      <SnakeGame
        user={props}
        colors={{
          field: '#bdc3c7',
          food: '#9b59b6',
          snake: '#3498db',
        }}
        countOfHorizontalFields={50}
        countOfVerticalFields={30}
        fieldSize={15}
        loopTime={200}
        pauseAllowed={true}
        restartAllowed={true}
        onLoose={sendScore}
        onPause={(context: Context) => alert('paused')}
        onRestart={(context: Context) => alert('restarted')}
        onResume={(context: Context) => alert('onResume')}
        onWin={(context: Context) =>
          alert(`You won with ${context.game.points} points.`)
        }
      />
      {console.log()}
      {/* <button type="button" onClick={()=>}>Start</button> */}
      <button type="button">Pause</button>
      <button type="button">Resume</button>
    </div>
  );
};

function mapReduxStateToReactProps(state) {
  return {
    nickname: state.nickname,
    token: state.token,
  };
}

export default connect(mapReduxStateToReactProps)(Snake);
