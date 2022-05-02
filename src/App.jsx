import React from 'react';
import WS from './common/websocket';
import { Terminal } from 'xterm';

var xterm = new Terminal({
  cols: 100,
  rows: 135,
  cursorBlink: 5,
  scrollback: 300,
  tabStopWidth: 2,
  rendererType: 'dom'
});


const ws = new WS();

export default class extends React.Component {

  componentDidMount() {
    xterm.open(document.getElementById('term'));
    setTimeout(() => {
      // ws.send('component did mount');
      ws.push(this.onReceiveWsMessage);
    }, 3000);
  }

  onInput = (e) => {
    this.inputValue = e.target.value;
  }
  
  onSubmit = (e) => {
    console.log('send value', this.inputValue);
    ws.send(this.inputValue);
  }

  onReceiveWsMessage = (message) => {
    console.log('fe receive message', message);
    // document.getElementById('code').textContent += message + '\n';
    xterm.write(message.replace(/\n/g, '\n\r'));
    xterm.write('\n\r');
  }

  render() {
    return (
      <div>
	      <input onInput={this.onInput} className="input" />
        <button onClick={this.onSubmit} className="submit-btn">开始构建</button>
        <div id="term"></div>
      </div>
    );
  }
}
