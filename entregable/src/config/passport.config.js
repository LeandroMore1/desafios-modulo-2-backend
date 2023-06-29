import passport from "passport";
import local  from "passport-local";
import GitHubStrategy from 'passport-github2';
import { userService } from "../services/user.service.js";
import { comparePassword , hashPassword } from "../utils/encrypt.util.js";

const LocalStrategy = local.Strategy

const inicializePassport = () => {

    passport.use('register', 
    new LocalStrategy(
        {usernameField: 'email', passReqToCallback: true },
        async (req, username,password,done) => {
            const {name , lastName, img} = req.body

            try{
                const user = await userService.getUserByEmail(username)
                if(user){
                    return done(null, false, {message: "user already exists"})
                }
                const hashedPass = hashPassword(password)

                const newUser = await userService.createUser({
                    name,
                    lastName,
                    email: username,
                    password: hashedPass,
                    img,
                })

                return done(null, newUser)
            } catch (err){
                done(err)
            }
        }
    ))

    passport.use('github',
    new GitHubStrategy({
        clientID: 'Iv1.cfd790055b6c718d',
        clientSecret: '0b2513a1882ab28d3ba855be1cbd999ec2041dee',
        callbackURL:
            'http://localhost:4040/api/sessions/githubcallback'
            },
            async (accessToken, refreshToken, profile, done) =>{
                try{
                    console.log(profile)
                    let user = await userService.getUserByEmail(profile._json.email)
                    if(!user){
                        const newUser = {
                            name: profile._json.name,
                            lastName: "",
                            email: profile._json.email,
                            password: "",
                            img: profile._json.avatar_url
                        }

                        user = await userService.createUser(newUser)
                        done(null, user)

                    } else {
                        done(null, user)
                    }
                } catch (err){
                    done(err, false)
                }
            }
        )
    )   

    passport.serializeUser((user,done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id,done) => {
        const user = await userService.getUserById(id)
        await userService.validateAdmin(user.email,user.password)
        done(null, user)
    })

    passport.use('login',
        new LocalStrategy(
            {usernameField: 'email'},
            async (username,password,done) =>{
                try{
                    const user = await userService.getUserByEmail(username)

                    if (!user) return done(null,false, {message: 'invalid data'})

                    if (!comparePassword(user,password)) return done(null,false, {message: 'invalid data'})

                    

                    return done(null, user);

                } catch(err){
                    done(err)
                }
            }
        )
    )
}

export default inicializePassport