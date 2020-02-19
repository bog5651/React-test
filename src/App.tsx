import React from 'react';
import './App.css';
import {Switch, Route, Redirect, Link} from 'react-router-dom';

import TODO from './Pages/Home'
import NOTFOUND from './Pages/NotFound'
import Weather from "./Pages/Weather";

const App = () => {
    return (
        <div>
            <header className="App-header">
                <div className='myEbala'>KAkayata shlyapa</div>
                <nav>
                    <Link to="/weather">Погода</Link>
                    <Link to="/todos">Тудушки</Link>
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
