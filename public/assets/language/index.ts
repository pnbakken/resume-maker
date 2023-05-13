import english from "./english.json";
import norsk from "./norsk.json";
const languages = [english, norsk];
import _ from "lodash";

export function getLanguageInfo() {
    let sortedLanguages = _.sortBy(languages, ["langName"]);
    let basicInfo = sortedLanguages.map((lang) => {
        return {
            langCode: lang.code,
            langName: lang.langName,
            icon: lang.icon,
        }
    })
    return basicInfo;
}