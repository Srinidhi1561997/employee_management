import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'

export default function AppHeader(props:any) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Link
                            to="/"
                            style={{
                                color: '#fff',
                            }}
                        >
                            <HomeIcon/>
                        </Link>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        {props.headerName}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
