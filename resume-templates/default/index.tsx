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
import PoppinsMedium from "@fontsource/poppins/files/poppins-latin-500-normal.woff";
import PoppinsRegular from "@fontsource/poppins/files/poppins-latin-400-normal.woff";
import Montserrat from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff";
import RobotoRegular from "@fontsource/roboto/files/roboto-latin-400-normal.woff";
import InterRegular from "@fontsource/inter/files/inter-latin-400-normal.woff";
import RalewayRegular from "@fontsource/raleway/files/raleway-latin-400-normal.woff";
import NunitoSansRegular from "@fontsource/nunito-sans/files/nunito-sans-latin-400-normal.woff";
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
    {
      src: PoppinsRegular,
      fontWeight: 400,
      format: "woff",
    },
    {
      src: PoppinsMedium,
      fontWeight: 500,
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
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoRegular,
      fontWeight: 400,
      format: "woff",
    },
  ],
});
Font.register({
  family: "Inter",
  fonts: [
    {
      src: InterRegular,
      fontWeight: 400,
      format: "woff",
    },
  ],
});
Font.register({
  family: "Raleway",
  fonts: [
    {
      src: RalewayRegular,
      fontWeight: 400,
      format: "woff",
    },
  ],
});
Font.register({
  family: "Nunito Sans",
  fonts: [
    {
      src: NunitoSansRegular,
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
    personalLinks,
  } = resume.personal_details || {};

  const { employment_history } = resume.employment_history || {};

  const { resumeName, resumeLanguage } = resume || {};

  const [resizedImage, setResizedImage] = useState("");

  const [displayOrder, setDisplayOrder] = useState([
    "employment_history",
    "education",
  ]);

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
      fontSize: "10px",
      fontWeight: 400,
      fontFamily: "Nunito Sans",
    },
    pageContainer: {
      paddingTop: "8px",
      paddingLeft: "32px",
      paddingRight: "32px",
      width: "70%",
    },

    resumeHeader: {
      display: "flex",
      flexDirection: "row",
      gap: "16px",
      minHeight: "96px",
      alignItems: "center",
      marginBottom: "8px",
    },
    resumeHeaderName: {
      fontSize: "24px",
      fontWeight: 400,
      fontFamily: "Oswald",
    },
    resumeHeaderTitle: {
      fontFamily: "Poppins",
      fontWeight: 300,
      fontSize: "8px",
      color: themeColours.mediumDarkGrey,
      marginBottom: "16px",
    },

    resumeMainBody: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    resumeProfile: {},
    resumeProfileText: {},
    employmentHistory: {},
    pageSidebar: {
      backgroundColor: themeColours.primary,
      color: themeColours.white,
      width: "30%",
      padding: "8px 24px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "8px",
    },
    sidebarHeader: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      minHeight: "96px",
    },
    sidebarHeaderImage: {
      borderRadius: "50%",
      objectFit: "cover",
      width: "56px",
      height: "56px",
    },

    sidebarBody: {
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    },

    sidebarSection: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },

    sectionHeader: {
      fontSize: "16px",
      fontWeight: 400,
      fontFamily: "Oswald",
      marginBottom: "4px",
    },

    itemTitle: {
      fontFamily: "Poppins",
      fontWeight: 500,
    },

    itemDate: {
      fontFamily: "Poppins",
      fontWeight: 300,
      fontSize: "8px",
      color: themeColours.mediumDarkGrey,
    },

    itemLocation: {
      fontFamily: "Poppins",
      fontWeight: 300,
      fontSize: "8px",
    },

    flexRow: {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      alignItems: "center",
    },

    whiteText: { color: themeColours.white },
  });

  return (
    <Document title={resumeName || ""}>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.resumeHeader}>
            <View>
              {resizedImage ? (
                //eslint-disable-next-line
                <Image src={resizedImage} style={styles.sidebarHeaderImage} />
              ) : (
                ""
              )}
            </View>
            <View>
              <Text style={styles.resumeHeaderName}>
                {firstName || ""} {lastName || ""}
              </Text>
              <Text style={styles.resumeHeaderTitle}>
                {desiredTitle.toUpperCase() || ""}
              </Text>
            </View>
          </View>
          <View style={styles.resumeMainBody}>
            <View style={styles.resumeProfile}>
              {personalIntroduction && (
                <View>
                  <Text style={styles.sectionHeader}>{language.profile}</Text>
                  <Text>{personalIntroduction}</Text>
                </View>
              )}
            </View>

            {displayOrder.map((section, index) => {
              return (
                <ListDisplay
                  list={resume[section]}
                  listHeader={language[section]}
                  language={language}
                  commonStyles={styles}
                  key={index}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.pageSidebar}>
          <View style={styles.sidebarHeader}></View>
          <View style={styles.sidebarBody}>
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionHeader}>{language.details}</Text>
              <Text>{city || ""}</Text>
              <Text>{country || ""}</Text>
              <Text>{phoneNumber || ""}</Text>
              <PDFLink
                src={`mailto:${emailAddress || ""}`}
                style={styles.whiteText}
              >
                {emailAddress || ""}
              </PDFLink>
            </View>
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionHeader}>{language.links}</Text>
              {personalLinks &&
                personalLinks.map((link, index) => {
                  return (
                    <PDFLink
                      src={link.url}
                      style={styles.whiteText}
                      key={index}
                    >
                      {link.name}
                    </PDFLink>
                  );
                })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ResumeAsPDF;

function ListDisplay({ list, listHeader = "", language, commonStyles }) {
  const styles = StyleSheet.create({
    ...commonStyles,
    list: {
      marginBottom: "8px",
    },
    listItems: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  });

  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.sectionHeader}>{listHeader}</Text>
      </View>
      <View style={styles.listItems}>
        {list.map((item, index) => {
          return (
            <ListItem
              item={item}
              language={language}
              commonStyles={styles}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
}

function ListItem({ item, language, commonStyles }) {
  const styles = StyleSheet.create({
    ...commonStyles,
    listItem: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "4px",
    },
    listItemHeader: {},
  });

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemHeader}>
        <Text style={styles.itemTitle}>
          {`${item.position} -` || ""} {`${item.itemName}` || ""}
        </Text>
        <Text style={styles.itemLocation}>{`${item.location}` || ""}</Text>
        <Text style={styles.itemDate}>
          {`${item.startDate} -` || ""} {item.ongoing ? "" : item.endDate || ""}
        </Text>
      </View>
      <View>
        <Text>{item.description || ""}</Text>
      </View>
    </View>
  );
}
