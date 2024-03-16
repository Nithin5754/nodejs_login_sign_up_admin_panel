const path = require('path')



const notFoundMIddleWare = (req, res) => {
  const filePath = path.join(__dirname, '../public', 'index.html');
  res.status(404).sendFile(filePath)

  // res.send("error occur <a href='/login'>back to login page</a>")
}

module.exports = notFoundMIddleWare




