import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface LoginState {
    exito: boolean,
    datos: {id: string, nombre: string, apellido: string, correo: string, telefono: string, token: string},
    mensaje: string
}

const initialState: LoginState = {
  exito: false,
  datos: {id: "", nombre: "", apellido: "", correo: "", telefono: "", token: ""},
  mensaje: ""
}

export const counterSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<LoginState>) => {
      state.datos = action.payload.datos;
      state.exito = action.payload.exito;
      state.mensaje = action.payload.mensaje;
    },
    logOut: (state) => {
      state.datos = {id: "", nombre: "", apellido: "", correo: "", telefono: "", token: ""};
      state.exito = false;
      state.mensaje = "";
    }
  },
})

export const { setState, logOut } = counterSlice.actions

export const selectDatos = (state: RootState) => state.login.datos;

export default counterSlice.reducer