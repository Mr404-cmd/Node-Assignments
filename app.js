const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')
const app =express ()
app.use(bodyParser.json())
random = Math.floor(Math.random()*1000)
var d= new Date();

const Joi = require('@hapi/joi');

function validate(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        gender: Joi.string().min(4).max(6).required(),
        age: Joi.number().required()
    })

    return schema.validate(data);
}

//First endpoint 

app.get('/',(req,res)=>{
    res.send("started successfully")
    res.end()
})

//store data into csv file
app.post('/uploadData', (req,res) => {
const filename="data"+d.getDate()+(d.getMonth() + 1)+d.getFullYear()+random+".csv"
    fs.appendFile(filename,'name,gender,age',(err)=>{
        if(err) throw err
        console.log('file Created')

        console.log(req.body)
        req.body.forEach( (data) => {
        
            // Validating Request Body
            let {error} = validate(data)
            if(error) return res.status(400).send(error.message)
            // Geting name,age,gender from the request body
            let { name,age,gender } = data;
    
            fs.appendFile(filename,`\n${name},${gender},${age}`, (err) => {
                if(err) throw err;
            })
        });
      
    res.send("file saved !!")
    res.end()  
    })
})
 app.get('/sort/:gender',(req,res)=>{
        fs.readFile("C:/Users/Admin1/Desktop/Shubham Demo/JavaScript/Assignment14012020/data16120201326.csv",(err,data)=>{
            if(err) throw err
            let filterd=[]
            let filter = req.params.gender
            console.log(filter)
            let s = data.toString()
            dat = s.split('\n')
            dat.forEach((ele)=>{
                let s1 =ele.split(',')
                console.log(s1)
                if(filter.toLocaleLowerCase()=="female")
                {
                    if(s1.includes("female"))
                    {
                        filterd.push(s1)
                        fs.appendFile(filename,`\n${s1}`,(err)=>{
                            if (err) throw err
                        })
                    }
                    else if(s1.includes("male"))
                    {
                        filterd.push(s1)
                        fs.appendFile(filename,`\n${s1}`,(err)=>{
                            if (err) throw err
                        })
                    }
                }
            })
        })
        res.send("Gender List")
        res.end();
 })
 
app.listen(8000,()=>{
    console.log("server is listning Port 8000 ")
})