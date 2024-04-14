import SavedProvider from "../context/LocalContextProvider";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
		<SavedProvider>
			{children}
		</SavedProvider>
);
}
