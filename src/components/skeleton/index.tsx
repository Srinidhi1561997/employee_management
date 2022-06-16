import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Skeleton } from '@mui/material'

function EnhancedTableHead() {
   
    return (
        <TableHead>
            <TableRow>
               <TableCell >
                <Skeleton variant="text"/>
               </TableCell>  
               <TableCell >
                <Skeleton variant="text"/>
               </TableCell>    
               <TableCell>
                <Skeleton variant="text"/>
               </TableCell>    
               <TableCell >
                <Skeleton variant="text"/>
               </TableCell>    
               <TableCell >
                <Skeleton variant="text"/>
               </TableCell>  
               <TableCell>
                <Skeleton variant="text"/>
               </TableCell>    
               <TableCell>
                <Skeleton variant="text"/>
               </TableCell>    
               <TableCell>
                <Skeleton variant="text"/>
               </TableCell>    
            </TableRow>
        </TableHead>
    );
}


function SkeletonAnimation(): JSX.Element {
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer style={{ marginTop: "1%" }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead />
                        <TableBody>
                                        <TableRow>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align='left'><Skeleton variant="text"/></TableCell>
                                        </TableRow> 
                                        <TableRow>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align='left'><Skeleton variant="text"/></TableCell>
                                        </TableRow> 
                                        <TableRow>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align='left'><Skeleton variant="text"/></TableCell>
                                        </TableRow> 
                                        <TableRow>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align='left'><Skeleton variant="text"/></TableCell>
                                        </TableRow> 
                                        <TableRow>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align="left"><Skeleton variant="text"/></TableCell>
                                            <TableCell align='left'><Skeleton variant="text"/></TableCell>
                                        </TableRow>            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default SkeletonAnimation
