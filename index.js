const fs = require('fs');

const user1 = 'user1',
    user2 = 'user2';

//With callbacks

function getSession (username, cb) {
    fs.readFile(process.cwd() + '/sessions.txt', (err, data) => {
       if(err) console.log(err);
       let newData = JSON.parse(data);
       cb(newData[username]);
    });
}

function getUserInfo (session, cb) {
    fs.readFile(process.cwd() + '/users.txt', (err, data) => {
        if(err) console.log(err);
        let newData = JSON.parse(data);
        cb(newData[session]);
    });
}

getSession(user1, (data) => {
    getUserInfo(data, (res) => {
        console.log(res);
        getSession(user2, (data1) => {
            getUserInfo(data1, (res1) => {
                console.log(res1);
            });
        });
    });
});

//With promises

function getSessionPromise(username) {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + '/sessions.txt', (err, data) => {
            if(err) reject(err);
            let newData = JSON.parse(data);
            resolve(newData[username]);
        });
    });
}

function getUserInfoPromise(session) {
    return new Promise((resolve, reject) => {
        fs.readFile(process.cwd() + '/users.txt', (err, data) => {
            if(err) reject(err);
            let newData = JSON.parse(data);
            resolve(newData[session]);
        });
    });
}

getSessionPromise(user1)
    .then(session => {console.log(session); return getUserInfoPromise(session);})
    .then(data => {console.log(data); return getSessionPromise(user2);})
    .then(session1 => {console.log(session1); return getUserInfoPromise(session1);})
    .then(data1 => console.log(data1))
    .catch(err => console.log(err));


