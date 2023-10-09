import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const RomeSelectModal = ({ open, setmatierselectionner, setOpen, handleselectionrome, listrome }) => {
    return (
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              width: "80%",
              maxHeight: 435,
              overflow: "hidden",
            },
          }}
          maxWidth="xs"
          open={open}
        >
          <DialogTitle color="button.main">
            Sélectionner le code Rome
          </DialogTitle>
          <DialogContent dividers>
            <Autocomplete
              sx={{
                m: 2,
                width: "90%",
              }}
              disablePortal
              options={listrome}
              onChange={(e, value) => {
                if (value != null) {
                  setmatierselectionner(value);
                } else {
                  setmatierselectionner({});
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Rome"
                  name="rome"
                  variant="outlined"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={(e) => setOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleselectionrome}
              color="button"
              variant="contained"
              sx={{ color: "black.main" }}
            >
              Valider
            </Button>
          </DialogActions>
        </Dialog>
    );
};
export default RomeSelectModal;