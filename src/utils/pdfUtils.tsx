import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactDOM from "react-dom";
import PdfTemplate1 from "../components/studentCenter/generator/Layout/resumeLayouts/template_1/resume/PdfTemplate1";
import { ResumeFormType } from "../types/resumeTypes";

export const generatePDF = (formRef: HTMLFormElement | null) => {
    if (!formRef) return;

    const formData = new FormData(formRef);
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    let yPos = 10;

    formData.forEach((value) => {
        console.log(value);
        pdf.text("HELLO", 20, yPos);
        yPos += 10;
    });

    pdf.save('resume.pdf');
}

export const captureAndPrint = (resume: ResumeFormType) => {
    // Render the content of the div off-screen
    const divToPrint = document.createElement('div');
    divToPrint.id = 'divToPrint';
    divToPrint.style.position = 'absolute';
    divToPrint.style.left = '-9999px';
    divToPrint.style.top = '-9999px';
    document.body.appendChild(divToPrint);
    ReactDOM.render(<PdfTemplate1 resume={resume} />, divToPrint);
    if (divToPrint) {
      html2canvas(document.getElementById('divToPrint') as HTMLElement, { scrollY: -window.scrollY })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const pdfWidth = 210;
          const pdfHeight = 297;
          // const pdfWidth = pdf.internal.pageSize.getWidth();
          // const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;
          let position = 0;

          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
          position -= pdfHeight;

          while (position > -canvas.height) {
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
            position -= pdfHeight;
          }

          pdf.save("download.pdf");
        });
    }
    // TODO Verify need
    document.body.removeChild(divToPrint);
  };