import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

export const LANGUAGES = [
  "None",
  ...[
    'English',
    'Spanish',
    "Danish",
    "Thai",
    "Chinese",
    "Tagalog",
    "Urdu",
    "Turkish",
    "Punjabi",
    "Santali",
    "Vietnamese",
    "Malay",
    "Macedonian",
    "Bangla",
    "Croatian",
    "Greek",
    "Yoruba",
    "Serbian (Latin)",
    "Serbian (Cyrillic)",
    "Tamil",
    "Dutch",
    "Montenegrin (Latin)",
    "Montenegrin (Cyrillic)",
    "Indonesian",
    "Arabic",
    "Hindi",
    "Khmer",
    "Burmese"
  ].sort()
];

const DEFAULT_LANGUAGE = "English";

const bookContext = createContext([]);
const bookUpdateContext = createContext([]);

export default function BookProvider({ children }) {
  const [firstLanguage, setFirstLanguage] = useState(LANGUAGES[Math.floor(Math.random() * (LANGUAGES.length - 1)/2) + 1]);
  const [secondLanguage, setSecondLanguage] = useState(LANGUAGES[LANGUAGES.length - Math.floor(Math.random() * (LANGUAGES.length - 1)/2)]);
  const [defaultLanguage, setDefaultLanguage] = useState(null);
  const [languageData, setLanguageData] = useState({ first: null, second: null });
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    axios
    .get('./data/book.json')
    .then((res) => {
      setBookData(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
    .get(`./data/translations/${firstLanguage}.json`)
    .then((res) => {
      setLanguageData(prev => ({ first: res.data, second: prev.second }) );
    })
    .catch((err) => console.log(err));
  }, [firstLanguage]);

  useEffect(() => {
    axios
    .get(`./data/translations/${secondLanguage}.json`)
    .then((res) => {
      setLanguageData(prev => ({ first: prev.first, second: res.data }) );
    })
    .catch((err) => console.log(err));
  }, [secondLanguage]);

  useEffect(() => {
    axios
    .get(`./data/translations/${DEFAULT_LANGUAGE}.json`)
    .then((res) => {
      setDefaultLanguage(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  function changeFirstLanguage(newLanguage) {
    setFirstLanguage(newLanguage);
  }

  function changeSecondLanguage(newLanguage) {
    setSecondLanguage(newLanguage);
  }

  return (
    <bookUpdateContext.Provider value={{ changeFirstLanguage, changeSecondLanguage }}>
      <bookContext.Provider value={{ bookData, languageData, defaultLanguage }}>
        {children}
      </bookContext.Provider>
    </bookUpdateContext.Provider>
  );
}

export function useBook() {
  const { bookData, languageData, defaultLanguage } = useContext(bookContext);
  return { bookData, languageData, defaultLanguage };
}

export function useBookUpdate() {
  const { changeFirstLanguage, changeSecondLanguage } = useContext(bookUpdateContext);
  return { changeFirstLanguage, changeSecondLanguage };
}