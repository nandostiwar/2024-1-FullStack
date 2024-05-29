const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;
const Usuario = require('../db/usuarios');
const Producto = require('../db/productos');
const Pedido = require('../db/pedidos');
const Venta= require('../db/ventas');



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario Incorrecto" });
        }

        // Verificar la contraseña
        if (usuario.password !== password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Autenticación exitosa
        res.status(200).json({ mensaje: "Autenticación exitosa", usuario, rol: usuario.rol });

    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};



const crearUsuario = async (req, res) => {
  try {
      const { username, password, rol } = req.body;

      // Verificar si el rol proporcionado es "admin" y ajustarlo a "administrador"
      const nuevoRol = (rol.toLowerCase() === "admin") ? "administrador" : rol;

      // Crear un nuevo documento de usuario con los datos proporcionados
      const nuevoUsuario = new Usuario({
          username,
          rol: nuevoRol,
          password
      });

      // Guardar el nuevo usuario en la base de datos
      const usuarioCreado = await nuevoUsuario.save();

      res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: usuarioCreado });
  } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { newUsername, newPassword, newRol } = req.body;

  try {
    

    // Buscar el usuario en la base de datos
    const usuarioEncontrado = await Usuario.findById(id);
    console.log('Usuario encontrado:', usuarioEncontrado);

    // Verificar si el usuario existe
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizar el usuario en la base de datos
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { username: newUsername, password: newPassword, rol: newRol },
      { new: true } // Devolver el usuario actualizado
    ).lean();
    console.log('Datos a actualizar:', usuarioActualizado); 
    console.log('Usuario actualizado:', usuarioActualizado);
    

    // Verificar si el usuario se actualizó correctamente
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "No se pudo actualizar el usuario" });
    }

    // Enviar respuesta con el usuario actualizado
    console.log('Usuario actualizado exitosamente.');
    res.status(200).json({ mensaje: "Usuario editado exitosamente", usuario: usuarioActualizado });
  } catch (error) {
    // Manejar errores
    console.error("Error al editar el usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


const eliminarUsuario = async (req, res) => {
  const { id } = req.params; 
  try {
    // Verificar si el usuario existe en la base de datos
    const usuarioEncontrado = await Usuario.findById(id);
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    
    await Usuario.findByIdAndDelete(id);

    // Enviar respuesta con éxito
    console.log('Usuario Eliminado exitosamente.');
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

  


const obtenerProductos = async (req, res) => {
    try {
        const productosFile = await fs.readFile(path.join(__dirname, '../db/productos.json'));
        const productosData = JSON.parse(productosFile);
        res.json(productosData);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};


const crearProducto = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, precio } = req.body;

    // Crear un nuevo producto en la base de datos
    const nuevoProducto = new Producto({ nombre, precio });
    await nuevoProducto.save();

    // Responder con el nuevo producto creado
    res.status(201).json({ mensaje: "Producto creado exitosamente", producto: nuevoProducto });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const editarProducto = async (req, res) => {
  const { id } = req.params;
  const { nuevoNombre, nuevoPrecio } = req.body;

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre: nuevoNombre, precio: nuevoPrecio },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto editado exitosamente', producto: productoActualizado });
  } catch (error) {
    console.error('Error al editar producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};




const eliminarProducto = async (req, res) => {
  const { id } = req.params; // Obtén el ID del producto de los parámetros
  console.log(` Eliminando producto con ID: ${id}`);

  try {
    // Buscar el producto por su ID y eliminarlo
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.status(200).json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


//PEDIDOS

const crearPedido = async (req, res) => {
  console.log(req.body);
  try {
    const { mesa, mesero, productos, total, estado } = req.body;

    // Crear un nuevo pedido utilizando los datos del cuerpo de la solicitud
    const nuevoPedido = new Pedido({
      _id: new ObjectId(), // Asignar un nuevo ObjectId como ID del pedido
      mesa,
      mesero,
      productos: await Promise.all(productos.map(async (prod) => {
        const producto = await Producto.findOne({ nombre: prod.nombre }); // Busca el producto por su nombre
        if (!producto) {
          throw new Error(`Producto con nombre ${prod.nombre} no encontrado`);
        }
        return {
          producto: producto._id,
          cantidad: prod.cantidad
        };
      })),
      total,
      estado
    });

    // Guardar el nuevo pedido en la base de datos
    await nuevoPedido.save();
    res.status(201).json({ mensaje: "Pedido creado exitosamente", pedido: nuevoPedido });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};



const obtenerPedidos = async (req, res) => {
  try {
    // Obtener todos los pedidos de la base de datos
    const pedidosData = await Pedido.find().populate('productos.producto').exec();
    res.json(pedidosData);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};







const editarEstadoPedido = async (req, res) => {
  const { id } = req.params;
  console.log("ID del pedido recibido:", id); 
  const { estado } = req.body;
  

  try {
    // Buscar el pedido por su ID y actualizar el estado
    const pedidoActualizado = await Pedido.findByIdAndUpdate(id, { estado }, { new: true });
    console.log("Pedido actualizado:", pedidoActualizado); // Agregar este console.log para verificar el pedido actualizado
    // Resto del código...
} catch (error) {
    console.error("Error al editar el estado del pedido:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
}
};




// VENTAS

const obtenerVentas = async (req, res) => {
  try {
    // Consultar la base de datos para obtener todas las ventas
    const ventas = await Venta.find();

    // Si no hay ventas en la base de datos, retornar un mensaje
    if (!ventas || ventas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron ventas' });
    }

    // Agrupar las ventas por mesero y calcular el total de ventas por mesero
    const ventasPorMesero = ventas.reduce((acc, venta) => {
      if (!acc[venta.mesero]) {
        acc[venta.mesero] = { ventas: [], totalVentas: 0 };
      }
      acc[venta.mesero].ventas.push(venta);
      acc[venta.mesero].totalVentas += venta.totalVentas;
      return acc;
    }, {});

    res.status(200).json(ventasPorMesero);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};



const agregarVenta = async (req, res) => {
  try {
    const { mesero, producto, totalVentas } = req.body;

    // Crear una nueva instancia de Venta utilizando el modelo de Mongoose
    const nuevaVenta = new Venta({
      mesero,
      producto,
      totalVentas
    });

    // Guardar la nueva venta en la base de datos
    await nuevaVenta.save();

    res.status(201).json({ mensaje: 'Venta agregada exitosamente' });
  } catch (error) {
    console.error('Error al agregar la venta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};





















module.exports = {
    login,    
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerProductos,
    crearProducto,
    editarProducto,
    eliminarProducto,    
    crearPedido,
    obtenerPedidos,
    editarEstadoPedido,
    obtenerVentas,
    agregarVenta
    
    
  };

