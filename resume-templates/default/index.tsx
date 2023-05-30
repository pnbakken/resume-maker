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
      fontFamily: "Oswald",
    },
    pageContainer: {
      padding: "32px",
      width: "65%",
    },
  });

  return (
    <Document title={resumeName || ""}>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}></View>
      </Page>
    </Document>
  );
}

export default ResumeAsPDF;
