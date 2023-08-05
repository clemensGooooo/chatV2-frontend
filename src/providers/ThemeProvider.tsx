import { ThemeProvider as ThemeProv } from "@emotion/react";
import { Box, createTheme, Theme, useMediaQuery } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export const dark = createTheme({
    palette: {
        mode: 'dark',

    }
});

export const themeLight = createTheme({
    palette: {
        mode: 'light'
    },
});

type TypesTheme = "dark" | "light"; // Change this for a new theme



export const ThemeData: {
    theme: TypesTheme,
    setTheme: Dispatch<SetStateAction<TypesTheme>>
} = {
    theme: "light",
    setTheme: () => { }
}

export const ThemeContext = React.createContext(ThemeData);

export const ThemeProvider = (props: { children: React.ReactNode }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [theme, setTheme] = useState(localStorage.getItem("theme") as TypesTheme || prefersDarkMode);

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme]);

    const current_theme = (): Theme => {
        switch (theme) {
            case "dark":
                return dark;
            default:
                return themeLight;
        }
    }
    return (
        <ThemeContext.Provider value={{ theme: theme, setTheme }}>
            <ThemeProv theme={current_theme}>
                <Box sx={{ width: "100vw", height: "100vh", backgroundColor: current_theme().palette.background.default }}>
                    {props.children}
                </Box>
            </ThemeProv>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext);