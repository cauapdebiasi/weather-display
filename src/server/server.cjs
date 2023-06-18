const express = require('express');
const app = express();
const os = require('os');
const cors = require('cors');

app.use(cors());

app.get('/ip', (req, res) => {
    const interfaces = os.networkInterfaces();
    let ipAddress
  
    // Iterate over network interfaces
    Object.keys(interfaces).forEach((interfaceName) => {
      const addresses = interfaces[interfaceName];
      
      // Find the IPv4 address
      addresses?.forEach((address) => {
        if (address.family === 'IPv4' && !address.internal) {
          ipAddress = address.address;
        }
      });
    });
    if (!ipAddress) res.send({ip:"Não foi possível expor o ip"})
  res.send({ip:`http://${ipAddress}:5173`});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});