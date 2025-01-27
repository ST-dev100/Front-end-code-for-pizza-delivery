"use client"
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux"; // Import the Provider
import store from "./store"; // Import your store

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Pizza",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster 
          toastOptions={{
            // Customize default options for all toast messages
            duration: 5000, // Default duration
            style: {
              background: '#333', // Default background color
              color: '#fff',       // Default text color
            },
            success: {
              // Customize specific types of toasts (success)
              style: {
                background: 'green',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: 'green',
              },
            },
            error: {
              // Customize specific types of toasts (error)
              style: {
                background: 'red',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: 'red',
              },
            },
          }}
        />
        <Provider store={store}>

          {children}
        </Provider>
      </body>
    </html>
  ); 
}
