import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { useDispatch } from 'react-redux'
import {searchEmployees} from "../../reducers/actions"
import useDebounce from "../dbounce";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

export default function SearchAppBar(props: any) {
    const [searchTerm, setSearchTerm] = React.useState('')
    const dispatch= useDispatch()

    const deBouncedText = useDebounce(searchTerm, 600);
    const isDelete = useAppSelector((state) => state.deleteEmployee.isDelete)
    const { searchKeyTerm } = props
    const searchHandler = (value: any) => {
        setSearchTerm(value.trim())
        searchKeyTerm(value.trim())
    }

    React.useEffect(()=>{
        if(isDelete){
            setSearchTerm('')
            searchKeyTerm('')
        }
    },[isDelete]);

    const clearSearch = () => {
        setSearchTerm('')
        searchKeyTerm('')
    }

    React.useEffect(()=>{
        if(deBouncedText!==''){
            dispatch(searchEmployees(deBouncedText));
        }
    },[deBouncedText]);


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
                        <MenuIcon />
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
                        Employee table
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Link
                            to="/create-employee"
                            style={{
                                color: '#fff',
                            }}
                        >
                            <PersonAddAlt1Icon />
                        </Link>
                    </IconButton>
                    <Search
                        onChange={(e) =>
                            searchHandler((e.target as HTMLInputElement).value)
                        }
                    >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search by..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchTerm}
                        />
                        <IconButton>
                            <ClearIcon
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => {
                                    clearSearch()
                                }}
                            />
                        </IconButton>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
