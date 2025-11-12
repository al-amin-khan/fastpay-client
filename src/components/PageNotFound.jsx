import { useNavigate } from "react-router";
import useHelmet from "../hooks/useHelmet";

const PageNotFound = () => {
    const HelmetTags = useHelmet({
        title: 'Not Found',
        description: 'Pay and manage your utility bills in one place.',
    });

    const navigate = useNavigate();

    return (
        <div
            className={`min-h-screen bg-[url('/layered-peaks-haikei.svg')] bg-no-repeat bg-cover bg-center`}
        >
            <div className="flex flex-col justify-center items-center w-full pt-10">
                <div className="font-bold text-5xl text-white/70">Oops!</div>
                <img className="h-70 w-full" src="/404-page-not-found-1-66.svg" alt="error-404" />
                <div className="font-bold text-4xl -mt-10 text-white/70">Page Not Found</div>
                <button
                    className="bg-white/70 hover:bg-white/90 text-black font-bold py-2 px-4 rounded-full my-3" onClick={() => navigate(-1)}
                >
                    Back to previous page
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;