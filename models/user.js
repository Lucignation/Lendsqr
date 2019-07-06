/********************************************************/
  /******************WITHOUT DATABASE************/
/********************************************************/

const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'users.json'
);

const getUsersFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User{
    constructor(_id, name, email, password, bvn, phone){
        this._id = new Date();
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.bvn = bvn;
    }

    save() {
        getUsersFromFile(users => {
          users.push(this);
          fs.writeFile(p, JSON.stringify(users), err => {
            console.log(err);
          });
        });
      }
    
      static fetchAll(cb) {
        getUsersFromFile(cb);
      }
    };

    /********************************************************/
    /******************WITH MONGOOSE*************************/
    /********************************************************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  bvn:{
    type: Number,
    required: true
  },
  loan :{
    type: Schema.Types.ObjectId,
    ref: 'loan'
  }
});

module.exports = mongoose.model('Users', userSchema);
    