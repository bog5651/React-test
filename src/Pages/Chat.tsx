import React from "react";
import openSocket from 'socket.io-client';
import {UserContext} from "../context";

interface Message {
    msg: string
    from: string
    fromId: string
    isMyMessage: boolean
}

class Chat extends React.Component<any, any> {

    socket: SocketIOClient.Socket | undefined;
    role: string;
    userId: string = "";
    host: string;

    constructor(props: any) {
        super(props);
        console.log(props);
        this.role = props.role;
        this.host = props.host;
        if (!this.host) {
            this.host = "localhost:1081"
        }
        this.state = {
            messages: new Array<Message>(),
            writtenMsg: ""
        }
    }

    componentDidMount(): void {
        this.socket = openSocket(this.host);
        this.socket.on("get_role", (msg: any) => {
            this.userId = msg.u_id;
            this.socket?.emit("my_role", {role: this.role});
        });
        this.socket.on("message", (msg: any) => {
            this.setState(() => {
                const message: Message = {
                    from: msg.from,
                    fromId: msg.fromId,
                    msg: msg.message,
                    isMyMessage: false
                };
                return this.state.messages.push(message);
            })
        });
        this.socket.on("new_interlocutor", (msg: any) => {
            this.setState(() => {
                const message: Message = {
                    from: "server",
                    fromId: msg.id,
                    msg: "Собеседник подключился",
                    isMyMessage: false
                };
                return this.state.messages.push(message);
            })
        });
        this.socket.on("interlocutor_disconnected", (msg: any) => {
            this.setState(() => {
                const message: Message = {
                    from: "server",
                    fromId: msg.id,
                    msg: "Собеседник отключился",
                    isMyMessage: false
                };
                return this.state.messages.push(message);
            })
        });
        this.socket.on('warn', (msg: any) => {
            console.log(msg);
            this.setState(() => {
                const message: Message = {
                    from: "server",
                    fromId: "-1",
                    msg: msg.message,
                    isMyMessage: false
                };
                return this.state.messages.push(message);
            })
        });
        this.socket.on('disconnected', () => {
            console.log("server drop socket");
            this.setState(() => {
                const message: Message = {
                    from: "server",
                    fromId: "-1",
                    msg: "server drop socket",
                    isMyMessage: false
                };
                return this.state.messages.push(message);
            })
        })
    }

    componentWillUnmount(): void {
        this.socket?.disconnect()
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="chatBox">
                <div className='messages'>
                    {
                        this.state.messages.map((item: Message, index: number) => {
                            const customClass: string = item.isMyMessage ? "myMessage" : "otherMessage";
                            return (
                                <p className={customClass} key={index}>[{item.from}]:{item.msg}</p>
                            )
                        })
                    }
                </div>
                <form className="editTextMessage" onSubmit={(event) => {
                    const myMsg: Message = {
                        from: this.context.name.first,
                        fromId: this.userId,
                        msg: this.state.writtenMsg,
                        isMyMessage: true
                    };
                    this.socket?.emit("message", {
                        "message": this.state.writtenMsg,
                        "from":  this.context.name.first,
                        "fromId": this.userId
                    });
                    this.state.messages.push(myMsg);
                    const state = {
                        messages: this.state.messages,
                        writtenMsg: ""
                    };
                    this.setState(state);
                    event.preventDefault();
                }}>
                    <input value={this.state.writtenMsg} className="inputMessage" onChange={(event) => {
                        const state = {
                            messages: this.state.messages,
                            writtenMsg: event.target.value
                        };
                        this.setState(state);
                    }}/>
                </form>
            </div>
        )
    }
}

Chat.contextType = UserContext;

export default Chat;