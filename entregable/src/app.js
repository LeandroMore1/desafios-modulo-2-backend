import express from "express"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser";
import session from 'express-session';
import  FileStore  from 'session-file-store';
import userRouter from "./routes/user.router.js";
import MongoStore from 'connect-mongo'
import viewsRouter from "./routes/views.routers.js"
import cartRouter from "./routes/carts.router.js"
import { Server } from "socket.io"
import { productService } from "./services/product.service.js"
import mongoose from "mongoose"

const app = express()

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:"mongodb+srv://manumore42:fiona100@cluster0.gfxayke.mongodb.net/?retryWrites=true&w=majority",
            mongoOptions: {
                useNewUrlParser: true,
            },
            ttl: 600,
        }),
        secret: "secretCode",

        resave: true,
        
        saveUninitialized: true
    })
)


await mongoose.connect("mongodb+srv://manumore42:fiona100@cluster0.gfxayke.mongodb.net/?retryWrites=true&w=majority")



const productsList = await productService.getProducts()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('tokenSecret'))

const webServer = app.listen(4040,()=>{console.log("listening on port 4040...")})
const io = new Server(webServer)



app.engine('handlebars',handlebars.engine())
app.set('views', "views/")
app.set('view engine' , 'handlebars')

app.use((req, res, next) => {
    const { user } = req.session;
    if (user) {
      res.locals.user = user;
    }
    next();
  });
app.use('/',viewsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)

app.use(express.static('public'));

io.on('connection',(socket)=>{
    console.log('cliente conectado')
    socket.emit('prodsList' , productsList)
    socket.on('message', data=>{
        console.log(data)
    })

    socket.on('deleteProd',async (id)=>{
        await productService.deleteProduct(id)
    })

    socket.on('newProduct' , async (prod)=> {
        await productService.addProduct(prod)
    })
})

