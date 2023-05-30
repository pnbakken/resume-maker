"use client";
import ResumeContext from "@/context/resume-collection-context";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./index.style.module.scss";
import { BsFillTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Link as PDFLink,
  PDFDownloadLink,
  Font,
  Image,
} from "@react-pdf/renderer";
import WorkingResumeContext from "@/context/working-resume-context";
import { useLanguage } from "@/context/language-context";
import axios from "axios";
import pica from "pica";
import ResumeAsPDF from "@/resume-templates/default";
const ResumeViewer = () => {
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumePDF, setResumePDF] = useState(null);
  const { languageData } = useLanguage();
  const downloadPdf = async () => {};

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);
    console.log(workingResume && workingResume);
  }, []);

  if (!isMounted) {
    return <div>Loading mount...</div>;
  }

  return (
    <div className="full-width flex-c gap-md tw-mb-10">
      <div>
        <div className="full-width flex-r wrap justify-between gap-md tw-my-5">
          <Link href="/resume/">Edit</Link>
          <div>
            <PDFDownloadLink
              document={
                <ResumeAsPDF resume={workingResume} language={languageData} />
              }
              fileName={
                (workingResume && workingResume.resumeName) || "resume.pdf"
              }
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>
        {workingResume && (
          <>
            <PDFViewer
              style={{
                width: "100%",
                minHeight: "90vh",
                borderRadius: "10px",
              }}
            >
              <ResumeAsPDF resume={workingResume} language={languageData} />
            </PDFViewer>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeViewer;

/*function ResumeAsPDF({ resume, language }) {
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    desiredTitle,
    country,
    city,
    imageUrl,
    personalIntroduction,
  } = resume.personal_details || {};

  const { employment_history } = resume.employment_history || {};

  const { resumeName, resumeLanguage } = resume || {};

  const [resizedImage, setResizedImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      const img = document.createElement("img");
      img.src = url;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 160;
        await pica().resize(img, canvas);
        const resizedImageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setResizedImage(resizedImageUrl);
      };
    };
    if (imageUrl) fetchImage();
  }, [imageUrl]);

  const themeColours = {
    primary: "#0d2d59",
    white: "#fafaff",
    darkGrey: "#09092b",
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 0,
      backgroundColor: themeColours.white,
      color: themeColours.darkGrey,
      fontSize: "12px",
      fontWeight: 400,
    },
    pageContainer: {
      padding: "32px",
      width: "65%",
    },

    pageSidebar: {
      backgroundColor: themeColours.primary,
      color: themeColours.white,
      width: "35%",
      padding: "32px 16px",
      fontSize: "12px",
    },

    resumeHeader: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    resumeHeading: {
      fontSize: "24px",
    },

    headingDetails: {
      display: "flex",
      gap: "8px",
    },

    desiredTitle: {
      fontSize: "16px",
      fontWeight: "extralight",
    },

    introductionContainer: {
      border: "1px solid red",
      maxWidth: "100%",
    },
    introductionText: { maxWidth: "100%" },

    link: {
      color: themeColours.primary,
    },

    whiteText: {
      color: themeColours.white,
    },
  });

  return (
    <Document title={resumeName || ""}>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.resumeHeader}>
            <View>
              <View>
                {(firstName || lastName) && (
                  <Text style={styles.resumeHeading}>
                    {firstName && firstName} {lastName && lastName}
                  </Text>
                )}
              </View>
              <View>
                {resizedImage && (
                  <Image
                    src={resizedImage}
                    cache={true}
                    style={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                    }}
                  />
                )}
              </View>
            </View>
            {desiredTitle && (
              <View>
                <Text style={styles.desiredTitle}>{desiredTitle}</Text>
              </View>
            )}
            {personalIntroduction && (
              <View style={styles.introductionContainer}>
                <Text style={styles.introductionText}>
                  {personalIntroduction}
                </Text>
              </View>
            )}
          </View>
          <View>
            {employment_history && (
              <View>
                {employment_history.map((job) => {
                  <View>
                    {job.companyName && (
                      <View>
                        <Text>{job.companyName}</Text>
                      </View>
                    )}
                    <Text>A job</Text>
                  </View>;
                })}
              </View>
            )}
          </View>
        </View>
        <View style={styles.pageSidebar}>
          <Text></Text>
          {(emailAddress || phoneNumber) && (
            <View style={styles.headingDetails}>
              <View>
                {emailAddress && (
                  <Text>
                    <PDFLink
                      src={`mailto:${emailAddress}`}
                      style={[styles.link, styles.whiteText]}
                    >
                      {emailAddress}
                    </PDFLink>
                  </Text>
                )}
              </View>
              <View>{phoneNumber && <Text>Tel: {phoneNumber}</Text>}</View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
} */
