import CurrencyProvider from "../context/CurrencyContextProvider";
import SavedProvider from "../context/LocalContextProvider";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CurrencyProvider>
            <SavedProvider>{children}</SavedProvider>
        </CurrencyProvider>
    );
}
