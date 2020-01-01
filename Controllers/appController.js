var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app,db){

    const collection = db.collection('loginDetails')

    app.get('/',function(req,res){
        console.log("home page requested ")
        res.render('index')
    })

    app.get('/login', function(req,res){
        console.log("login called for get")
        res.render('login',data={message:null})
    })

    app.get('/signup',function(req,res){
        console.log("signup called for get")
        res.render('signup',data={message:null})
    })

    app.post('/login',urlencodedParser,function(req,res){
        //res.render('todo',{todos:data})
        console.log("post for login called")
        var request = req.body
        const email = request.email
        const password = request.password

        collection.findOne({email: email})
        .then(user =>{
            if(user)
            {
                if(user.password === password){
                    console.log("user found with details ",user)
                    res.render('logged',data={name: user.name})
                }
                else{
                    console.log("please enter correct password")
                    res.render('login', data={message:"Please enter correct password"})
                }
            }
            else
            {
                console.log("Errr: user not found with the mentioned email id")
                res.render('signup', data={message:"Email id not registered with us.!! Please sign up"})
            }
        })
        .catch(err =>{
            console.error("error occured : ", err)
        })
    })

    app.post('/signup',urlencodedParser,function(req,res){
        console.log('post called for signup')

        var request = req.body
        const name = request.name
        const email = request.email
        const password = request.password

        const newUser = {
            "name" : name,
            "email" : email,
            "password": password
        }

        collection.insertOne(newUser)
        .then(user => {
            console.log("User saved successfully ", user.insertedId)
            res.render('logged',data={name: name})
        })
        .catch(err =>{
            console.error("failed to insert user ", err)
            res.render('failure')
        })
    })

}