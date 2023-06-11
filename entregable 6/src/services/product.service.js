import { productModel } from "../models/product.model.js";

class ProductService {
    constructor(){
        this.model = productModel
    }

    async getProducts(){
        return await this.model.find().lean()
    }

    async getProductsByPagination(limit = 10, page = 1, stock= false, category= false){ // <--- aca intente agregarle un parametro sort = {}
        let filter = {}
        

        if(stock){
            filter = { ...filter, stock }
        }

        if(category){
            filter = { ...filter ,category }
        }
        // const sort = { stock: 1 } <--- para ver si algo andaba mal intente sortearlos por stock, que me los sorteaba bien pero
        // despues del item con stock 20, traia los que tenian stock 4, despues los que tenian stock 5... y asi

        // if(category || stock){  <-- despues intente hacer que si existia alguno de estos dos, que los sortee por precio, pero no funciono
        //     sort = {price: 1}
        // } 

        // return  this.model.paginate(filter, {lean: true, limit, page, sort: { price: 1}}) ----> tambien intenté de esta manera, pero tampoco arroja 
        //                                                                                         los productos por precio
        return  this.model.paginate(filter, {lean: true, limit, page})
    }

    async addProduct(product){
        return await this.model.create(product)
    }

    async findProductById(prodId){
        return await this.model.findOne( { _id: prodId } )
    }

    async deleteProduct(prodId){
        return await this.model.deleteOne( { _id: prodId } )
    }
}

export const productService = new ProductService()


