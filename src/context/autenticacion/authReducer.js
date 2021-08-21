import {
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
  OBTENER_USUARIO,
} from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };

    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        autenticado: null,
        cargando: false,
        mensaje: action.payload,
      };
    case LOGIN_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        autenticado: null,
        cargando: false,
        mensaje: action.payload,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };

    case CERRAR_SESION: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        autenticado: null,
        usuario: null,
        cargando: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
