import { createContext, useContext, useEffect, useState } from 'react';
import es from '../langs/es.json';
import en from '../langs/en.json';

const LangContext = createContext();

const LangProvider = ({ children }) => {
    const langs = {
        es,
        en,
    }

    const [lang, setLang] = useState(window.localStorage.getItem('lang') ?? navigator.language.split('-')[0]);
    const [langValues, setLangValues] = useState(langs[lang] ?? langs['en']);

    useEffect(() => {
        setLangValues(langs[lang] ?? langs['en']);
    }, [lang]);

    const setLangAndSave = (lang) => {
        window.localStorage.setItem('lang', lang);
        setLang(lang);
    }

    return (
        <LangContext.Provider value={{ langValues, setLang: setLangAndSave, lang }}>
            {children}
        </LangContext.Provider>
    );
};

const useLangContext = () => {
    return useContext(LangContext);
}

export { LangProvider, useLangContext };