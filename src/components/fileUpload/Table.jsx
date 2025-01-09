import React from 'react';

function Table({ uploadedItems }) {
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
          {uploadedItems.map((item, index) => {
            if (item.type === 'file') {
              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">File</td>
                  <td className="px-4 py-2">{item.path}</td>
                </tr>
              );
            }

            if (item.type === 'folder') {
              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">Folder</td>
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
