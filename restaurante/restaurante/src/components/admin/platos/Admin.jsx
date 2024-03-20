import { useState } from "react";
import "./Admin.css";
import Sidebar from "../../shared/sidebar/Sidebar";

function Admin() {
  const [platos, setPlatos] = useState([]); // Estado para almacenar los platos de comida

  const [plato, setPlato] = useState({
    plato_id: "",
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
  });

  const [editIndex, setEditIndex] = useState(null); // Estado para el índice del plato en edición

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del plato:", plato);
    if (editIndex !== null) {
      const updatedPlatos = [...platos];
      updatedPlatos[editIndex] = plato;
      setPlatos(updatedPlatos);
      setEditIndex(null);
    } else {
      setPlatos([...platos, plato]);
    }
    setPlato({
      plato_id: "",
      nombre: "",
      precio: "",
      descripcion: "",
      imagen: null,
    });
  };

  const handleEdit = (index) => {
    setPlato(platos[index]);
    setEditIndex(index);
  };

  const handleDelete = (id) => {
    console.log(id);
    setPlatos(platos.filter((plato) => plato.id !== id));
  };

  return (
    <>
      <div className="contenedor-platos">
        <Sidebar></Sidebar>
        <div className="container">
          <h2>Crear Nuevo Plato de Comida</h2>
          <form onSubmit={handleSubmit} className="form-platos">
            <div className="platos-group">
              <label htmlFor="plato_id">ID del Plato:</label>
              <input type="text" id="plato_id" name="plato_id" value={plato.plato_id} onChange={handleChange} required />
            </div>
            <div className="platos-group">
              <label htmlFor="nombre">Nombre del Plato:</label>
              <input type="text" id="nombre" name="nombre" value={plato.nombre} onChange={handleChange} required />
            </div>
            <div className="platos-group">
              <label htmlFor="precio">Precio:</label>
              <input type="number" id="precio" name="precio" value={plato.precio} onChange={handleChange} min="0" step="0.01" required />
            </div>
            <div className="platos-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea id="descripcion" name="descripcion" value={plato.descripcion} onChange={handleChange} rows="4" required />
            </div>
            <button type="submit" className="btn-crear-plato">
              Guardar
            </button>
          </form>

          {Object.keys(platos).length > 0 ? (
            <>
              <table className="table-platos">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {platos.map((plato, index) => (
                    <tr key={index}>
                      <td>{plato.plato_id}</td>
                      <td>{plato.nombre}</td>
                      <td>{plato.precio}</td>
                      <td>{plato.descripcion}</td>
                      <td>
                        <a className="btn-editar">
                          <i onClick={() => handleEdit(index)} className="editar fas fa-edit fa-lg">
                            <i onClick={() => handleDelete(plato.plato_id)} className="eliminar fas fa-trash-alt fa-sm"></i>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
