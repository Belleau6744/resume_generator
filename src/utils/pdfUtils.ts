import jsPDF from "jspdf";


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