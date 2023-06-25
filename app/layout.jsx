import "@style/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

export const metadeta = {
  title: "Promptly",
  description: "Bleh bleh bleh",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <Provider>
          <main className="app">
            <Nav />
            {children}
            <Footer/>
          </main>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
