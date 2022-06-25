import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const rightLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

export default function Header({darkMode, handleThemeChange} : Props) {
    const {cart} = useStoreContext();
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0)


    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to='/' sx={{color: 'inherit', textDecoration: 'none'}}>
                        Ecom App
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>

                <Box display='flex' alignItems='center'>
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={{ 
                                    color: 'inherit', 
                                    typography: 'h6',
                                    '&:hover': {
                                        color:'text.secondary'
                                    },
                                    '&.active': {
                                        color: 'text.secondary'
                                    } 
                                }}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                    <IconButton component={Link} to='/cart' size='large' sx={{color:'inherit'}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
               
            </Toolbar>
        </AppBar>
    )
}