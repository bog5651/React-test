import React from 'react';
import logo2 from './logo.svg';
import './App.css';
import Todolist from "./Todo/Todolist";

interface Item {
    name: string,
    status: boolean,
    id: number
}

const App = () => {
    const [todos, setTodos] = React.useState(
        [{
            name: "епта рас",
            status: false,
            id: 1
        }, {
            name: "епта двас",
            status: false,
            id: 2
        }, {
            name: "епта трис",
            status: false,
            id: 3
        }, {
            name: "епта ы",
            status: false,
            id: 4
        }]
    );

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo2} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <div className='myEbala'>some text</div>
                <h1>my super text</h1>\
            </header>
            <Todolist todos={todos} onClickItem={(id: number) => {
                setTodos(
                    todos.map((item: Item) => {
                        if (item.id === id)
                            item.status = !item.status;
                        return item
                    })
                )
            }}/>
        </div>
    );
};

export default App;
