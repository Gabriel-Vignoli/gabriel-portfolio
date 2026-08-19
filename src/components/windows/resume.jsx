import { Download } from "lucide-react";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";

import { pdfjs, Document, Page } from 'react-pdf';

import "react-pdf/dist/Page/AnnotationLayer.css"
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


const Resume = () => {
    return ( 
    <>
    <div id="window-header">
        <WindowControls target="resume"></WindowControls>
        <h2>Curriculo.pdf</h2>

        <a href="files/curriculo.pdf" download={true} className="cursor-pointer" title="Baixar curriculo">
        <Download className="icon"></Download>
        </a>
    </div>

     <Document file="files/curriculo.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </> 
    );
}

const ResumeWindow = WindowWrapper(Resume, "resume")

export default ResumeWindow;