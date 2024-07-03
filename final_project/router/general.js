const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
      resolve(JSON.stringify(books,null,4))
    })
    
    myPromise.then((successMessage) => {
    res.send(successMessage)
  })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn_search = req.params.isbn;
    
    let myPromise = new Promise((resolve,reject) => {
      resolve(JSON.stringify(books[isbn_search],null,4))
    })
    
    myPromise.then((successMessage) => {
    res.send(successMessage)
  })
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
   const get_author = req.params.author

    let myPromise = new Promise((resolve,reject) => {
      listofbooks = [];
        for (let i = 0; i < Object.keys(books).length; i++) {
            if (books[i]?.author == get_author) {
            listofbooks.push(books[i]);
    }
  }   
        resolve(JSON.stringify(listofbooks,null,4))
    })
    
    myPromise.then((successMessage) => {
    res.send(successMessage)
  })

}
);

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const get_title = req.params.title

    let myPromise = new Promise((resolve,reject) => {
      listofbooks = [];
        for (let i = 0; i < Object.keys(books).length; i++) {
            if (books[i]?.title == get_title) {
                listofbooks.push(books[i]);
    }
  }  
        resolve(JSON.stringify(listofbooks,null,4))
    })
    
    myPromise.then((successMessage) => {
    res.send(successMessage)
  })

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const get_isbn = req.params.isbn
    res.send(books[get_isbn]["reviews"]);
});

module.exports.general = public_users;
