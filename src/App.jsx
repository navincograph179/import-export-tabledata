import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Table from './components/Table';
import './App.css';
import Button from './components/Button';


const App = () => {
  const [tableData, setTableData] = useState([]);
  const initialData = [
    { name: '株式会社テスト', location: '名古屋', works: 'ソフトウェア開発', telephone: '052-123-4567', website: 'www.testcompany.com', established: '2001年' },
    { name: 'サンプル株式会社', location: '東京', works: 'Webデザイン', telephone: '03-2345-6789', website: 'www.samplecompany.com', established: '2010年' },
    { name: 'エクスプレス社', location: '大阪', works: '物流サービス', telephone: '06-3456-7890', website: 'www.expresscompany.com', established: '2015年' },
    { name: 'デザイン株式会社', location: '福岡', works: 'グラフィックデザイン', telephone: '092-456-7890', website: 'www.designcompany.com', established: '2005年' },
    { name: 'マーケティング社', location: '札幌', works: 'マーケティング', telephone: '011-567-8901', website: 'www.marketingcompany.com', established: '2020年' },
  ];

  useEffect(() => {
    setTableData(initialData);
  }, []);

  const handleImport = (type) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = type === 'csv' ? '.csv' : '.xlsx';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedData = jsonData.map(item => ({
          name: item['会社名'] || item.name,
          location: item['所在地'] || item.location,
          works: item['業務内容'] || item.works,
          telephone: item['電話番号'] || item.telephone,
          website: item['ウェブサイト'] || item.website,
          established: item['設立年'] || item.established,
        }));

        setTableData(formattedData);
      };
      reader.readAsArrayBuffer(file);
    };
    fileInput.click();
  };

  const handleExport = (type) => {
    if (type === 'csv') {
      const csvData = XLSX.utils.json_to_sheet(tableData);
      const csvBlob = new Blob([XLSX.utils.sheet_to_csv(csvData)], { type: 'text/csv;charset=utf-8;' });
      saveAs(csvBlob, 'data.csv');
    } else if (type === 'xlsx') {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const xlsxBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      const blob = new Blob([s2ab(xlsxBlob)], { type: 'application/octet-stream' });
      saveAs(blob, 'data.xlsx');
    }
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>データのインポートとエクスポート</h2>
      <Button handleImport={handleImport} handleExport={handleExport} tableData={tableData} />
      <Table tableData={tableData} />
      
    </div>
  );
};

export default App;
