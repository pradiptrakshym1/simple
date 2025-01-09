import React, { useState } from 'react';
import Popup from './Popup';
import Table from './Table';

function File1() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [uploadedItems, setUploadedItems] = useState([]);
    
    const openPopup = () => setIsPopupOpen(true);
    
    const handleUploadNow = (items) => {
        setUploadedItems(items);
        setIsPopupOpen(false); 
    };

    return (
        <div className="App">
            <button onClick={openPopup} className="bg-blue-500 text-white p-2 rounded-md mt-5 ml-5" >
                Upload
            </button>

            {isPopupOpen && (
                <Popup
                // 1 function pass karyu je popup ma click thase to aaahi te popup na data set thase and 
                    onUploadNow={handleUploadNow}
                />
            )}

            {/* and te uploaded iteam table ma show karav va mate jase... */}
            <Table uploadedItems={uploadedItems} />
        </div>
    );
}

export default File1;
