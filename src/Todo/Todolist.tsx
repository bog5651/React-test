import React from "react";
import {Style} from "./Styles"
import SomeItem from "./SomeItem";

export default function Todolist(props: any) {
    return (
        <ul style={Style.ul}>
            {props.todos.map((item: any, index: number) => {
                return (
                    <SomeItem item={item} key={index} onClick={(id: number) => {
                        props.onClickItem(id);
                    }}/>
                )
            })}
        </ul>
    )
}


