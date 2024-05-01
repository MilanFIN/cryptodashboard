import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
    locales: ["en", "fi"],

    // Used when no locale matches
    defaultLocale: "en",
    localePrefix,
});

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(fi|en)/:path*"],
};
