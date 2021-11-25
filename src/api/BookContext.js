import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

export const LANGUAGES = [
  'English',
  'Spanish',
  "Danish"
]

const bookContext = createContext([]);
const bookUpdateContext = createContext([]);

export default function BookProvider({ children }) {
  const [firstLanguage, setFirstLanguage] = useState(LANGUAGES[0]);
  const [secondLanguage, setSecondLanguage] = useState(LANGUAGES[1]);
  const [languageData, setLanguageData] = useState({ first: null, second: null });
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    axios
    .get('/data/book.json')
    .then((res) => {
      setBookData(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
    .get(`/data/translations/${firstLanguage}.json`)
    .then((res) => {
      setLanguageData(prev => ({ first: res.data, second: prev.second }) );
    })
    .catch((err) => console.log(err));
  }, [firstLanguage]);

  useEffect(() => {
    axios
    .get(`/data/translations/${secondLanguage}.json`)
    .then((res) => {
      setLanguageData(prev => ({ first: prev.first, second: res.data }) );
    })
    .catch((err) => console.log(err));
  }, [secondLanguage]);

  function changeFirstLanguage(newLanguage) {
    console.log(newLanguage);
    setFirstLanguage(newLanguage);
  }

  function changeSecondLanguage(newLanguage) {
    setSecondLanguage(newLanguage);
  }

  return (
    <bookUpdateContext.Provider value={{ changeFirstLanguage, changeSecondLanguage }}>
      <bookContext.Provider value={{ bookData, languageData }}>
        {children}
      </bookContext.Provider>
    </bookUpdateContext.Provider>
  );
}

export function useBook() {
  const { bookData, languageData } = useContext(bookContext);
  return { bookData, languageData };
}

export function useBookUpdate() {
  const { changeFirstLanguage, changeSecondLanguage } = useContext(bookUpdateContext);
  return { changeFirstLanguage, changeSecondLanguage };
}