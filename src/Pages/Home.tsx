import React from 'react';
import Todolist from "../Todo/Todolist";

interface Item {
    name: string,
    status: boolean,
    id: number
}

const Todos = () => {
    const [todos, setTodos] = React.useState<Array<Item>>(
        [{
            name: "Не ловить маслину",
            status: false,
            id: 1
        }, {
            name: "Сбоку заходить",
            status: false,
            id: 2
        }, {
            name: "Обходить эту шелупонь",
            status: false,
            id: 3
        }, {
            name: "Не светить валыной",
            status: false,
            id: 4
        }]
    );

    return (
        <div className="App">
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

export default Todos;