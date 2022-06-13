import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Button from '@mui/material/Button';
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
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
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
