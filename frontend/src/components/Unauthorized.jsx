import Navbar from "./Navbar";

export default function Unauthorized() {
    return (
        <div>
            <Navbar colour="#d52525" bgColour="#8b0000" />
            <div className="mt-50 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-red-600">403</h1>
                <p className="text-xl mt-2">You are not authorized to access this page</p>
            </div>
        </div>
    );
}
