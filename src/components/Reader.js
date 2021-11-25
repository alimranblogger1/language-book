import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Page from "./Page";

import { useBook } from "../api/BookContext";

export default function Reader() {
  const {
    bookData,
    languageData
  } = useBook();

  if (!languageData?.first || !languageData?.second) {
    return (<></>)
  }

  return (
    <Carousel
      showThumbs={false}
    >
      {bookData.map((page, i) => (
        <Page
          key={i}
          imageName={page.image}
          text={
            languageData.first.text[page.id] ? 
            languageData.first.text[page.id].map((sentence, i) => (
              {
                first: sentence,
                second: languageData.second.text[page.id][i]
              }
            ))
            : []
          }
          textDisplay={page.textDisplay}
        />  
      ))}
    </Carousel>
  )
}