import Reader from "./components/Reader";
import Banner from "./components/Banner";
import BookProvider from "./api/BookContext";
import ViewportProvider from "./api/ViewportContext";

function App() {
  return (
    <ViewportProvider>
      <BookProvider>
        <Banner />
        <Reader />
      </BookProvider>
    </ViewportProvider>
  );
}

export default App;
