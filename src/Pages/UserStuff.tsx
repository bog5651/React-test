import React from "react";
import {UserContext} from "../context";

const UserStuff = () => {
    return (
        <UserContext.Consumer>{
            (user: any) => (
                <div>
                    {user.name ? user.name.first : ""} {user.name ? user.name.last : ""}
                </div>
            )
        }
        </UserContext.Consumer>
    )
};

export default UserStuff;