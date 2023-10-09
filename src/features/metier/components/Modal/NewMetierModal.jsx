import React, {useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Autocomplete
} from '@mui/material';

const CreateNewMetierModal = ({ open, onClose, onSubmit, metierlist, codelist }) => {
    const formattedData = metierlist
    const formattedDatacode = codelist
    const [newmetier, setNewnode] = useState({
        nom: "",
        code: ""
    });
    const handleChangeMetier = (event, value) => {
      if (value != null) setNewnode({ ...newmetier, nom: value.label });
    };
    const handleChangeCode = (event, value) => {
      if (value != null)  setNewnode({ ...newmetier, code: value.label });
    };
  
    const handleSubmit = () => {
      onSubmit(newmetier);
      onClose();
    };
  
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Crée un métier</DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              <Autocomplete
                sx={{
                    m: 2,
                    width: '90%',
                }}
                disablePortal
                options={formattedDatacode}
                onChange={handleChangeCode}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Code" 
                        name="code"
                        variant="outlined"
                    />
                )}
              />
              <Autocomplete
                sx={{
                    m: 2,
                    width: '90%',
                }}
                freeSolo
                disablePortal
                options={formattedData}
                onChange={handleChangeMetier}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Nom" 
                        name="nom"
                        variant="outlined"
                        onChange={(e) =>
                           setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                        }
                    />
                )}
              />
              <TextField
                key="description_c"
                label="description courte"
                name="description_c"
                onChange={(e) =>
                  setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    m: 2,
                    width: '90%',
                }}
              />
              <TextField
                key="description_l"
                label="description long"
                name="description_l"
                onChange={(e) =>
                    setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    m: 2,
                    width: '90%',
                }}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Crée un métier
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default CreateNewMetierModal