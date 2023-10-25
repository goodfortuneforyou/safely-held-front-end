import { ThemeProvider } from "next-themes";
import Script from "next/script";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <div className="pt-65">
        <Component {...pageProps} />
      </div>
    </div>
    <Script
      src="https://kit.fontawesome.com/9555f8b288.js"
      crossOrigin="anonymous"
    />
  </ThemeProvider>
);
export default App;
