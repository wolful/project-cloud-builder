const ip = `ws://${location.host}/cloud-build/wss`;
class WS {
  constructor(opt) {
    this.ws = new WebSocket(ip);
    this.ws.onopen = this.open;
    this.ws.onclose = this.onclose;
    this.ws.onmessage = this.onmessage;
    this.listeners = [];
    this.opened = false;
  }

  push = (callback) => {
    this.listeners.push(callback);
  }
  
  open = () => {
    console.log('open');
    this.opened = true;
//    this.ws.send('test input url');
  }
  
  send = (message) => {
    this.ws.send(message);
  }
  
  onclose = () => {
    console.log('disconnet');
  }
  
  onmessage = (message) => {
    console.log('on message', message);
    this.listeners.forEach(listener => {
      listener(message.data);
    });
  }
}


export default WS;
