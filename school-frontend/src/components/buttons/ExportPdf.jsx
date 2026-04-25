import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

function ExportPDF({columns,data, fileName="table-data"}) {

    const exportPDF = () => {
        const doc = new jsPDF();


        autoTable(doc, {
            head:[columns],
            body:data.map(row => columns.map(col => row[col]))
        });

        doc.save(`${fileName}.pdf`);

    };
    // HTML code 
    return (
        <button
        onClick={exportPDF}
        className="bg-red-500 text-white px-3 py-1 rounded"
    >
        Export Pdf
    </button>)

}
