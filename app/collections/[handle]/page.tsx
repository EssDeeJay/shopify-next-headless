export default function Page({params} : {params: {handle: string}}){
    return (
        <main className="flex min-h-screen flex-col">
            <div>
                Collection Route for {params.handle}
            </div>
        </main>
    )
}