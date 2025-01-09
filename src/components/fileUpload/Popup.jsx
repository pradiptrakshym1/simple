import React, { useState } from 'react';

function Popup({ onUploadNow }) {
    const [items, setItems] = useState([]);
    const [checkedFolders, setCheckedFolders] = useState({});

    const handleFileChange = (event) => {
        const newFiles = [...event.target.files];
        setItems((prevItems) => [
            ...prevItems,
            ...newFiles.map((file) => ({ type: 'file', name: file.name, path: file.webkitRelativePath || file.name })),
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
            return prevItems.map((item) => {
                if (item.type === 'folder') {
                    // If folder, remove the specific file inside the folder (if its path matches)
                    const updatedFiles = item.files.filter((file) => file.path !== itemPath);
                    return updatedFiles.length > 0
                        ? { ...item, files: updatedFiles }
                        : null; // If folder has no files left, remove the folder
                }
                // If file, simply remove it
                return item.path !== itemPath ? item : null;
            }).filter(Boolean); // Filter out null values (empty folders)
        });
    };

    const handleCheckboxChange = (folderPath) => {
        setCheckedFolders((prevChecked) => ({
            ...prevChecked,
            [folderPath]: !prevChecked[folderPath],
        }));
    };

    const handleUploadNow = () => {
        // Prepare the final list of files and folders for upload
        const preparedItems = items.map((item) => {
            if (item.type === 'folder') {
                return {
                    ...item,
                    files: item.files.filter((file) => checkedFolders[item.name] || false),
                };
            }
            return item;
        });
        onUploadNow(preparedItems);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-2xl mb-4">Upload Files & Folders</h2>

                {/* File input */}
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                />

                {/* Folder input */}
                <input
                    type="file"
                    webkitdirectory="true"
                    mozdirectory="true"
                    onChange={handleFolderChange}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                />

                {/* List of uploaded items (folders and files) */}
                <div>
                    <ul className="mb-4">
                        {items.map((item, index) => {
                            if (item.type === 'file') {
                                return (
                                    <li key={index} className="flex justify-between items-center mb-2">
                                        <span>{item.path}</span>
                                        <button
                                            onClick={() => handleRemove(item.path)}
                                            className="text-red-500 text-xs"
                                        >
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
                                                checked={checkedFolders[item.name] || false}
                                                onChange={() => handleCheckboxChange(item.name)}
                                                className="mr-2"
                                            />
                                            <span>{item.name}</span>
                                        </div>

                                        {/* Show files of this folder if checked */}
                                        {checkedFolders[item.name] && (
                                            <ul className="ml-4">
                                                {item.files.map((file, fileIndex) => (
                                                    <li key={fileIndex} className="flex justify-between items-center mb-2">
                                                        <span>{file.path}</span>
                                                        <button
                                                            onClick={() => handleRemove(file.path)}
                                                            className="text-red-500 text-xs"
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleUploadNow}
                        className="bg-green-500 text-white p-2 rounded-md"
                    >
                        Upload Now
                    </button>
                    <button
                        onClick={() => onUploadNow([])} // Close popup without uploading
                        className="bg-gray-500 text-white p-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
