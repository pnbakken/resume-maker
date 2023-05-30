import { useEffect, useState } from "react";
import axios from "axios";
import pica from "pica";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Link as PDFLink,
  Font,
} from "@react-pdf/renderer";

import OswaldRegular from "@fontsource/oswald/files/oswald-latin-400-normal.woff";
import OswaldMedium from "@fontsource/oswald/files/oswald-latin-500-normal.woff";
import PoppinsLight from "@fontsource/poppins/files/poppins-latin-300-normal.woff";
import Montserrat from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff";
Font.register({
  family: "Oswald",
  fonts: [
    {
      src: OswaldRegular,
      fontWeight: 400,
      format: "woff",
    },
    {
      src: OswaldMedium,
      fontWeight: 500,
      format: "woff",
    },
  ],
});

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: PoppinsLight,
      fontWeight: 300,
      format: "woff",
    },
  ],
});
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: Montserrat,
      fontWeight: 400,
      format: "woff",
    },
  ],
});

function ResumeAsPDF({ resume, language }) {
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
    console.log(Font.getFont({ fontFamily: "Oswald" }));
  }, []);

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
    mediumDarkGrey: "#707070", //q: slightly lighter
    mediumGrey: "#c0c0c0",
    lightGrey: "#e0e0e0",
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
      fontFamily: "Montserrat",
    },
    pageContainer: {
      padding: "32px",
      width: "65%",
    },

    resumeHeader: {
      display: "flex",
      minHeight: "160px",
      flexDirection: "column",
      gap: "0",
      border: "1px solid red",
    },
    resumeHeaderName: {
      fontSize: "28px",
      fontWeight: 500,
      fontFamily: "Oswald",
    },
    resumeHeaderTitle: {
      fontFamily: "Poppins",
      fontWeigth: 300,
      fontSize: "16px",
      color: themeColours.mediumDarkGrey,
    },

    resumeProfile: {},
    resumeProfileText: {},
    pageSidebar: {
      backgroundColor: themeColours.primary,
      color: themeColours.white,
      width: "35%",
      padding: "32px",
    },
    sidebarHeader: {
      width: "100%",
      minHeight: "160px",
      display: "flex",
      alignItems: "center",
      border: "1px solid red",
    },
    sidebarHeaderImage: {
      borderRadius: "50%",
      objectFit: "cover",
    },

    sectionHeader: {
      fontSize: "24px",
      fontWeight: 400,
      fontFamily: "Oswald",
    },
  });

  return (
    <Document title={resumeName || ""}>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.resumeHeader}>
            <View>
              <Text style={styles.resumeHeaderName}>
                {firstName || ""} {lastName || ""}
              </Text>
            </View>
            <View>
              <Text style={styles.resumeHeaderTitle}>
                {desiredTitle.toUpperCase() || ""}
              </Text>
            </View>
          </View>
          <View style={styles.resumeProfile}>
            {personalIntroduction && (
              <View>
                <Text style={styles.sectionHeader}>Profile</Text>
                <Text>{personalIntroduction}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.pageSidebar}>
          <View style={styles.sidebarHeader}>
            <View>
              {resizedImage ? (
                //eslint-disable-next-line
                <Image
                  src={resizedImage}
                  style={[
                    styles.sidebarHeaderImage,
                    { width: "110px", height: "110px" },
                  ]}
                />
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ResumeAsPDF;
