import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import ReduxProvider from "./providers/reduxProvider";

export const metadata = {
  title: "Resto - Food Delivery App",
  description: "Order food online from your favorite restaurants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
