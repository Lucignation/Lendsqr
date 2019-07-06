const User = require('../models/user');
const Loan = require('../models/loan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getSignup = (req, res, next) =>{
    res.render('user/signup', {
        path: '/signup',
        pageTitle: 'Sign up and to a loan in less than 10 minutes'
    })
}

/********************************************************/
    /*************GENERAL SIGNUP PAGE*******************/
/********************************************************/

exports.postSignup = async (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const bvn = req.body.bvn;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User(
        _id = Date,
        name.name = name,
        email.email = email,
        password.password = hashedPassword,
        phone.phone = phone,
        bvn.bvn = bvn
    );
    user.save();
    return res.redirect('/');
}

exports.getLogin = (req, res, next) =>{
    User.fetchAll(user =>{
        res.render('user/login', {
            path: '/',
            pageTitle: 'Login and to a loan in less than 10 minutes',
        });
    })
}

exports.postLogin = async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;


    /********************************************************/
    /******************WITH MONGOOSE************************/
    /** This middleware is an Authentification for returning USER **/
    /********************************************************/

    User.findOne({email: email})
        .then(user =>{
            if(!user){
                console.log('Your email does not exist in our database');
                return res.redirect('/');
            }
            return bcrypt.compare(password, password)
                .then(isEqual =>{
                    if(!isEqual){
                        console.log('Your password is not correct');
                        return res.redirect('/');
                    }
                    const token = jwt.sign({email: luser.email, userId: user._id.toString()},
                    'secretToken', {expiresIn: '1h'}
                    );
                    res.status(200)
                        .json(
                            {
                                message:'Successfully signed in', token: token, userId: user._id.toString()
                            }
                        );
                })
                .catch(err => console.log(err));
        })
        .catch(err =>{
            console.log(err);
        });


    /********************************************************/
    /******************WITHOUT DATABASES**********************/
    /** This middleware is an Authentification for returning USER **/
    /********************************************************/

    User.fetchAll(users =>{
        let userr = users.find(function (user){
            if(user.email !== email){
                console.log('you are not allowed!!!');
                return false;
            }else{
                console.log('You are welcome');
                return true;
            }
        });
    })
};

exports.getAvailableLoans = (req, res, next) =>{

    /******************************************************************/
    /** This middleware will save this prepopulated data given to me**/
    /*****************************************************************/

    const loan = new Loan({
        name:"Ren money",
        description:"Salary earners discounted loan",
        interest:"3%",
        amount:"50,000",
        tenure:"1.5 yrs"
    },
    {
        name:"Kia Kia",
        description:"Easy small loan",
        interest:"5%",
        amount:"5,000",
        tenure:"3 months"
    });
    // return loan.save();  //This line should be remove from comment for it to save on Mongoose

    /*****************************************************************/
    /******************WITH MONGOOSE*********************************/
    /** This middleware Loads the available Loans in the database **/
    /**************************************************************/
    Loan.find()
        .populate()
        .execPopulate()
        .then(loans =>{
            loans.forEach(loan =>{
                return res.status(200).json(loan);
            })
        })
        .catch(error => console.log(error));



    /********************************************************/
    /******************WITHOUT DATABASE**********************/
    /********************************************************/
    
    Loan.fetchAll(loans =>{
        let postLoans = [];
        for(let i = 0; i < loans.length; i++){
            postLoans.push(loans[i]);
        }
        postLoans.forEach(loann =>{
            res.render('user/user', {
                path: '/user',
                loan: loann,
                pageTitle: 'Login and to a loan in less than 10 minutes'
            
            })
        });
    });
};

exports.getLoans = (req, res, next) =>{
    res.status(200).render('user/user',{
        path: '/loans',
        pageTitle: 'Login and to a loan in less than 10 minutes'
    });
};

exports.postLoans = (req, res, next) =>{
    const name = req.body.name;
    const description = req.body.description;
    const interest = req.body.interest;
    const amount = req.body.amount;
    const tenure = req.body.tenure;
    const createdAt = new Date();
    
    const applyMonth = createdAt.getMonth();


    //Here I checked if the user has apply for any loan in past 6 months, if YES, it will return bad request.
    if(applyMonth <= (applyMonth + 6)){
        return res.status(400).json({message: 'You are not allowed to request for a new loan now'});
    }
    User.findOne('name')
        .then(user =>{
            const loan = new Loan({
                name : name,
                description: description,
                interest: interest,
                amount: amount,
                tenure: tenure,
                userId: user,
                createdAt: createdAt
            });

            return loan.save();
        })
        .catch(error => console.log(error))
};