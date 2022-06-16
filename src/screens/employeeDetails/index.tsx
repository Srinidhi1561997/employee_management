 
import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate ,useLocation} from 'react-router-dom'
import { visuallyHidden } from '@mui/utils'
import AlertDialog from "../../components/modal"
import { getEmployees } from "../../reducers/actions"
import SearchAppBar from '../../components/searchAppBar'
import { useAppSelector ,useAppDispatch } from '../../hooks'
import { employeeData } from '../../utils/interface'
import SnackbarMessage from "../../components/snackbar"
import PersistentDrawerRight from "../../components/drawer"
import SkeletonAnimations from "../../components/skeleton"
import { Skeleton } from '@mui/material'
import { Data } from "../../utils/interface"
import { headCells } from "../../utils/constants"
import {useQuery} from "react-query"
import {rqGetEmployees,rqDeleteEmployees} from '../../reactQuery/apiCalls';


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

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    // rowCount: number;
}


function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, onRequestSort } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
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


function Home(): JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const {isLoading,data,refetch, isError, isSuccess} = useQuery('get_employees', rqGetEmployees,{
        refetchOnWindowFocus:true
    });

    // const employees = useAppSelector((state) => state.employee.employees)
    const employees=data?.data;
    const filterEmployees:employeeData[] = useAppSelector((state) => state.searchEmployee.employees)
    // const isLoading = useAppSelector((state) => state.employee.isLoading)
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
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [editUser, setEditUser] = React.useState({});

    useEffect(() => {
        console.log('wertyu',data?.data)
        if(data?.data?.length){
            setSearchResults(data?.data);
        }
    }, [data?.data]);

    useEffect(()=>{
        if(isDelete){
            setOpenSnackbar(true);
            refetch()
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
        if (term === "") {
            console.log('1',isError, isLoading, isSuccess)
            setSearchResults(data?.data);
            setToggleLoader(true);
        }
        // if (term.length >= 1) {
        //     console.log('filter employees in the handler', filterEmployees)
        //     if (filterEmployees.length > 0) {
        //         setSearchResults(filterEmployees);
        //     } else {
        //         setSearchResults([{
        //             designation: "",
        //             email: "",
        //             employee_id: '1',
        //             first_name: "",
        //             gender: "No results found",
        //             last_name: "",
        //             office_location: "",
        //             emp_actions:1,
        //             id:''
        //         }]);
        //     }
        // } else {
        //     setSearchResults(employees);
        // }
    }

    const deleteFunction=(rowValue:employeeData)=>{
        setDeleteEmployee(rowValue);
        setOpenModal(true);
    }

    React.useEffect(()=>{
        if(Object.values(editUser).length>0){
            setOpenDrawer(true)
        }
    },[editUser])

    React.useEffect(()=>{
        if(openDrawer===false){
            setEditUser({});
        }
    },[openDrawer]);

    console.log('rprint the searchUser', searchResults,data)
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <SearchAppBar
                    searchKeyTerm={searchHandler}  setSearchResults={setSearchResults}/>
                    <AlertDialog openPopUp={openModal} 
                    setOpenModal={setOpenModal}
                    employee_name={`${deleteEmployee?.first_name} ${deleteEmployee?.last_name}`}
                    employee_data={deleteEmployee}
                    refetchEmpolyees={refetch}
                    >
                    </AlertDialog>
                    <PersistentDrawerRight openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} editUser={editUser} setEditUser={setEditUser}/>
                    {/* <DelayingAppearance loading={isLoading}/> */}
                    <SnackbarMessage openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} snackbarMessage={`${deleteEmployee?.first_name} ${deleteEmployee?.last_name} deleted successfully`}></SnackbarMessage>
                {isLoading?<SkeletonAnimations/>:
                <TableContainer style={{ marginTop: "1%" }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected?.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            // rowCount={searchResults?.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(searchTerm?filterEmployees:searchResults, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.first_name)}
                                            tabIndex={-1}
                                            key={row?.employee_id}
                                        >
                                            <TableCell align="left">{row?.employee_id === '1' ? '' : row?.employee_id}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.first_name}
                                            </TableCell>
                                            <TableCell align="left">{row.last_name}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.gender}</TableCell>
                                            <TableCell align="left">{row.designation}</TableCell>
                                            <TableCell align="left">{row.office_location}</TableCell>
                                            
                                                <TableCell align='left' style={{ justifyContent: 'space-between' }}>
                                                    {row?.employee_id === '1' ? <></> :
                                                
                                                    <IconButton>
                                                    <EditIcon
                                                        style={{cursor:'pointer', color:'blue'}}
                                                        onClick={() => [
                                                            setEditUser(row),                                                         
                                                            // navigate('/update-employee', { state: { editUser: row, pageNumber: page} })
                                                        ]}
                                                    />
                                                    </IconButton>}
                                                    {row?.employee_id === '1' ? <></> :
                                                    <IconButton>
                                                    <DeleteIcon
                                                     style={{cursor:'pointer', color:'red'}}
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
                </TableContainer> }
                {isLoading?<Skeleton variant='text' style={{width:'30%',display:'flex', justifySelf: 'flex-end', marginLeft: '80%'}}/>:
                <>
                {/* {searchResults[0]?.employee_id === '1' ? null : */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={searchTerm?filterEmployees?.length:searchResults?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* } */}
                    </>}
            </Paper>
        </Box>
    )
}

export default Home
