import React from "react";
import openSocket from 'socket.io-client';
import queryString from 'query-string';

interface Message {
    msg: string
    isMyMessage: boolean
}

class Chat extends React.Component<any, any> {

    socket: SocketIOClient.Socket | undefined;
    params: queryString.ParsedQuery<string>;

    constructor(props: any) {
        super(props);
        this.params = queryString.parse(this.props.location.search);
        console.log(props);
        this.state = {
            messages: [],
            writtenMsg: ""
        }
    }

    componentDidMount(): void {
        this.socket = openSocket("localhost:1081");
        this.socket.on("get_role", () => {
            this.socket?.emit("my_role", {role: this.params.role});
        });
        this.socket.on("message", (msg: any) => {
            this.setState(() => {
                const message: Message = {
                    msg: msg.message,
                    isMyMessage: false
                };
                return this.state.messages.push(message);
            })
        });
        this.socket.on('warn', (msg: any) => {
            console.log(msg);
            this.setState(() => {
                const message: Message = {
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
                                <p className={customClass} key={index}>{item.msg}</p>
                            )
                        })
                    }
                </div>
                <form className="editTextMessage" onSubmit={(event) => {
                    const myMsg: Message = {
                        msg: this.state.writtenMsg,
                        isMyMessage: true
                    };
                    this.socket?.emit("message", {"message": this.state.writtenMsg});
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

export default Chat;