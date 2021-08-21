import React from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const authsContext = React.useContext(authContext);
  const { autenticado, usuarioAutenticado, cargando } = authsContext;

  React.useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
