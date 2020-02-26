import React from "react";
import Chat from "./Chat";
import {Style} from "../Todo/Styles";

const ChatDispatcher = () => {
    return (
        <div>
            <div className="chatLeft">
                <Chat role="DISPATCHER"/>
            </div>
            <div className="chatRight">
                <Chat style={Style.chatRight} role="DISPATCHER"/>
            </div>
        </div>
    )
};

export default ChatDispatcher;