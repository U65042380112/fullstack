const express = require(`express`)
const mysql = require(`mysql2`)
const cors = require(`cors`)
require('dotenv').config();

const app = express().use(cors()).use(express.json());

const db = mysql.createConnection({
    host:process.env.DB_HOST ,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD ,
    database:process.env.DB_DATABASE
})

app.get('/',(req,res)=>{
    const sql ="SELECT worker.idworker, worker.fname, worker.lname, office.oname FROM worker INNER JOIN office ON worker.idoffice = office.idoffice;";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/office',(req,res)=>{
    const sql ="SELECT * FROM office";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.post('/create',(req,res)=>{
    const sql = "INSERT INTO worker (`idworker`,`fname`,`lname`,`idoffice`) VALUES (?)";
    const values = [
        req.body.idworker,
        req.body.fname,
        req.body.lname,
        req.body.idoffice,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("สร้างสำเร็จ");
    })
})

app.put('/update/:idworker',(req,res)=>{
    const sql = "UPDATE worker SET `fname` = ?, `lname` = ?, `idoffice` = ? WHERE idworker = ?";
    const idworker = req.params.idworker;
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.idoffice,
    ]
    db.query(sql,[...values, idworker],(err,data)=>{
        if(err) return res.json(err);
        return res.json("แก้ไขสำเร็จ");
    })
})
app.get('/update/:idworker',(req,res)=>{
    const sql = "SELECT * FROM worker WHERE idworker = ?";
    const idworker = req.params.idworker;

    db.query(sql,[idworker], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/delete/:idworker',(req,res)=>{
    const sql = "DELETE FROM worker WHERE idworker = ?";
    const idworker = req.params.idworker;
    db.query(sql,[idworker],(err,data)=>{
        if(err) return res.json(err);
        return res.json("ลบสำเร็จ");
    })
})





app.listen(5000,()=>{
    console.log("ไม่เอาแล้ว!!!")
})