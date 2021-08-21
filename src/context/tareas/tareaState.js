import React from "react";
import tareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  const [state, dispatch] = React.useReducer(TareaReducer, initialState);

  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {}
  };

  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {}
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (tareaId, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${tareaId}`, {
        params: { proyecto },
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: tareaId,
      });
    } catch (error) {}
  };

  const actualizarTarea = async(tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.existeTarea,
      });
    } catch (error) {}
  };

  const obtenerTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const limpiarTareaSeleccionada = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas: obtenerTareas,
        agregarTarea: agregarTarea,
        validarTarea: validarTarea,
        eliminarTarea: eliminarTarea,
        obtenerTareaActual: obtenerTareaActual,
        actualizarTarea: actualizarTarea,
        limpiarTareaSeleccionada: limpiarTareaSeleccionada,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
