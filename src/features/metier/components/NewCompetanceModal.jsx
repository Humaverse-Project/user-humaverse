import React, {useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
    Grid
} from '@mui/material';
import PartCompetanceCreation from "./partie/PartCompetanceCreation";
const CreateNewCompetanceModal = ({ open, onClose, onSubmit, rome, competance }) => {
  console.log(rome)
    const [newmetier, setNewnode] = useState({});
    const handleSubmit = () => {
      let data = [];
      if ("SAVOIRS FAIRE" in competance) {
        data = data.concat(competance["SAVOIRS FAIRE"])
      }
      if ("SAVOIRS" in competance) {
        data = data.concat(competance["SAVOIRS"])
      }
      if ("SAVOIR ÊTRE" in competance) {
        data = data.concat(competance["SAVOIR ÊTRE"])
      }
      onSubmit(newmetier, data );
      onClose();
    };
    const handleSliderChange = (newValue, accessitem)=>{
      accessitem.niveau = newValue
    }
    const changetexarea = (e)=>{
      setNewnode({ ...newmetier, [e.target.name]: e.target.value })
    }
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Crée une fiche competance à partier de fiche rome <b>{rome.code}</b></DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' }
              }}
            >
              <Typography variant='h6'> <b>Définition niveau</b></Typography>
              { "SAVOIRS FAIRE" in competance ? (
                < PartCompetanceCreation
                  competance={competance}
                  type={"SAVOIRS FAIRE"}
                  handleSliderChange={handleSliderChange}
                  titre={"Savoir-faire"}
                />
              ):
              (null)
              }
              { "SAVOIRS" in competance ? (
                < PartCompetanceCreation
                  competance={competance}
                  type={"SAVOIRS"}
                  handleSliderChange={handleSliderChange}
                  titre={"Savoirs"}
                />
              ):
              (null)
              }
              { "SAVOIR ÊTRE" in competance ? (
                < PartCompetanceCreation
                  competance={competance}
                  type={"SAVOIR ÊTRE"}
                  handleSliderChange={handleSliderChange}
                  titre={"Savoir être"}
                />
              ):
              (null)
              }
              <Typography sx={{ mt:2,ml:2 }} variant='h6'><b>Proprieté competance</b></Typography>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                    display: 'flex',
                }}
              >
                
                <TextField
                  key="titre"
                  label="Titre"
                  name="titre"
                  onChange={changetexarea}
                  required
                  sx={{
                      m: 2,
                      width: '100%',
                  }}
                />
                <TextField
                  key="version"
                  label="Version"
                  name="version"
                  type='number'
                  required
                  onChange={changetexarea}
                  sx={{
                      m: 2,
                      width: '100%',
                  }}
                />
                <TextField
                  required
                  label="Accredition" 
                  name="accretitre"
                  variant="outlined"
                  onChange={changetexarea}
                  sx={{
                    m: 2,
                    width: '100%',
                  }}
                />
              </Grid>
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