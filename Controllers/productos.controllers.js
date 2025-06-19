import productos from '../Db_JsonTienda/Productos.json' with {type:'json'}

export default class ProductosControllers{


    static getAll=(req,res)=>{
        res.json(productos)
    }






}

