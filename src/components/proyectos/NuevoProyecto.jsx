import React from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = React.useContext(proyectoContext);

  const {
    formulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
    errorFormulario,
  } = proyectosContext;

  const [proyecto, setProyecto] = React.useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      mostrarError();
      return;
    }

    agregarProyecto(proyecto);

    setProyecto({
      nombre: "",
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form
          className="formulario-nuevo-proyecto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className="input-text"
            placeholder="Nuevo Proyecto"
            name="nombre"
            value={nombre}
            onChange={(e) =>
              setProyecto({
                ...proyecto,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            type="submit"
            value="Agregar Proyecto"
            className="btn btn-primario btn-block"
          />
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
