import { Switch,Route } from 'react-router';
import './App.css';
import { routes } from './routes/routes';
import Header from "./componets/header/header"


function App() {
  return (
    <div className="App">

      <Header/>

      <div>
        <Switch>
            {
              routes.map(route=>
                <Route component={route.component} path={route.path} exact={route.exact} key={route.path}/>
              )
            }
        </Switch>
      </div>

    </div>
  );
}

export default App;
