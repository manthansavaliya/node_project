require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./router/index.js');

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome To DataPost Website.')
})
app.use('/', routes);

const PORT = process.env.PORT ?? 3002;
app.listen(PORT, () => {
    require('./database/db.js');
    console.log(`Server Is Start On PORT ${PORT}.`);
});


