import { Router } from 'express'
import ProductosController from '../Controllers/productos.controllers.js'


const ProductosRouter= Router()

ProductosRouter.get('/',(req,res)=>{

    ProductosController.getAll(req,res)

})
export default ProductosRouter