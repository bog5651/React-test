import React from "react";

export default function SomeItem(props: any) {
    const classes = [];
    if (props.item.status) {
        classes.push('done');
    }
    return (
        <span className={classes.join(' ')}>
            <li>
                {props.item.name}
                <button onClick={() => props.onClick(props.item.id)}>btn</button>
            </li>
        </span>
    )
};