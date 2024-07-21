import { useRoutes } from 'remix';
import Start from './components/Inicio.jsx';
//import About from './routes/about';
//import Contact from './routes/contact';

const RemixApp = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: () => <Start />,
    },
    /*{
      path: '/about',
      element: () => <About />,
    },
    {
      path: '/contact',
      element: () => <Contact />,
    },*/
  ]);

  return routes;
};

export default RemixApp;
