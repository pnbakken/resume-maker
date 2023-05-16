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
} from "@react-pdf/renderer";
import WorkingResumeContext from "@/context/working-resume-context";
import { useLanguage } from "@/context/language-context";

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
              document={<ResumeAsPDF resume={workingResume} />}
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

function ResumeAsPDF({ resume, language }) {
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    desiredTitle,
    country,
    city,
    personalIntroduction,
  } = resume.personal_details || {};

  const { resumeName, resumeLanguage } = resume || {};

  const themeColors = {
    primary: "#0d2d59",
    white: "#fafaff",
    darkGrey: "#1a1a2b",
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 0,
      backgroundColor: themeColors.white,
      color: themeColors.darkGrey,
      fontSize: "12px",
      fontWeight: 400,
    },
    pageContainer: {
      padding: "32px",
      width: "65%",
    },

    pageSidebar: {
      backgroundColor: themeColors.primary,
      color: themeColors.white,
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
      color: themeColors.primary,
    },

    whiteText: {
      color: themeColors.white,
    },
  });

  return (
    <Document title={resumeName || ""}>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.resumeHeader}>
            <View>
              {(firstName || lastName) && (
                <Text style={styles.resumeHeading}>
                  {firstName && firstName} {lastName && lastName}
                </Text>
              )}
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
}
