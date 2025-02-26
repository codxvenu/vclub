import "./globals.css"; // Import global styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hover from "./hover/page";
import Head from "next/head"; // Use Head for metadata

export const metadata = {
  title: "VClub - Buy CCs",
  description: "Looking to buy CCs? VClub offers secure and verified CCs at the best prices. Instant delivery and safe transactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Buy CCs, Secure CCs, Best CCs online, Cheap CCs for sale, VClub Shop, Unitedshop, Unitedshop.in" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* OpenGraph for Social Media Sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://unitedshop.in" />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="roboto">
        {children}

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {/* Hover Component */}
        <Hover />
      </body>
    </html>
  );
}
