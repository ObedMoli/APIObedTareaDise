import data from '../Db_JsonTienda/Productos.json' with {type: 'json'}
const productos = data.productos;
export default class ProductosControllers{


    static getAll=(req,res)=>{
            res.json(productos)
        }
//Devuelve los productos marcados como disponibles
   static ObtenerProductosDisponibles = (req, res) => {
        const disponibles = productos.filter(producto => producto.disponible === true);
        res.json(disponibles);
    };
    static ObtenerProductoID = (req, res) => {
        const { id } = req.params
        const parsedId = Number(id) 
        if (isNaN(parsedId)) {
            res.status(400).json({
                message: 'El id debe ser un número'
            })
        }
        const producto = productos.find(({ id }) => {
            return id === parsedId
        })
        if (!producto) {
            res.status(404).json({
                message: 'El producto no existe'
            })
        }

        res.json(producto)

    }
    


// Crear un nuevo producto
  static CrearProducto = (req, res) => {
    const { nombre, precio, categoria, descripcion, disponible } = req.body;

    if (!nombre || !precio || !categoria || !descripcion || disponible === undefined) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const nuevoProducto = {
      id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
      nombre,
      precio: parseFloat(precio),
      categoria,
      descripcion,
      disponible,
      fecha_ingreso: new Date().toISOString()
    };

    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
  };

  // Actualizar un producto existente
  static ActualizarProductos = (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, precio, categoria, descripcion, disponible } = req.body

    const productoIndex = productos.findIndex(p => p.id === id)

    if (productoIndex === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    productos[productoIndex] = {...productos[productoIndex],
      nombre: nombre ?? productos[productoIndex].nombre,
      precio: precio ?? productos[productoIndex].precio,
      categoria: categoria ?? productos[productoIndex].categoria,
      descripcion: descripcion ?? productos[productoIndex].descripcion,
      disponible: disponible ?? productos[productoIndex].disponible
    }

    res.json(productos[productoIndex])
  }

  // Eliminar un producto
  static EliminarProducto = (req, res) => {
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id)

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
        

    productos.splice(index, 1) // modifica el array original
    return res.status(200).json({message:'Producto Eliminiado'})
  }

}

