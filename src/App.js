import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './sass/main.scss';
import { routesConfig } from './config/routes.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalStore } from './store/store';
import { createContext, useEffect } from 'react';

const router = createBrowserRouter(routesConfig);
export const AppContext = createContext();

function App() {
  const { user, changeLang, patient, setPatient } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    if (user) changeLang(user.lang || 'en');
  }, [user]);

  return (
    <AppContext.Provider value={{}}>
      <RouterProvider router={router} />
      <ToastContainer limit={1} />
    </AppContext.Provider>
  );
}

export default App;
