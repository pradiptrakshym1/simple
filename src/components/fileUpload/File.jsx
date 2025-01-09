import React, { useState } from 'react';
import Popup from './Popup';
import Table from './Table';

function File() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [uploadedItems, setUploadedItems] = useState([]);
    
    const openPopup = () => setIsPopupOpen(true);

    
    const handleUploadNow = (items) => {
        setUploadedItems(items);
        setIsPopupOpen(false); 
    };

    return (
        <div className="App">
            <button
                onClick={openPopup}
                className="bg-blue-500 text-white p-2 rounded-md mt-5 ml-5"
            >
                Upload
            </button>

            {isPopupOpen && (
                <Popup
                    onUploadNow={handleUploadNow}
                />
            )}

            <Table uploadedItems={uploadedItems} />
        </div>
    );
}

export default File;
