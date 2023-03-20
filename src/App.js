import './App.scss';
import Routes from "./pages/Routes";
import AuthContextProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
    <ToastContainer />
    </>
  );
}

export default App;
