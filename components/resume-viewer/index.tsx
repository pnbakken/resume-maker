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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

Font.register({
  family: "Inter",
  src: "/assets/fonts/inter/Inter-VariableFont_slnt,wght.ttf",
});

const ResumeViewer = () => {
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumePDF, setResumePDF] = useState(null);
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
    <div className="full-width">
      <div className="full-width flex-r tw-my-5">
        <Link href="/resume/">Edit</Link>
      </div>

      {workingResume && (
        <PDFViewer
          style={{
            width: "100%",
            minHeight: "100vh",
            borderRadius: "10px",
          }}
        >
          <ResumeAsPDF resume={workingResume} />
        </PDFViewer>
      )}
    </div>
  );
};

export default ResumeViewer;

function ResumeAsPDF({ resume }) {
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    desiredTitle,
    country,
    city,
  } = resume.personal_details ? resume.personal_details : null;

  const themeColors = {
    primary: "#0d5ead",
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
      fontSize: "14px",
      fontWeight: 400,
    },
    pageContainer: {
      padding: "32px",
    },

    pageSidebar: {
      backgroundColor: themeColors.primary,
      width: "25%",
    },
    view: {},
    resumeHeader: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    resumeHeading: {
      fontSize: "24px",
      fontWeight: 600,
    },

    headingDetails: {
      display: "flex",
      gap: "8px",
    },

    desiredTitle: {
      fontSize: "16px",
      fontWeight: "extralight",
    },

    link: {
      color: themeColors.primary,
    },
  });

  return (
    <Document>
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
            {(emailAddress || phoneNumber) && (
              <View style={styles.headingDetails}>
                <View>
                  {emailAddress && (
                    <Text>
                      <PDFLink
                        src={`mailto:${emailAddress}`}
                        style={styles.link}
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
        </View>
        <View style={styles.pageSidebar}>
          <Text></Text>
        </View>
      </Page>
    </Document>
  );
}
