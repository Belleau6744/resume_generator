import { ResumeContentType } from "@types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

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

export const captureAndPrint = async (resume: ResumeContentType, layout: React.ComponentType<{ resume: ResumeContentType }>) => {
    // Render the content of the div off-screen
    const divToPrint = document.createElement('div');
    divToPrint.id = 'divToPrint';
    divToPrint.style.position = 'absolute';
    divToPrint.style.left = '-9999px';
    divToPrint.style.top = '-9999px';
    document.body.appendChild(divToPrint);

    const element = createElement(layout, { resume });
    // ReactDOM.render(element, divToPrint);
    const root = createRoot(divToPrint);
    root.render(element);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (divToPrint) {
      html2canvas(divToPrint)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();

          // const pdfWidth = 210;
          const imgWidth: number = 210;
          const imgHeight: number = (canvas.height * imgWidth) / canvas.width;

          const pdfHeight: number = imgHeight > 297 ? imgHeight : 297;

          pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, pdfHeight);

          pdf.save("download.pdf");
        });
    }
    // TODO Verify need
    document.body.removeChild(divToPrint);
  };