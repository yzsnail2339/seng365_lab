const express = require('express')
const bodyParser = require('body-parser');
const data = require('./users.json');

const app = express()
app.use(bodyParser.json());

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

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201) // POST requests should return 201 if they create something
        .send(users);
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users[index] = updatedUser;
            break;
        }
    }
    res.status(200)
        .send(users);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id, 10) === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1); // Remove 1 user from the array at this index
        }
    }
    res.send(users);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Server running at http://127.0.0.1:3000/users');
});