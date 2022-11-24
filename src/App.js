import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './Router';

function App() {

  const routing = useRoutes(routes());
  return (
    <>
      {routing}
    </>
  );
}

export default App;
