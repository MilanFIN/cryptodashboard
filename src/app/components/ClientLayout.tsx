import { NextIntlClientProvider, useMessages } from "next-intl";
import { Rate } from "../actions/crypto";
import CurrencyProvider from "../context/CurrencyContextProvider";
import SavedProvider from "../context/LocalContextProvider";

export default function ClientLayout(props: {
    children: React.ReactNode;
    rates: Rate[];
    locale: string;
}) {

    const messages = useMessages();

    return (
        <NextIntlClientProvider locale={props.locale} messages={messages}>
            <CurrencyProvider rates={props.rates}>
                <SavedProvider>{props.children}</SavedProvider>
            </CurrencyProvider>
        </NextIntlClientProvider>
    );
}
