import Dropdown from "./Dropdown";
import { LANGUAGES } from "../api/BookContext";
import { useBookUpdate, useBook } from "../api/BookContext";

export default function Banner() {
  const {
    changeFirstLanguage,
    changeSecondLanguage
  } = useBookUpdate();

  const { languageData } = useBook();

  return (
    <div
      style={
        {
          width: '100%',
          height: '80px',
          margin: '0 auto 0',
          padding: '0 10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          backgroundColor: '#fafafa',
          boxShadow: 'inset 30px 0 30px #fff',
          border: '1px solid #eee',
          boxSizing: 'border-box'
        }
      }
    >
      <h2 style={{ fontSize: '20px' }}>
        Choose Languages:
      </h2>
      <Dropdown
        value={languageData.first?.languageName}
        options={LANGUAGES.filter((lang) => lang !== languageData.first?.languageName)}
        onChange={(val) => changeFirstLanguage(val)}
      />
      <Dropdown
        value={languageData.second?.languageName}
        options={LANGUAGES.filter((lang) => lang !== languageData.second?.languageName)}
        onChange={(val) => changeSecondLanguage(val)}
      />
    </div>
  )
}