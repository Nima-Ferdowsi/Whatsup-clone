const passport = require("passport");
const { Strategy } = require("passport-local");

const passportConfig = (passport,getemail,getUserById) => {
    const passportCallback=(email,password,done)=>{
       const user= getemail(email)

       if(!user){
           return done(null,false,'No Account Found ')
       }
       try {
        if(password===user.password){
            return done(null ,false,'Email Or Password Are Incorrect')
        }
        else{
            return done(null,user)
        }
       } catch (error) {
           return done (error)
       }



    }
  passport.use(new Strategy({ usernameField: "email" }, passportCallback()));
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
};


module.exports=passportConfig