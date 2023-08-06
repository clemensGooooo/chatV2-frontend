import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { useTheme } from '../providers/ThemeProvider';

export const ThemeSelecter = () => {
    const themeProvider = useTheme();
    
    return (<>
        {themeProvider.theme == "light" ?
            <IconButton onClick={() => themeProvider.setTheme("dark")} >
                <DarkModeIcon />
            </IconButton>
            :
            <IconButton onClick={() => themeProvider.setTheme("light")}>
                <LightModeIcon />
            </IconButton>
        }
    </>
    )
}