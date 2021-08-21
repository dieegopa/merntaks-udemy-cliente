import { MOSTRA_ALERTA, OCULTAR_ALERTA } from "../../types";

const alertaReducer = (state, action) => {
  switch (action.type) {
    case MOSTRA_ALERTA:
      return {
        alerta: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        alerta: null,
      };
    default:
      return state;
  }
};

export default alertaReducer;
