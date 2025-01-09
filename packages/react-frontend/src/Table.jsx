// src/Table.jsx
import React from "react";

function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    )
}

function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(inedx)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
    );
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

// passing data on the other side by using props through this.prop
function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData}
            removeCharacter={props.remove}
            />
        </table>
    );
}

export default Table;