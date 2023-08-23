import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Configuracion from "./components/Configuracion";
import FormularioObra from "./components/FormularioObra";

//Contratista
import Contratista from "./pages/Contratista";
import Informacion from "./components/contratista/Informacion";
import ListaSubcontratistas from "./components/contratista/ListaSubcontratistas";
import InformacionSubcontratista from "./components/contratista/InformacionSubcontratista";
import Documentacion from "./components/contratista/Documentacion";
import DocumentacionObra from "./components/contratista/DocumentacionObra";

// Subcontratista
import Subcontratista from "./pages/Subcontratista";
import DocumentosSubcontratista from "./components/subcontratista/DocumentosSubcontratista";

// Administrador
import Administrador from "./pages/Administrador";
import ContratistaObras from "./components/ContratistaObras";
import SubcontratistasObra from "./components/SubcontratistasObra";
import FormularioEditar from "./components/FormularioEditar"
import AdmiDocContr from "./components/AdmiDocContr";
import FormularioEditarObra from "./components/FormularioEditarObra";
import FormularioEditarSubcontratista from "./components/FormularioEditarSubcontratista";
import AdmiDocContrObr from "./components/AdmiDocContrObr";
import AdmiDocContrSub from "./components/AdmiDocContrSub";

import { AuthProvider } from './context/AuthProvider';
import { PerfilProvider } from './context/PerfilProvider';




function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <PerfilProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/administrador" element={<RutaProtegida />}>
              <Route index element={<Administrador />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="obra" element={<FormularioObra />} />
              <Route path="contratista-obras/:id" element={<ContratistaObras />} />
              <Route path="subcontratista-obra/:id" element={<SubcontratistasObra />} />
              <Route path="formulario-obra" element={<FormularioObra />} />
              <Route path="formulario-editar-contratista/:id" element={<FormularioEditar />} />
              <Route path="formulario-editar-contratista-documentacion/:id" element={<AdmiDocContr />} />
              <Route path="formulario-editar-obra/:id" element={<FormularioEditarObra />} />
              <Route path="formulario-editar-obra-documentacion/:id" element={<AdmiDocContrObr />} />
              <Route path="formulario-editar-subcontratista/:id" element={<FormularioEditarSubcontratista />} />
              <Route path="formulario-editar-subcontratista-documentacion/:id" element={<AdmiDocContrSub />} />

            </Route>
            <Route path="/contratista" element={<RutaProtegida />}>
              <Route index element={<Contratista />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="informacion" element={<Informacion />} />
              <Route path="documentacion" element={<Documentacion />} />
              <Route path="documentacion-obra/:id" element={<DocumentacionObra />} />
              <Route path="subcontratistas-obra/:id" element={<ListaSubcontratistas />} />
              <Route path="obra" element={<FormularioObra />} />
            </Route>
            <Route path="/subcontratista" element={<RutaProtegida />}>
              <Route index element={<Subcontratista />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="documentacion-subcontratista" element={<DocumentosSubcontratista />} />
              <Route path="informacion-subcontratista/:id" element={<InformacionSubcontratista />} />
            </Route>
          </Routes>
        </PerfilProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
