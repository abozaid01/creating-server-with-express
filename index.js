const { read, write } = require("./storage");
const express = require("express");

const app = express();

app.use(express.json()); //parse json post requests

//route
// app.use((req,res)=>{
//     res.send("hello")
//     console.log("we got a get request!");
// })

// const users = [
//     {id:1001, name:"Ahmed", Age:33,isAdmin:false},
//     {id:1002, name:"Huessin", Age:33,isAdmin:false},
//     {id:1003, name:"sara", Age:33,isAdmin:true},
// ]

//===========get=======================
app.get("/users", async (req, res) => {
    console.log("we got a get request!");
    let users = await read("data.json");
    res.json(JSON.parse(users));
});
//=====================================

//============Post===================
app.post("/users", async (req, res) => {
    console.log("we got a post request!");

    let text = await read("data.json");
    let users = JSON.parse(text);

    let user = req.body;

    let ids = users.map((u) => u.id);

    if (ids.length > 0) user.id = Math.max(...ids) + 1;
    else user.id = 1001;

    users.push(user);

    await write("data.json", JSON.stringify(users));
    res.json({ message: "user created successfully" });
});
//=========================================

//============delete=======================
app.del("/users", async (req, res) => {
    console.log("we got a delete request!");

    let text = await read("data.json");
    let users = JSON.parse(text);
    let ids = users.map((u) => u.id); //[1001,1002,1003,...]

    let user = req.body; //[{id = 1004}]

    //find index of deletd id
    const id = ids.findIndex((e) => e == user.id);

    // check if the id is exist
    if (id === -1) {
        res.json("id not found!");
        return;
    }

    //delete user by deleting its id index
    users.splice(id, 1);

    await write("data.json", JSON.stringify(users));
    res.json({ message: "user deleted successfully" });
});
//============================================

// app.get("/users/1002",(req,res)=>{
//     console.log("we got a get request!")
//     res.json(users.find((item)=>{
//         return item.id==1002
//     }))
// })

app.listen(3000, () => {
    console.log("Listening on port 3000 ...");
});

//npm run test

// const greeting = (name)=>{
//     if(!name)
//         throw new Error("missing name")
//     let message = [
//         `welcome Mr. ${name}`,
//         `Have a nice day Mr. ${name}`,
//         `Good afternoon, ${name}`,
//         `Hi, ${name}`
//     ]
//     let rand = random()
//     while(rand>= message.length)
//         rand = random()
//     console.log(message[rand])
// }

// const random= ()=>{
//     return Math.round(Math.random()*10)
// }
// const { throws } = require("assert")
// let args = process.argv
// name = args.slice(2)
// for(e of name)
//     greeting(e)

// function read(fileName){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve("SUCESS!!")
//         },3000)
//     })
// }

// // read("ay7aga").then((result)=>console.log(result))
// read("ay7aga").then(console.log)

// const {readFile} = require("fs")

// readFile("file.txt","utf-8",(err, content)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log(content)
// })

// function readPromis(fileName) {
//     return new Promise((resolve,reject)=>{
//         readFile(fileName,"utf-8",(err, content)=>{
//             if(err)
//                 reject(err);
//             else
//                 resolve(content)
//         })
//     })
// }

// readPromis("file.txt").then(console.log).catch(console.log)

// const {write} = require("./storage")

// let s = process.argv.slice(2)
// // s = greeting(s)
// write("file.txt",s)

// const joke = require('give-me-a-joke');

// const color = require("colors")
// console.log("hello".rainbow.underline)

// To get a random dad joke
// joke.getRandomDadJoke((joke)=> console.log(joke.rainbow));
