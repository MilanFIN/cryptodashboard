

export default async function About({ params }: { params: { ids: string } }) {
    return (
        <main className=" min-h-screen ">
            <div>
				This page lists the most valuable cryptocurrencies by using the api
				from <a href="https://docs.coincap.io/">Coincap</a>
				</div>
        </main>
    );
}
