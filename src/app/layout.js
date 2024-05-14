import {Inter} from "next/font/google";
import "../styles/globals.css";
import StoreProvider from '@/app/storeProvider';
import {Suspense} from "react"; // Import StoreProvider from its path

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "DealFuel",
    description: "Connecting businesses and sales reps",
    icons: {
        icon: "/icon.ico",
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/* Wrap children with StoreProvider to make Redux store accessible */}

            <StoreProvider>
                {children}
            </StoreProvider>

        </body>
        </html>
    );
}
