import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from 'react-query';
import { rqDeleteEmployees } from '../../reactQuery/apiCalls';

export default function AlertDialog(props:any) {

  const{mutate:deleteEmployee,isSuccess} = useMutation(['delete_employee_id',props?.employee_data?.id], ()=>rqDeleteEmployees(props.employee_data.id));

  useEffect(()=>{
    if(isSuccess){
        props.refetchEmpolyees('get_employees')
    }
  },[isSuccess]);

  const handleClose = () => {
    props.setOpenModal(false);
  };

  const handleAgree = () =>{
    if(props?.employee_data?.id){
        deleteEmployee()
    }
    props.setOpenModal(false);
  }

  return (
    <div>
      <Dialog
        open={props.openPopUp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',}}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure, you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontWeight:'bold'}}>
                {props.employee_name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
