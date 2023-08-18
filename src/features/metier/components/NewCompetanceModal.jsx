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

const CreateNewCompetanceModal = ({ open, onClose, onSubmit, codelist }) => {
    const formattedDatacode = codelist
    const [newmetier, setNewnode] = useState({
        class: "",
        code: ""
    });
  
    const handleSubmit = () => {
      onSubmit(newmetier);
      onClose();
    };

    const handleChangeCode = (event, value) => {
        setNewnode({ ...newmetier, code: value.label });
    };
    
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Crée une competance</DialogTitle>
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
                freeSolo
                onChange={handleChangeCode}
                options={formattedDatacode}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Source" 
                        name="code"
                        variant="outlined"
                        onChange={(e) =>
                            setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                        }
                    />
                )}
              />
              <Autocomplete
                sx={{
                    m: 2,
                    width: '90%',
                }}
                disablePortal
                options={["Savoirs", "Savoirs Faire", "Savoirs Être", "Accrédidations"]}
                onChange={(e, value) =>
                  setNewnode({ ...newmetier, class: value })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Classe" 
                        name="class"
                        variant="outlined"
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
            Crée le competance
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default CreateNewCompetanceModal