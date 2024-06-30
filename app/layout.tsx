import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/common/Provider";
import Header from "@/components/common/Header";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import localFont from "next/font/local";
import PrelineScript from "../components/common/PrelineScript";

const nexa = localFont({
  src: [
    {
      path: '../public/fonts/NexaText-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/NexaText-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NexaText-ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/NexaText-Thin.woff2',
      weight: '300',
      style: 'normal',
    }
  ]
})

export const metadata: Metadata = {
  title: "Greenworks Tools Dev - Headless",
  description: "Shopify Nextjs Storefront Custom Headless Built on top of Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <body className={`${nexa.className} antialiased`}>  
      <Provider>
        <AnnouncementBar />
        <Header />
            {children}    
        </Provider>
      </body>  
      <PrelineScript />    
    </html>
  );
}
