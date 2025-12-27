const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')

const DB_create = require('./db')
DB_create();

const app = express();
app.use(express.json());

app.use(cors());

const atm_con = require('./controller/atm_controller')

app.post('/create', atm_con.create);
app.get('/find_pass/:pass', atm_con.findPass)
app.get('/find_bal/:bal', atm_con.findBal)
app.put('/update_Withdraw/:id',atm_con.updateWithdraw)

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/test', (req, res) => {
    res.send("Test route");
});


const PORT = process.env.PORT || 5018;


app.listen(PORT, () => {
    console.log("Server Created")
})

