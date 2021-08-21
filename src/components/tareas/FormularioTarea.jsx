import React from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormularioTarea = () => {
  const proyectosContext = React.useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = React.useContext(tareaContext);
  const {
    agregarTarea,
    validarTarea,
    errorTarea,
    obtenerTareas,
    tareaSeleccionada,
    actualizarTarea,
    limpiarTareaSeleccionada,
  } = tareasContext;

  React.useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  const [tarea, setTarea] = React.useState({
    nombre: "",
  });

  const { nombre } = tarea;

  if (!proyecto) {
    return null;
  }

  const [proyectoActual] = proyecto;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      validarTarea();
      return;
    }

    if (tareaSeleccionada === null) {
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      limpiarTareaSeleccionada();
    }

    obtenerTareas(proyectoActual._id);

    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Tarea"
            id="nombre"
            className="input-text"
            value={nombre}
            onChange={(e) =>
              setTarea({ ...tarea, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
            className="btn btn-primario btn-submit btn-block"
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormularioTarea;
