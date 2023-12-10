import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";

// interface DialogProps {
//     handleConfirmationAction?: () => void;
//     handlePassiveAction?: () => void;
//     processConfirmationMessage?: string;
//     confirmButtonText?: string;
//     rejectButtonText?: string;
//     infoButtonText?: string;
//     maxWidth?: any;
//     confirmDeleteButtonText?: string;
//     children?: React.ReactChild;
// }

const InformationDialog = ({ name }: any) => {
  // const dispatch = useAppDispatch();
  const isInformationDialogOpen = false;
  const handleCloseDeleteDialog = () => {
    // dispatch(setIsInformationDialogOpen(false));
  };
  return (
    <>
      <Dialog
        maxWidth={"xs"}
        sx={{ borderRadius: "24px" }}
        onClose={handleCloseDeleteDialog}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={isInformationDialogOpen}
      >
        <DialogContent dividers>
          <IconButton
            onClick={handleCloseDeleteDialog}
            sx={{
              top: 15,
              right: 15,
              position: "absolute",
              bgcolor: "#181818",
              width: { xs: 22, sm: 40 },
              height: { xs: 22, sm: 40 },
            }}
          >
            <Close sx={{ color: "#A0A0A0", fontSize: { xs: 14, sm: 22 } }} />
          </IconButton>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default InformationDialog;
