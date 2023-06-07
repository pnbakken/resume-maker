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

function ResumeAsPDF({ resume, language, resizedImage }) {
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    desiredTitle,
    country,
    city,
    personalIntroduction,
    personalLinks,
  } = (resume && resume.personal_details) || {};

  const { skills, interests, languages } = resume || {};

  const { resumeName, resumeLanguage } = resume || {};

  const [displayOrder, setDisplayOrder] = useState([
    "employment_history",
    "education",
  ]);

  useEffect(() => {
    console.log(Font.getFont({ fontFamily: "Oswald" }));
  }, []);

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

      backgroundColor: themeColours.white,
      color: themeColours.darkGrey,
      fontSize: "10px",
      fontWeight: 400,
      fontFamily: "Nunito Sans",
      padding: 0,
    },
    pageContainer: {
      paddingLeft: "40px",
      paddingRight: "32px",
      width: "70%",
      paddingTop: "0",
      paddingBottom: "8px",
    },

    resumeHeader: {
      display: "flex",
      flexDirection: "row",
      gap: "16px",
      minHeight: "80px",
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
      color: themeColours.darkGrey,
      marginBottom: "16px",
    },

    resumeMainBody: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    mainBodySection: {},

    resumeProfile: {},
    resumeProfileText: {},
    employmentHistory: {},
    pageSidebar: {
      backgroundColor: themeColours.primary,
      color: themeColours.white,
      width: "30%",
      padding: "32px 24px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "8px",
      position: "relative",
    },
    sidebarHeader: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      minHeight: "80px",
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
      gap: "40px",
    },

    sidebarSection: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },

    sectionHeader: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Oswald",
      marginBottom: "4px",
    },

    list: {},
    listItems: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },

    listItem: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "3px",
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

    pageNumbers: {
      position: "absolute",
      bottom: "0",
      right: "0",
      textAlign: "center",
      color: themeColours.mediumGrey,
      zIndex: "1",
    },

    flexRow: {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      alignItems: "center",
    },

    whiteText: { color: themeColours.white },

    blocker: {
      height: "32px",
    },
  });

  if (!resume) return null;

  return (
    <Document title={resumeName || ""}>
      <Page size="A4" style={styles.page}>
        <View wrap style={styles.pageContainer}>
          <View style={styles.blocker} fixed></View>
          <View style={styles.resumeHeader}>
            {resizedImage ? (
              <View>
                <Image src={resizedImage} style={styles.sidebarHeaderImage} />
              </View>
            ) : (
              ""
            )}

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
            <View style={[styles.resumeProfile, styles.mainBodySection]}>
              {personalIntroduction && (
                <View>
                  <Text style={styles.sectionHeader}>{language.profile}</Text>
                  <Text>{personalIntroduction}</Text>
                </View>
              )}
            </View>

            {displayOrder.map((section, index) => {
              if (resume[section] && resume[section].length > 0) {
                return (
                  <ListDisplay
                    list={resume[section]}
                    listHeader={language[section]}
                    language={language}
                    commonStyles={styles}
                    key={index}
                  />
                );
              } else return null;
            })}

            {resume.references &&
              (resume.references.length > 0 || resume.referencesOnRequest) && (
                <References
                  list={resume.references}
                  commonStyles={styles}
                  title={language.references}
                  onRequest={resume.referencesOnRequest}
                  language={language}
                />
              )}
          </View>
          <View style={styles.blocker} fixed></View>
        </View>

        <View style={styles.pageSidebar}>
          <View style={styles.sidebarHeader}></View>
          <View style={styles.sidebarBody}>
            {(phoneNumber || emailAddress || city || country) && (
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
            )}
            {personalLinks.length > 0 && (
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
            )}
            {skills && skills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sectionHeader}>{language.skills}</Text>
                {skills &&
                  skills.map((skill, index) => {
                    return <Text key={index}>{skill.name}</Text>;
                  })}
              </View>
            )}
            {languages && languages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sectionHeader}>{language.languages}</Text>
                {languages.map((language, index) => {
                  return <Text key={index}>{language.name}</Text>;
                })}
              </View>
            )}
            {interests && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sectionHeader}>{language.interests}</Text>
                <Text>{interests}</Text>
              </View>
            )}
          </View>
          <View style={styles.blocker} fixed></View>
        </View>
      </Page>
    </Document>
  );
}

export default ResumeAsPDF;

function ListDisplay({ list, listHeader = "", language, commonStyles }) {
  const styles = StyleSheet.create({
    ...commonStyles,
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

function References({ list, commonStyles, title, onRequest, language }) {
  const styles = StyleSheet.create({
    ...commonStyles,
    twoRow: {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
    },
  });

  return (
    <View style={styles.mainBodySection}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {!onRequest ? (
        <View style={styles.listItems}>
          {list.map((reference, index) => {
            if (reference.referenceName) {
              return (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.itemTitle}>
                    {reference.referenceName}
                    {reference.referenceCompany &&
                      ` - ${reference.referenceCompany}`}
                  </Text>

                  {reference.referencePosition && (
                    <Text>{reference.referencePosition}</Text>
                  )}
                  {reference.phone && <Text>{reference.phone}</Text>}
                  {reference.email && <Text>{reference.email}</Text>}
                </View>
              );
            } else return null;
          })}
        </View>
      ) : (
        <Text>{language.referencesOnRequest}</Text>
      )}
    </View>
  );
}
