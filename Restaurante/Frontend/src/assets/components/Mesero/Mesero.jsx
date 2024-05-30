import  { useState, useEffect } from 'react';
import { Link,  } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Mesero.css';

const PerfilMesero = () => {
  const [mesa, setMesa] = useState('');
  const [productos, setProductos] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [estadoPedido, setEstadoPedido] = useState('procesando');
  const [pedido, setPedido] = useState([]);
  const [cantidadProducto, setCantidadProducto] = useState({});
  const [subtotalProductos, setSubtotalProductos] = useState({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://restauranteback.vercel.app/restaurante/productos');
        if (!response.ok) {
          throw new Error('Error al cargar los productos: ' + response.statusText);
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const calcularTotal = () => {
      let total = 0;
      pedido.forEach(({ producto, cantidad }) => {
        total += producto.precio * cantidad;
      });
      setTotalVenta(total);
    };

    calcularTotal();
  }, [pedido]);

  const handleAgregarProducto = (productoNombre) => {
    const productoSeleccionado = productos.find(p => p.nombre === productoNombre);
    if (!productoSeleccionado) {
      console.error('Producto no encontrado');
      return;
    }

    const productoExistenteIndex = pedido.findIndex(item => item.producto.nombre === productoNombre);
    if (productoExistenteIndex !== -1) {
      const nuevoPedido = [...pedido];
      nuevoPedido[productoExistenteIndex].cantidad++;
      setPedido(nuevoPedido);
    } else {
      setPedido([...pedido, { producto: productoSeleccionado, cantidad: 1 }]);
    }
  };

  const handleQuitarProducto = (productoNombre) => {
    const nuevoPedido = pedido.filter(item => item.producto.nombre !== productoNombre);
    setPedido(nuevoPedido);
  };

  const handleChangeCantidadProducto = (productoNombre, nuevaCantidad) => {
    const nuevoPedido = pedido.map(item => {
      if (item.producto.nombre === productoNombre) {
        const nuevoSubtotal = item.producto.precio * nuevaCantidad;
        return { ...item, cantidad: nuevaCantidad, subtotal: nuevoSubtotal };
      }
      return item;
    });

    const nuevoSubtotalProductos = { ...subtotalProductos };
    nuevoSubtotalProductos[productoNombre] = productos.find(p => p.nombre === productoNombre).precio * nuevaCantidad;

    setPedido(nuevoPedido);
    setSubtotalProductos(nuevoSubtotalProductos);
    setCantidadProducto({ ...cantidadProducto, [productoNombre]: nuevaCantidad });
  };

  const handleSubmitPedido = async (e) => {
    e.preventDefault();
    try {
      const productosPedido = pedido.map(({ producto, cantidad }) => ({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
      }));

      const pedidoData = {
        mesa: mesa,
        mesero: localStorage.getItem('nameUser'),
        productos: productosPedido,
        total: totalVenta,
        estado: estadoPedido
      };
      
      const response = await fetch('https://restauranteback.vercel.app/restaurante/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
    }
  };

  return (
    <div className="mesero-background">
      <div className="FormContainer">
        <div className="BackButtonContainer">
          <Link to="/login" className="BackButton">
            <FiArrowLeft className="ArrowIcon" />
            Cerrar sesión
          </Link>
        </div>
        
        <form onSubmit={handleSubmitPedido}>
          <div className="FormGroup">
            <label className="FormLabel">
              Mesa:
              <input className="FormInput" type="text" value={mesa} onChange={(e) => setMesa(e.target.value)} />
            </label>
          </div>
          <div className="FormGroup">
            <label className="FormLabel">
              Productos:
              <select className="FormSelect" onChange={(e) => handleAgregarProducto(e.target.value)}>
                <option value="">Selecciona un producto</option>
                {productos.map((producto) => (
                  <option key={producto._id} value={producto.nombre}>{producto.nombre}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="PedidoContainer">
            {pedido.map(({ producto, cantidad }, index) => (
              <div key={index} className="PedidoItem">
                <span>{producto.nombre}</span>
                <div>
                  <button type="button" className="decrement" onClick={() => handleChangeCantidadProducto(producto.nombre, cantidad - 1)}>-</button>
                  <span>{cantidad}</span>
                  <button type="button" className="increment" onClick={() => handleChangeCantidadProducto(producto.nombre, cantidad + 1)}>+</button>
                </div>
                <span>{subtotalProductos[producto.nombre]}</span>
                <button type="button" onClick={() => handleQuitarProducto(producto.nombre)}>Quitar</button>
              </div>
            ))}
          </div>
          <div className="FormGroup">
            <label className="FormLabel">
              Total de la Venta:
              <input className="FormInput" type="number" value={totalVenta} readOnly />
            </label>
          </div>
          <div className="FormGroup">
            <label className="FormLabel">
              Estado del Pedido:
              <select className="FormSelect" value={estadoPedido} onChange={(e) => setEstadoPedido(e.target.value)}>
                <option value="procesando">Procesando</option>
                <option value="listo">Listo</option>
              </select>
            </label>
          </div>
          <button className="FormButton" type="submit">Realizar Pedido</button>
        </form>
      </div>
    </div>
  );
};

export default PerfilMesero;
