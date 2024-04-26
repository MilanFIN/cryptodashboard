import { getRates } from "../actions/crypto";
import CurrencyProvider from "../context/CurrencyContextProvider";
import SavedProvider from "../context/LocalContextProvider";

export default async function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const rates = await getRates();

    return (
        <CurrencyProvider rates={rates}>
            <SavedProvider>{children}</SavedProvider>
        </CurrencyProvider>
    );
}
