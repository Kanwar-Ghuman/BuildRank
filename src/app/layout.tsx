import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuildRank — Post Projects. Get Rated. Climb the Leaderboard.",
  description:
    "Share what you've built, discover what others are building, and vote on the best. Tinder-style feed, community ratings, and leaderboards for builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#111114",
          colorInputBackground: "#1a1a1f",
          colorInputText: "#f5f5f5",
          colorText: "#f5f5f5",
          colorTextSecondary: "#777",
          colorPrimary: "#d4943a",
          colorDanger: "#ef4444",
          colorTextOnPrimaryBackground: "#111",
          borderRadius: "0.75rem",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "14px",
        },
        elements: {
          card: {
            backgroundColor: "#111114",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
          },
          headerTitle: { color: "#fff", fontWeight: 700 },
          headerSubtitle: { color: "#777" },
          socialButtonsBlockButton: {
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f5f5f5",
          },
          socialButtonsBlockButtonText: { color: "#f5f5f5", fontWeight: 500 },
          formFieldInput: {
            backgroundColor: "#1a1a1f",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f5f5f5",
          },
          formButtonPrimary: {
            backgroundColor: "#d4943a",
            color: "#111",
            fontWeight: 600,
          },
          footerActionLink: { color: "#d4943a" },
          dividerLine: { backgroundColor: "rgba(255,255,255,0.06)" },
          dividerText: { color: "#555" },
          formFieldLabel: { color: "#999" },
          identityPreviewEditButton: { color: "#d4943a" },
          formResendCodeLink: { color: "#d4943a" },
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
