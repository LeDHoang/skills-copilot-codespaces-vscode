//Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//parse the body of the request so we can read it
app.use(bodyParser.urlencoded({ extended: true }));

//read the comments from the file
const data = fs.readFileSync('comments.json');
const comments = JSON.parse(data);

//create the home page
app.get('/comments', (req, res) => {
    res.render('comments', { comments: comments });
});

//create a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});

//delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});

//start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});





