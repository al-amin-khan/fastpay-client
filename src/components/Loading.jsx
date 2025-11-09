
const Loading = () => {
    return (
        <div
            className="fixed inset-0 z-9999 grid place-items-center backdrop-blur-md bg-base-100/30"
            role="status"
            aria-live="polite"
        >
            <span className="loading loading-infinity loading-xl" />
        </div>
    );
};

export default Loading;