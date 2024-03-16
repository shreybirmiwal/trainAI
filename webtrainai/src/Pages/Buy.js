import React, { useState } from 'react';

const Buy = () => {
    const [file, setFile] = useState(null);
    const [number, setNumber] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleNumberChange = (event) => {
        const selectedNumber = event.target.value;
        setNumber(selectedNumber);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform actions with the uploaded file and the typed number
        console.log('File:', file);
        console.log('Number:', number);
    };

    return (
        <div>
            <h1>Buy Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileInput">Upload Zip File:</label>
                    <input type="file" id="fileInput" onChange={handleFileChange} accept=".zip" />
                </div>
                <div>
                    <label htmlFor="numberInput">Enter a Number:</label>
                    <input type="number" id="numberInput" value={number} onChange={handleNumberChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Buy;