export default async function About({ params }: { params: { ids: string } }) {
    return (
        <main className=" min-h-screen ">
            <div>
                This page lists the most valuable cryptocurrencies by using the
                api from <a href="https://docs.coincap.io/">Coincap</a>
            </div>
            <div>
                For currency icons this page uses cryptocurrency-icons. See: 
                <a href="https://www.npmjs.com/package/cryptocurrency-icons">npmjs page</a>
            </div>
            <div>
                For all other icons, see <a href="https://www.radix-ui.com/icons">Radix UI</a>
            </div>
        </main>
    );
}
