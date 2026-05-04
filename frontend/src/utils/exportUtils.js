import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export tabular data to an Excel (.xlsx) file.
 * @param {Array<Object>} data - Array of row objects to export.
 * @param {Array<Object>} columns - Definition of columns { header: 'Name', dataKey: 'name' }.
 * @param {string} filename - The desired filename without extension.
 */
export const exportToExcel = (data, columns, filename) => {
  // Map data to match column headers
  const formattedData = data.map((row) => {
    const formattedRow = {};
    columns.forEach((col) => {
      formattedRow[col.header] = row[col.dataKey];
    });
    return formattedRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Auto-size columns based on header length or content length
  const colWidths = columns.map(col => {
    const maxContentLen = Math.max(
      ...formattedData.map(row => (row[col.header] ? row[col.header].toString().length : 0)),
      col.header.length
    );
    return { wch: maxContentLen + 2 }; // Add padding
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

/**
 * Export tabular data to a PDF file.
 * @param {Array<Object>} data - Array of row objects to export.
 * @param {Array<Object>} columns - Definition of columns { header: 'Name', dataKey: 'name' }.
 * @param {string} title - Title of the document.
 * @param {string} filename - The desired filename without extension.
 */
export const exportToPDF = (data, columns, title, filename) => {
  const doc = new jsPDF();
  
  // Header Text
  doc.setFontSize(20);
  doc.setTextColor(31, 41, 55); // #1f2937 (gray-800)
  doc.text('QUENOXA', 14, 22);
  
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128); // #6b7280 (gray-500)
  doc.text(title, 14, 32);
  
  // Date
  const dateStr = new Date().toLocaleDateString('en-GB');
  doc.setFontSize(10);
  doc.text(`Generated on: ${dateStr}`, 14, 40);

  // AutoTable configuration
  const tableColumn = columns.map(col => col.header);
  const tableRows = data.map(row => columns.map(col => row[col.dataKey]));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 48,
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [15, 23, 42] }, // Slate 900
    alternateRowStyles: { fillColor: [248, 250, 252] }, // Slate 50
  });

  doc.save(`${filename}.pdf`);
};
