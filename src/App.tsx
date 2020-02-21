import React from 'react';
import './App.css';
import {Switch, Route, Redirect, Link, NavLink} from 'react-router-dom';

import Todos from './Pages/Home'
import NotFound from './Pages/NotFound'
import Weather from "./Pages/Weather";
import Searching from "./Pages/Searching";

const App = () => {

    const [todos, setTodos] = React.useState(
        [{
            searchText: "епта рас",
            status: false,
            filtered: true,
            id: 1
        }, {
            searchText: "епта двас",
            status: false,
            filtered: true,
            id: 2
        }, {
            searchText: "епта трис",
            status: false,
            filtered: true,
            id: 3
        }, {
            searchText: "епта ы",
            status: false,
            filtered: true,
            id: 4
        }]
    );

    return (
        <div>
            <header className="App-header">
                <div className='myEbala'>KAkayata shlyapa</div>
                <nav className="inactiveNavLink">
                    <NavLink activeClassName="activeNavLink" to="/weather">Погода</NavLink>
                    <NavLink activeClassName="activeNavLink" to="/todos">Тудушки</NavLink>
                    <NavLink activeClassName="activeNavLink" to="/search">Поиск</NavLink>
                </nav>
            </header>
            <div className='App'>
                <Switch>
                    <Route exact path='/todos' render={() => <Todos/>}/>
                    <Route exact path='/404' render={() => <NotFound/>}/>
                    <Route exact path='/weather' render={() => <Weather/>}/>
                    <Route exact path='/search' render={() => <Searching data={todos}/>}/>
                    <Redirect from='/' to='/404'/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
