import React from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  const alertasContext = React.useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const authsContext = React.useContext(authContext);
  const { registrarUsuario, mensaje, autenticado } = authsContext;

  React.useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, setUsuario] = React.useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { email, password, nombre, confirmar } = usuario;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmar.trim()
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    if (password.length < 6) {
      mostrarAlerta(
        "La contraseña debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas no coinciden", "alerta-error");
      return;
    }

    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              onChange={(e) =>
                setUsuario({ ...usuario, [e.target.name]: e.target.value })
              }
              value={nombre}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              onChange={(e) =>
                setUsuario({ ...usuario, [e.target.name]: e.target.value })
              }
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setUsuario({ ...usuario, [e.target.name]: e.target.value })
              }
              value={password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmar Password"
              onChange={(e) =>
                setUsuario({ ...usuario, [e.target.name]: e.target.value })
              }
              value={confirmar}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Registrarte"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
