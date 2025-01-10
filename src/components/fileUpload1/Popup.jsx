import React, { useState } from 'react';

function Popup({ onUploadNow }) {
    const [items, setItems] = useState([]);
    const [checkedFolders, setCheckedFolders] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    // List of allowed file types (can be expanded as needed)
    const allowedFileTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/javascript', // Allow .jsx files as JavaScript files
        'text/javascript' // Allow .jsx files as text/javascript
    ];

    // Handle file change for drag & drop or file input
    const handleFileChange = (event) => {
        const newFiles = [...event.target.files];
        const invalidFiles = [];

        const validFiles = newFiles.filter((file) => {
            if (!allowedFileTypes.includes(file.type)) {
                invalidFiles.push(file);
                return false;
            }
            return true;
        });

        if (invalidFiles.length > 0) {
            setErrorMessage('Some files are not allowed to be uploaded. Only PDF, DOCX, and XLSX files are supported.');
        } else {
            setErrorMessage('');
        }

        setItems((prevItems) => [
            ...prevItems,
            ...validFiles.map((file) => ({ type: 'file', name: file.name, path: file.webkitRelativePath || file.name })),
        ]);
    };

    const handleFolderChange = (event) => {
        const newFolders = [...event.target.files];
        const groupedItems = groupFilesByFolder(newFolders);
        setItems((prevItems) => [...prevItems, ...groupedItems]);
    };

    // Helper function to group files by folder
    const groupFilesByFolder = (files) => {
        const folders = {};

        files.forEach((file) => {
            const pathParts = file.webkitRelativePath.split('/');
            const folderPath = pathParts.slice(0, -1).join('/');
            const fileName = pathParts[pathParts.length - 1];

            if (!folders[folderPath]) {
                folders[folderPath] = [];
            }

            folders[folderPath].push({ type: 'file', name: fileName, path: folderPath + '/' + fileName });
        });

        return Object.keys(folders).map((folderName) => ({
            type: 'folder',
            name: folderName,
            files: folders[folderName],
        }));
    };

    const handleRemove = (itemPath) => {
        setItems((prevItems) => {
            return prevItems?.map((item) => {
                if (item.type === 'folder') {
                    const updatedFiles = item.files.filter((file) => file.path !== itemPath);
                    return updatedFiles.length > 0 ? { ...item, files: updatedFiles } : null;
                } else {
                    return item.path !== itemPath ? item : null;
                }
            }).filter(Boolean);
        });
    };

    const handleCheckboxChange = (folderPath) => {
        setCheckedFolders((prevChecked) => ({
            ...prevChecked,
            [folderPath]: !prevChecked[folderPath],
        }));
    };

    const handleUploadNow = () => {
        const preparedItems = items.map((item) => {
            if (item.type === 'folder') {
                return {
                    ...item,
                    files: item.files.filter((file) => checkedFolders[item.name] || false),
                };
            }
            return item;
        });

        // Retrieve existing files from localStorage (if any)
        const existingFiles = JSON.parse(localStorage.getItem('Files')) || [];

        // Combine the existing files with the new files
        const allFiles = [...existingFiles, ...preparedItems];

        // Save the combined list to localStorage
        localStorage.setItem('Files', JSON.stringify(allFiles));

        // Trigger the onUploadNow callback with the prepared items
        onUploadNow(preparedItems);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white p-6 rounded-md shadow-lg w-96 overflow-auto">
                <h2 className="text-2xl mb-4">Upload Files & Folders</h2>

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                />

                <input
                    type="file"
                    webkitdirectory="true"
                    mozdirectory="true"
                    onChange={handleFolderChange}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                />

                {/* Show error message if any invalid file is uploaded */}
                {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

                <div>
                    <ul className="mb-4">
                        {items.map((item, index) => {
                            if (item.type === 'file') {
                                return (
                                    <li key={index} className="flex justify-between items-center mb-2">
                                        <span>{item.path}</span>
                                        <button onClick={() => handleRemove(item.path)} className="text-red-500 text-xs">
                                            Remove
                                        </button>
                                    </li>
                                );
                            }

                            if (item.type === 'folder') {
                                return (
                                    <li key={index} className="mb-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={checkedFolders[item.name]}
                                                onChange={() => handleCheckboxChange(item.name)}
                                                className="mr-2"
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                        {checkedFolders[item.name] && (
                                            <ul className="ml-4">
                                                {item.files.map((file, fileIndex) => (
                                                    <li key={fileIndex} className="flex justify-between items-center mb-2">
                                                        <span>{file.path}</span>
                                                        <button onClick={() => handleRemove(file.path)} className="text-red-500 text-xs">
                                                            Remove
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>

                <div className="flex justify-between">
                    <button onClick={handleUploadNow} className="bg-green-500 text-white p-2 rounded-md">
                        Upload Now
                    </button>
                    <button onClick={() => {
                        localStorage.removeItem('Files'); // Clear stored files
                        onUploadNow([]); // Call onUploadNow with an empty array
                    }} className="bg-gray-500 text-white p-2 rounded-md">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;


// when i upload first time then work properly but when i add second time then first time's data why removed i want stay all the data in loacstorage use ... operator

// this is best but now i want to i can do drag and drop also in same input tag i mean when i drag any file into input:file then it must be accept it and folder drag then input:folder must accept it

// higher order component etle k 1 componet argument ma take kare and return ma pan 1 argument ne send kare ... jem k age ne argument pass kari to ee pramane tene enhance kari ne return thase...

