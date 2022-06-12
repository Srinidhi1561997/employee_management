import { makeStyles } from '@mui/material/styles';
export const useStyles = makeStyles((theme) => ({
    passwordHeader:{
        fontFamily: 'open sans',
        fontStyle: 'normal',
        fontWeight: 'Bold',
        fontSize:'16px',
        lineHeight: '16px',
        textAlign: 'center',
        color: '#000000',
        padding: '0px',
        marginTop: '1%'
    },
    passwordText:{
        fontFamily: 'open sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '16px',
        textAlign: 'center',
        color: '#000000',
        padding: '0px',
        marginTop: '10%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    dialog:{
        width: '100vh',
        height: '65%',
        alignSelf:'center',
        background: '#FFFFFF',
        border: '1px solid #C4C4C4',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        overflow: 'hidden',
    },
    passwordLabel:{
        fontFamily: 'open sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '16px',
        textAlign: 'left',
        color: '#000000',
        padding: '0px',
        marginTop: '4%',
        marginBottom:'2%'
    },
    passwordCondition:{        
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '102%',
        textAlign:'left',
        paddingTop:'5px',
        paddingBotton:'5px'
    },
    passwordTextInput:{
        fontFamily: 'open sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        marginBottom: '5%',
        justifyContent: 'center',
        width: '350px',
        height: '40px',
        border: '1px solid #C4C4C4',
        boxSizing: 'border-box',
        borderRadius: '3px',
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000",         
        },
        "& -ms-reveal":{
            display:'none'
        }
    },
    EyeIcon:{
      justifyContent:'flex-end',
      textAlign:'right',
      background:'pink'
    },
    TickIcon:{
        marginTop:'1px',
        marginRight:'5px',
        textAlign:'left',
        paddingTop:'5px',
        paddingBotton:'8px'
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    passwordConditionText:{
        display:'flex',
        flexDirection:'row',
    },
    passwordResetContainer:{
        display:'flex',
        justifyContent:'space-around', 
        marginLeft:'13%', 
        marginRight:'13%'
    },
    snackbar: {
        bottom: 50,
    }
  }));