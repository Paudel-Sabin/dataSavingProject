const express=require('express');
const app=express();
const mysql=require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
let connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'node'
});

connection.connect(()=>{
  console.log("Connection Sucessful..........");
})

app.get("/",(req,res)=>{
  res.render('index');
});

app.post("/insert",(req,res)=>{
  let name=req.body.name;
  let email=req.body.email;
  let password=req.body.password;


  let sql=`insert into users(name,email,password) values('${name}','${email}','${password}')`;

  connection.query(sql,function(err,results){
    if(err) throw err;
    res.redirect("/show");
  });
});

app.get('/show',(req,res)=>{
  let sql="select * from users";
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.render('show.ejs',{user:results});
  });  
})

app.get("/delete/:id",(req,res)=>{
    let id = req.params.id;
    let sql=`delete from users where id='${id}'`;
    connection.query(sql,function(err,results){
      if(err) throw err;
      res.redirect('/show');
    });
});

app.get("/edit/:id",(req,res)=>{
  let id = req.params.id;
  let sql=`select * from users where id='${id}'`;
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.render('edit',{user:results});
  });
});

app.post('/update/:id',(req,res)=>{
  let id = req.params.id;
  let name=req.body.name;
  let email=req.body.email;
  let password=req.body.password;

  let sql=`UPDATE users SET name='${name}', email='${email}', password='${password}' WHERE id='${id}'`;
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.redirect('/show');
  });
});

app.listen(4003,()=>{
  console.log('Started at 4003');
});
