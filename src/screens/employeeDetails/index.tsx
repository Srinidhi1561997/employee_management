 
import React, { useEffect } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Link, useNavigate } from 'react-router-dom'
import { visuallyHidden } from '@mui/utils'
import AlertDialog from "../../components/modal"
import {
    deleteEmployees,
    createEmployees,
    getEmployees,
    editSpecificEmployee
  } from "../../reducers/actions"
import SearchAppBar from '../../components/searchAppBar'
import { useAppSelector ,useAppDispatch} from '../../hooks'
import { employeeData } from '../../utils/interface'
import SnackbarMessage from "../../components/snackbar"
import DelayingAppearance from "../../components/circularProgressBar"



type Data = {
    designation: string
    email: string
    employee_id: string
    // employee_status: boolean;
    first_name: string
    gender: string
    last_name: string
    office_location: string
    emp_actions: number
    id:string
}

// function createData(
//     designation: string,
//     email: string,
//     employee_id: number,
//     first_name: string,
//     gender: string,
//     last_name: string,
//     office_location: string,
//     salary: number
// ): Data {
//     return {
//         designation,
//         email,
//         employee_id,
//         // employee_status,
//         first_name,
//         gender,
//         last_name,
//         office_location,
//         salary,
//     }
// }

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'employee_id',
        label: 'Emp Id',
    },
    {
        id: 'first_name',
        label: 'First name',
    },
    {
        id: 'last_name',
        label: 'Last name',
    },
    {
        id: 'email',
        label: 'E-mail',
    },
    {
        id: 'gender',
        label: 'Gender',
    },
    {
        id: 'designation',
        label: 'Designation',
    },
    {
        id: 'office_location',
        label: 'Office location',
    },
    {
        id: 'emp_actions',
        label: 'Actions',
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}


function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                        'aria-label': 'select all desserts',
                    }}
                />
            </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id && headCell.id !== 'emp_actions'? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id && headCell.id !== 'emp_actions'? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            style={{ fontWeight: 'bold' }}
                        >
                            {headCell.label}
                            { orderBy !== 'emp_actions' && orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}


function Home(): JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const employees = useAppSelector((state) => state.employee.employees)
    const isLoading = useAppSelector((state) => state.employee.isLoading)
    const isDelete = useAppSelector((state) => state.deleteEmployee.isDelete)
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('employee_id');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchResults, setSearchResults] = React.useState<Data[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [toggleLoader, setToggleLoader] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [deleteEmployee, setDeleteEmployee] = React.useState<employeeData>();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    console.log('emplo', employees);
    useEffect(()=>{
        dispatch(getEmployees())
    },[getEmployees])


    useEffect(() => {
        setSearchResults(employees);
    }, [employees]);

    useEffect(()=>{
        if(isDelete){
            setOpenSnackbar(true);
            dispatch(getEmployees())
        }
    },[isDelete]);
    
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        if(property !=='emp_actions'){
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    } else {
        // setOrder(null);
    }
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = searchResults.map((n) => n.first_name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, employee_id: string) => {
        const selectedIndex = selected.indexOf(employee_id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, employee_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchResults.length) : 0;

    const searchHandler = (term: string) => {
        setPage(0);
        setSearchTerm(term);
        if (searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length < 1) {
            setToggleLoader(true);
        }
        if (term === "") {
            setSearchResults(employees);
            setToggleLoader(true);
        }
        if (term.length >= 1) {
            const results = employees.filter((user:Data) => {
                return user.first_name.toLowerCase().startsWith(term.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            if (results.length > 0) {
                setSearchResults(results);
            } else {
                setSearchResults([{
                    designation: "",
                    email: "",
                    employee_id: '1',
                    first_name: "",
                    gender: "",
                    last_name: "",
                    office_location: "",
                    emp_actions:1,
                    id:''
                }]);
            }
        } else {
            setSearchResults(employees);
        }
    }

    const deleteFunction=(rowValue:employeeData)=>{
        // dispatch(deleteEmployees(rowValue.id));
        //     console.log('row value is', rowValue.id)
        setDeleteEmployee(rowValue);
        setOpenModal(true);
            // const result = deleteEmployee(rowValue.employee_id)
            // result.then((res)=>{
            //     console.log('response', res)
            //     dispatch({ type: GET_EMPLOYEES })
            // }).catch((error)=>{
            //     console.log('error',error)
            // })
    }

    console.log('searchResults are', searchResults)
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <SearchAppBar
                    searchKeyTerm={searchHandler} />
                    <AlertDialog openPopUp={openModal} 
                    setOpenModal={setOpenModal}
                    employee_name={`${deleteEmployee?.first_name} ${deleteEmployee?.last_name}`}
                    employee_data={deleteEmployee}
                    >
                        {/* <Typography>Are you sure, you want to delete {deleteEmployee?.first_name}</Typography> */}
                    </AlertDialog>
                    <DelayingAppearance loading={isLoading}/>
                    <SnackbarMessage openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} snackbarMessage={`${deleteEmployee?.first_name} ${deleteEmployee?.last_name} deleted successfully`}></SnackbarMessage>
                <TableContainer style={{ marginTop: "1%" }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={searchResults.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(searchResults, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    // const isItemSelected = isSelected(row.employee_id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.first_name)}
                                            // role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row?.employee_id}
                                        // selected={isItemSelected}
                                        >
                                            {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell> */}
                                            <TableCell align="left">{row?.employee_id === '1' ? '' : row?.employee_id}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            // padding="none"
                                            >
                                                {row.first_name}
                                            </TableCell>
                                            <TableCell align="left">{row.last_name}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.gender}</TableCell>
                                            <TableCell align="left">{row.designation}</TableCell>
                                            <TableCell align="left">{row.office_location}</TableCell>
                                            
                                                <TableCell align='right' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    {/* <Link to="/employee-details"> */}
                                                    {row?.employee_id === '1' ? <></> :
                                                
                                                    <IconButton>
                                                    <EditIcon
                                                        // className={classes.editIcon}
                                                        // onClick={() => editFunction(row, index)}
                                                        style={{cursor:'pointer', color:'blue'}}
                                                        onClick={() => [
                                                            // dispatch(getSpecificEmployee(row?.id)),
                                                            navigate('/update-employee', { state: { editUser: row } })]}
                                                    />
                                                    </IconButton>}
                                                    {/* </Link> */}
                                                    {row?.employee_id === '1' ? <></> :
                                                    <IconButton>
                                                    <DeleteIcon
                                                     style={{cursor:'pointer', color:'red'}}
                                                    // className={classes.deleteIcon}
                                                    onClick={() => deleteFunction(row)}
                                                    />
                                                    </IconButton>}
                                                </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {searchResults[0]?.employee_id === '1' ? null :
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={searchResults.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
            </Paper>
        </Box>
    )
}

export default Home
