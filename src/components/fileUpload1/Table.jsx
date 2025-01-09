import React from 'react';

function Table() {
  const uploadedItems = JSON.parse(localStorage.getItem("Files"))
    
  return (
    <div className="mt-10 mx-5">
      <h3 className="text-xl font-semibold">Uploaded Files/Folders</h3>
      <table className="min-w-full mt-4 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Name</th>
          </tr>
        </thead>
        <tbody>
          {uploadedItems?.map((item, index) => {
            // jo folder hase to aaa rite show thase...
            if (item.type === 'folder') {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td className="px-4 py-2">Folder</td>
                    <td className="px-4 py-2 font-semibold">{item.name}</td>
                  </tr>
                  
                  {item.files.map((file, fileIndex) => (
                    <tr key={fileIndex} className="border-t">
                      <td className="px-4 py-2">File</td>
                      <td className="px-4 py-2 pl-8">{file.name}</td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            }

            // jo files hase to aaa badhu show thase...
            if (item.type === 'file') {
              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">File</td>
                  <td className="px-4 py-2">{item.name}</td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
