import { productModel } from "../models/product.model.js";

class ProductService {
    constructor(){
        this.model = productModel
    }

    async getProducts(){
        return await this.model.find()
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

const find = async () =>{
    try{
        const find = await productService.getProducts()
        return console.log(await find)
    } catch(err){

    }

    
}

