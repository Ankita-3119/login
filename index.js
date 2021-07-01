const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const app = express();
const ports = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "posts"
})

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('database connected');
    }
})




app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    db.query("SELECT * FROM users where email = ? ", [email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if (result.length > 0) {
                return res.send("User already exist");
            } else {
                db.query("INSERT INTO users (name , email , password) values (?,?,?)", [name, email, password], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.send("User registration success!");
                    }
                })
            }
        }
    })
})


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                if (result[0].password !== password) {
                    return res.send("Password is incorrent");
                } else {
                    return res.send('Login success');
                }
            } else {
                return res.send('User not found! Please Check your email');
            }
        }
    })
})


app.listen(ports, () => console.log(`Listening on port ${ports}`));
