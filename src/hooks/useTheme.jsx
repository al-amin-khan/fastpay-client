import { useEffect, useState } from "react";

const KEY = "theme"; // "light" | "dark"

const systemPref = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

export default function useTheme() {
    const [theme, setTheme] = useState(() => localStorage.getItem(KEY) || systemPref());

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(KEY, theme);
    }, [theme]);

    // Optional: react to system changes when user didn't force a choice
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => {
            if (!localStorage.getItem(KEY)) setTheme(systemPref());
        };
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);

    const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
    return { theme, setTheme, toggle };
}
