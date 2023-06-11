import express from "express"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.routers.js"
import cartRouter from "./routes/carts.router.js"
import { Server } from "socket.io"
import { productService } from "./services/product.service.js"
import mongoose from "mongoose"
import { cartService } from "./services/cart.service.js"


await mongoose.connect("mongodb+srv://manumore42:fiona100@cluster0.gfxayke.mongodb.net/?retryWrites=true&w=majority")



const productsList = await productService.getProducts()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const webServer = app.listen(4040,()=>{console.log("listening on port 4040...")})
const io = new Server(webServer)



app.engine('handlebars',handlebars.engine())
app.set('views', "views/")
app.set('view engine' , 'handlebars')


app.use('/',viewsRouter)
app.use('/api/carts', cartRouter)

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

