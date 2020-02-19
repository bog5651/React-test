import React from 'react';
import './App.css';
import {Switch, Route, Redirect, Link, NavLink} from 'react-router-dom';

import TODO from './Pages/Home'
import NOTFOUND from './Pages/NotFound'
import Weather from "./Pages/Weather";

const App = () => {
    return (
        <div>
            <header className="App-header">
                <div className='myEbala'>KAkayata shlyapa</div>
                <nav>
                    <NavLink activeClassName="activeNavLink" ac className="inactiveNavLink" to="/weather">Погода</NavLink>
                    <NavLink activeClassName="activeNavLink" className="inactiveNavLink" to="/todos">Тудушки</NavLink>
                </nav>
            </header>
            <div className='App'>
                <Switch>
                    <Route exact path='/todos' render={() => <TODO/>}/>
                    <Route exact path='/404' render={() => <NOTFOUND/>}/>
                    <Route exact path='/weather' render={() => <Weather/>}/>
                    <Redirect from='/' to='/404'/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
