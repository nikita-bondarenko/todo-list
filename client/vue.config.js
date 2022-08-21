
const { PORT } = require("../config")
console.log('port', PORT)
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: `http://localhost:${PORT}`
        }
      }
    }
  }
}


