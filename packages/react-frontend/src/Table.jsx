import React from "react";

export default function Table({ characterData = [] }) {
    if (!characterData || characterData.length === 0) {
        return <p>No data found.</p>;
    }

    return (
        <table border="1" cellPadding="8">
            <thead>
                <tr>
                    {Object.keys(characterData[0]).map(
                        (key) => (
                            <th key={key}>{key}</th>
                        )
                    )}
                </tr>
            </thead>
            <tbody>
                {characterData.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, i) => (
                            <td key={i}>{String(value)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
