import React from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  const alertasContext = React.useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const authsContext = React.useContext(authContext);
  const { iniciarSesion, mensaje, autenticado } = authsContext;

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
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <input
              type="submit"
              value="Iniciar Sesion"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
