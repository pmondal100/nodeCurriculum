const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

let userData = [];

(async function () {
    userData = await fs.promises.readFile('./data-files/userData.json', 'utf-8');
    userData = JSON.parse(userData);
})();

router.get('/getData', (req, res) => {
    res.send(userData);
})

router.post('/addUser', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const password = 'password';
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = { userName: 'prabhakar', password: hashedPassword };
        userData.push(user);
    }
    catch(e){
        res.status(500);
        res.send('Some internal server error');
        return;
    }
    
    await fs.promises.writeFile('./data-files/userData.json', JSON.stringify(userData));

    res.set({
        "Content-Type": "text/html",
    });
    res.send('<h2>User created successfully</h2>');
})

router.post('/login', jsonParser, async (req, res) => {

    
    const user = userData.find((currUser) => {
        return currUser.userName === req.body.userName;
    })

    if(user !== null && user !== undefined){
        try{
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            res.set({
                'Content-Type': 'text/html'
            })
            if(isPasswordCorrect){
                res.send('<h2>Success</h2>');
                return;
            }else{
                res.send('<h2>Failed</h2>');
                return;
            }
        }
        catch(e){
            res.send('SOME ERROR!!!');
            return;
        }
    }else{
        res.send('<h2>User does not exist.</h2>')
        return;
    }
})

module.exports = router;
