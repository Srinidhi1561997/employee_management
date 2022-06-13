import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { Theme } from '@mui/material/styles';

export default function SnackbarMessage(props:any) {

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        props.setOpenSnackbar(false);
      };
  return (
    <React.Fragment>
      <CssBaseline />
      {/* TODO: Fix theme type in GlobalStyles */}
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: (theme as Theme).palette.background.paper },
        })}
      />
      <div>
        <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
          open={props.openSnackbar}
          autoHideDuration={6000}
          message={props.snackbarMessage}
          action={
            <Button color="primary" size="small" onClick={handleClose}>
              ok
            </Button>
          }
          sx={{ bottom: { xs: 90, sm: 0 } }}
        />
      </div>
    </React.Fragment>
  );
}
