import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Button = ({ handleImport, handleExport, tableData }) => {
  const [importDropdown, setImportDropdown] = useState(false);
  const [exportDropdown, setExportDropdown] = useState(false);

  // Function to print the table as a PDF
  const handlePrintPDF = () => {
    const input = document.getElementById('printTable'); // Get the table element

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert to image
      const pdf = new jsPDF('l', 'mm', 'a4'); // Create a new PDF document
      const imgWidth = 297; // A4 width in mm
      const pageHeight = 210; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); // Add image to PDF
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('table.pdf'); // Save the PDF
    });
  };

  return (
    <>
      <div style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }} 
           onMouseEnter={() => setImportDropdown(true)} 
           onMouseLeave={() => setImportDropdown(false)}>
        <button className="button">インポート</button>
        {importDropdown && (
          <div className="dropdown" style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', marginTop: '5px' }}>
            <button onClick={() => handleImport('csv')}>CSV</button>
            <button onClick={() => handleImport('xlsx')}>XLSX</button>
          </div>
        )}
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }} 
           onMouseEnter={() => setExportDropdown(true)} 
           onMouseLeave={() => setExportDropdown(false)}>
        <button className="button">エクスポート</button>
        {exportDropdown && (
          <div className="dropdown" style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', marginTop: '5px' }}>
            <button onClick={() => handleExport('csv')}>CSV</button>
            <button onClick={() => handleExport('xlsx')}>XLSX</button>
            <button onClick={handlePrintPDF}>PDF</button> {/* PDF print button */}
          </div>
        )}
      </div>
    </>
  );
};

export default Button;
