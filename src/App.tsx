import React from 'react';
import './App.css';
import {Switch, Route, Redirect, Link, NavLink} from 'react-router-dom';

import Todos from './Pages/Home'
import NotFound from './Pages/NotFound'
import Weather from "./Pages/Weather";
import Searching from "./Pages/Searching";

import {getUser} from './Utils'
import {UserContext} from './context';
import UserStuff from "./Pages/UserStuff";
import Chat from "./Pages/Chat";

const App = () => {
        const sortingData = [{
            searchText: "Во поле березка стояла",
            filtered: true,
            id: 1
        }, {
            searchText: "Пепси",
            filtered: true,
            id: 2
        }, {
            searchText: "89081234567",
            filtered: true,
            id: 3
        }, {
            searchText: "Проходи не задерживайся",
            filtered: true,
            id: 4
        }];

        const [userData, setUserData] = React.useState({name: {first: "defVal", last: "defLast"}});

        React.useEffect(() => getUser((result) => {
            if (result)
                setUserData(result.results[0]);
        }), []);
        return (
            <UserContext.Provider value={userData}>
                <div>
                    <header className="App-header">
                        <div className='myEbala'>KAkayata shlyapa</div>
                        <nav className="inactiveNavLink">
                            <NavLink activeClassName="activeNavLink" to="/chatUser">Чат</NavLink>
                            <NavLink activeClassName="activeNavLink" to="/chatDispatcher">Чат Д</NavLink>
                            <NavLink activeClassName="activeNavLink" to="/weather">Погода</NavLink>
                            <NavLink activeClassName="activeNavLink" to="/todos">Тудушки</NavLink>
                            <NavLink activeClassName="activeNavLink" to="/search">Поиск</NavLink>
                        </nav>
                        <UserStuff/>
                    </header>
                    <div className='App'>
                        <Switch>
                            <Route exact path='/chatUser' component={() => <Chat role="USER"/>}/>
                            <Route exact path='/chatDispatcher' component={() => <Chat role="DISPATCHER"/>}/>
                            <Route exact path='/todos' render={() => <Todos/>}/>
                            <Route exact path='/404' render={() => <NotFound/>}/>
                            <Route exact path='/weather' render={() => <Weather/>}/>
                            <Route exact path='/search' render={() => <Searching data={sortingData}/>}/>
                            <Redirect from='/' to='/404'/>
                        </Switch>
                    </div>
                </div>
            </UserContext.Provider>
        );
    }
;

export default App;
