var express = require('express');
var path = require('path');
var app=express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'hj11018210045',
    password: 'Babo$@123',
    database: 'mytable'
  });
  
  connection.connect();
  
  app.get('/get-users',(req,res)=>{
  
    connection.query('SELECT username FROM Users where username=?',['hj123'], (error,results)=>{
      if (error) throw error
      mod_res = JSON.parse(JSON.stringify(results))
      req.session.data = mod_res[0].username
      var temp;
      console.log(temp)
      res.send(results);
    })
  })
  
  app.post('/post-users',(req,res)=>{
    const name= req.body.username;
    const Age=req.body.Age
    const password= req.body.password;
    const gender=req.body.gender;
    connection.query('INSERT INTO Users (username,password,gender,Age) VALUES (?, ?, ?, ?)', [name,password,gender,Age],(error,results)=>{
      if(error) throw error
  
      res.send(results)
      
    })
  })
  
  app.delete('/users/:username',(req,res)=>{
    const username=req.params.username;
    connection.query('DELETE FROM Users WHERE username=?', [username],(error,results)=>{
      if (error) throw error
  
      res.send(results)
    })
  })
  
  
  app.post('/login-users',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    connection.query('SELECT username,password FROM Users WHERE username=? and password=?',[username,password], (error,results)=>{
    if (error) {throw error}
    res.send(results);
    })
  })
try {
    connection.connect();
    console.log('Database connected');
} catch (error) {
    console.log('Error connecting to database', error);
}


app.post('/signup/therapist', (req, res) =>{
    const name = req.body.Name;
    const gender = req.body.Gender;
    const language = req.body.Language;
    const state = req.body.State;
    const experience = req.body.Experience;
    const charges = req.body.Charges;
    const qualifications = req.body.Qualifications;
    const email = req.body.Email;
    const password = req.body.Password;
    connection.query("INSERT INTO Therapist (Name, Gender, Language, State, Experience, Charges, Qualifications, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, gender, language, state, experience, charges, qualifications, email, password], (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});


app.get('/therapist', (req, res) => {
    connection.query("SELECT * FROM Therapist", (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});


app.delete('/therapist/delete/:id', (req,res) => {
    const id = req.body.id;
    connection.query("DELETE FROM Therapist WHERE id = ?", [id], (error,result) => {
        if(error) throw error;
        res.send(result);
    })
})


app.get('/login/therapist', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    connection.query("SELECT * FROM Therapist WHERE Email = ? and Password = ?", [email, password], (error, therapist) => {
        if (error || !therapist){
            //res.send("Invalid email or password");
            //console.log("Invalid email or password");
        }
        res.send(therapist);
    });
})



const PORT = process.env.PORT || 3200;
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});
app.listen(3000,function(){
    console.log("3000");
});



