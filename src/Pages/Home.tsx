import React from 'react';
import Todolist from "../Todo/Todolist";

interface Item {
    name: string,
    status: boolean,
    id: number
}

const TODO = () => {
    const [todos, setTodos] = React.useState<Array<Item>>(
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

export default TODO;