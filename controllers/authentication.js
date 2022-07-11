const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');

let userData = [];

(async function () {
    userData = await fs.promises.readFile('./data-files/userData.json', 'utf-8');
    userData = JSON.parse(userData);
})();

router.get('/getData', (req, res, next) => {
    res.send(userData);
})

router.post('/addUser', async (req, res, next) => {
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

module.exports = router;