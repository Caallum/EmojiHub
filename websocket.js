const express = require('express');


module.exports = class websocket {
  constructor() {
    this.app = express();
  }
  
  online() {
    this.app.listen(1234);
    this.app.get('/', (req, res) => {
      res.send('online');
    });
  }
}