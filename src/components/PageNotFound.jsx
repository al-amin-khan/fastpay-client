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
                <div className="font-bold text-5xl text-base-100/80">Oops!</div>
                <img className="h-70 w-full" src="/404-page-not-found-1-66.svg" alt="error-404" />
                <div className="font-bold text-4xl -mt-10 text-base-100/80">Page Not Found</div>
                <button
                    className="bg-base-100/80 hover:bg-base-100 text-base-content font-bold py-2 px-4 rounded-full my-3" onClick={() => navigate(-1)}
                >
                    Back to previous page
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
