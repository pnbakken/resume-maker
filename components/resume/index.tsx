"use client";

import ResumeContext from "@/context/resume-context";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./index.style.module.scss";
import { BsFillTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

const Resume = () => {
  const [resume, setResume] = useContext(ResumeContext);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [pdfInstance, setPdfInstance] = useState<jsPDF | null>(null);
  const [isMounted, setIsmounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const resumeOutputRef = useRef(null);

  useEffect(() => {
    console.log(resume);
    setIsmounted(true);
    const generatePDF = async () => {
      const resumeOutput = document.getElementById("resume-output");
      if (resumeOutput) {
        try {
          const canvas = await html2canvas(resumeOutput);
          const pdf = new jsPDF("p", "mm", "a4");
          const imgData = canvas.toDataURL("image/png");

          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;

          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          setPdfData(pdf.output("datauristring"));
          console.log("PDF DATA IS ::::: ");
          console.log(pdfData);
          setPdfInstance(pdf);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    resume && generatePDF();
  }, []);

  const downloadPdf = () => {
    if (pdfInstance) {
      pdfInstance.save("resume.pdf");
      toast.success("File downloaded", {
        icon: "📥",
        position: "bottom-center",
      });
    }
  };

  if (!isMounted) {
    return <div>Loading mount...</div>;
  }

  return (
    <div>
      <div id="resume-output" className={style.resumeOutput}>
        {resume && (
          <div
            className={`${style.resumeTemplate} full-width full-height flex-r justify-between`}
          >
            <div className={`${style.resumeMain} full-width full-height`}>
              <div className={`${style.mainHeader} flex-c gap-sm`}>
                <div>
                  <h1>
                    {`${resume.personal_details.firstName} ${resume.personal_details.lastName}`}
                  </h1>
                </div>
                {resume.personal_details.phoneNumber && (
                  <div className="flex-r gap-xs align-center">
                    <BsFillTelephoneFill />
                    {resume.personal_details.phoneNumber}
                  </div>
                )}
                {resume.personal_details.emailAddress && (
                  <div className="flex-r gap-xs align-center">
                    <BsFillEnvelopeFill />
                    {resume.personal_details.emailAddress}
                  </div>
                )}
              </div>
            </div>
            <div className={`${style.resumeSidebar} full-height`}></div>
          </div>
        )}
      </div>

      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default Resume;
