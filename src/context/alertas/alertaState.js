import { MOSTRA_ALERTA, OCULTAR_ALERTA } from "../../types";
import React from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = React.useReducer(alertaReducer, initialState);

  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRA_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <alertaContext.Provider
      value={{ alerta: state.alerta, mostrarAlerta: mostrarAlerta }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
