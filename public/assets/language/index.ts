import english from "./english.json";
import norsk from "./norsk.json";

const languages = [english, norsk];

export function getLanguageInfo() {
    let basicInfo = languages.map((lang) => {
        return {
            langCode: lang.code,
            langName: lang.langName,
            icon: lang.icon,
        }
    })
    return basicInfo;
}