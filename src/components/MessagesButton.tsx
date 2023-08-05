import EmailIcon from '@mui/icons-material/Email';
import { Badge, IconButton } from '@mui/material';

export const Messages = () => {
    return (
        <IconButton>
            <Badge badgeContent={1} color="error">
                <EmailIcon />
            </Badge>
        </IconButton>
    )
}