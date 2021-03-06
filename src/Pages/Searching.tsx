import React from "react";

const Searching = (props: any) => {

    const [data, setData] = React.useState(props.data);

    function search(text: string) {
        setData(
            data.map((item: any) => {
                if (item.hasOwnProperty('searchText')) {
                    if (item.searchText.includes(text)) {
                        item.filtered = true;
                    } else {
                        item.filtered = false;
                    }
                }
                return item
            })
        );
    }


    return (
        <div>
            <input placeholder="Типа поисковик" onChange={event => search(event.target.value)}/>
            <table>
                <tbody>
                {
                    data.map((item: any) => {
                        if (item.hasOwnProperty('searchText') && item.filtered) {
                            return (<tr key={item.id}>
                                <td>{item.searchText}</td>
                            </tr>);
                        } else
                            return ('');
                    })
                }
                </tbody>
            </table>
        </div>
    )
};

export default Searching;