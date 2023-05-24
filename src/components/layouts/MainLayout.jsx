import Navbar from "../Navbar";

export default function MainLayout({children}) {
    return (
        <>
            <Navbar />
            <div className="mb-10 h-[calc(100vh-90px-40px)]">
                {children}
            </div>
        </>
    )
}