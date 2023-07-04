const express = require('express')
const app = express()


const data = require('./users.json');
const users = data.users;
console.log(users);


// app.get('/users', (req, res) => {
//     res.status(200).send(users);
// });

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let response = `No user with id ${id}`;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            response = user;
            break;
        }
    }
    res.status(200)
        .send(response);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Server running at http://127.0.0.1:3000/users');
});