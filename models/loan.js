const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'loan.json'
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

module.exports = class Loan{
    constructor(_id, name, description, interest, amount, tenure){
        this._id = new Date();
        this.name = name;
        this.description = description;
        this.interest = interest;
        this.amount = amount;
        this.tenure = tenure;
    }

    save() {
        getUsersFromFile(loans => {
          loans.push(this);
          fs.writeFile(p, JSON.stringify(loans), err => {
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

const loanSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  tenure:{
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  timestamp
});

module.exports = mongoose.model('Loan', loanSchema);
    