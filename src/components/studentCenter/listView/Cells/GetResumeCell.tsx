import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Cell } from "react-aria-components";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DownloadIcon from "../../../../assets/Icons/DownloadIcon";
import { Features } from "../../../../redux/features";
import PdfTemplate from "../../generator/PdfTemplate";

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ReactAriaCell = styled(Cell)`
border: 1px solid black;
border-right: none;
border-bottom: none;
height: 50px;
&:last-child {
  border-right: 1px solid black;
}
`;

const DownloadButton = styled.button`
  background: none;
  &:hover {
    background: gray;
    outline: none;
  }
  &:active {
    background: #525252;
  }
  &:focus, &:focus-visible {
    /* outline: 1px solid black; */
    /* outline: 4px auto -webkit-focus-ring-color; */
  }
`;

const GetResumeCell = ({id}: {id: string}) => {
  const userId = useSelector(Features.UserFeature.selector.getUserID);

  // const [ resumesList , setResumesList ] = useState<ResumesType>({});
  
  // const db = getDatabase();
  // const dbRef = ref(db, `students/${userId}/resumes/`);
  // useEffect(() => {
  //   onValue(dbRef, (snapshot) => {
  //     setResumesList(snapshot.val());
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const captureAndPrint = () => {
    // Render the content of the div off-screen
    const divToPrint = document.createElement('div');
    divToPrint.id = 'divToPrint';
    divToPrint.style.position = 'absolute';
    divToPrint.style.left = '-9999px';
    divToPrint.style.top = '-9999px';
    document.body.appendChild(divToPrint);
    ReactDOM.render(<PdfTemplate userId={userId} resumeId={id} />, divToPrint);
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

  return (
    <ReactAriaCell>
      <Content>
        <DownloadButton onClick={captureAndPrint}>
          <DownloadIcon />
        </DownloadButton>
      </Content>
    </ReactAriaCell>
    );
};


export default GetResumeCell