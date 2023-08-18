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

const CreateNewPosteModal = ({ open, onClose, onSubmit, metierlist, competancelist }) => {
    const formattedData = metierlist
    const formattedDatacode = competancelist
    const [newmetier, setNewnode] = useState({
        nom: "",
        code: ""
    });
    const handleChangeMetier = (event, value) => {
      setNewnode({ ...newmetier, metier_id: value.id });
    };
    const handleChangeCode = (event, value) => {
        setNewnode({ ...newmetier, competance_id: value.id });
    };
  
    const handleSubmit = () => {
      onSubmit(newmetier);
      onClose();
    };
  
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Crée un Poste</DialogTitle>
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
                options={formattedData}
                onChange={handleChangeMetier}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Code Métier" 
                        name="metier_id"
                        variant="outlined"
                    />
                )}
              />
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
                        label="Code competance" 
                        name="competance_id"
                        variant="outlined"
                    />
                )}
              />
              <Autocomplete
                sx={{
                    m: 2,
                    width: '90%',
                }}
                disablePortal
                options={["0", "1", "2", "3", "4", "5"]}
                onChange={(e, value) =>
                    setNewnode({ ...newmetier, niveau_competance: value })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Niveau Competance" 
                        name="niveau_competance"
                        variant="outlined"
                        
                    />
                )}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Crée un poste
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default CreateNewPosteModal