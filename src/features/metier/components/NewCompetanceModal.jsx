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
    Grid,
    Autocomplete
} from '@mui/material';
import PartCompetanceCreation from "./partie/PartCompetanceCreation";
const CreateNewCompetanceModal = ({ open, onClose, onSubmit, rome, competance, appelationlist }) => {
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
      console.log(data,newmetier)
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
        <DialogTitle textAlign="center">Créer une fiche de compétences à partir d'une fiche ROME <b>{rome.code}</b></DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' }
              }}
            >
              <Typography variant='h6'> <b>Définition niveau</b></Typography>
              { "SAVOIRS FAIRE" in competance ? (
                <><Typography variant='h5' sx={{ mt:2,ml:2 }}>Savoir-faire</Typography>
                {
                  competance["SAVOIRS FAIRE"].map((accessitem) => (
                    < PartCompetanceCreation
                      handleSliderChange={handleSliderChange}
                      accessitem= {accessitem}
                    />
                  ))
                }
                </>
              ):
              (null)
              }
              { "SAVOIRS" in competance ? (
                <><Typography variant='h5' sx={{ mt:2,ml:2 }}>Savoirs</Typography>
                  {
                    competance["SAVOIRS"].map((accessitem) => (
                      < PartCompetanceCreation
                        handleSliderChange={handleSliderChange}
                        accessitem= {accessitem}
                      />
                    ))
                  }
                </>
              ):
              (null)
              }
              { "SAVOIR ÊTRE" in competance ? (
                <><Typography variant='h5' sx={{ mt:2,ml:2 }}>Savoirs être</Typography>
                  {
                    competance["SAVOIR ÊTRE"].map((accessitem) => (
                      < PartCompetanceCreation
                        handleSliderChange={handleSliderChange}
                        accessitem= {accessitem}
                      />
                    ))
                  }
                </>
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
                
                {/* <TextField
                  key="titre"
                  label="Titre"
                  name="titre"
                  onChange={changetexarea}
                  required
                  sx={{
                      m: 2,
                      width: '100%',
                  }}
                /> */}
                <Autocomplete
                    sx={{
                        m: 2,
                        width: '100%',
                    }}
                    disablePortal
                    options={appelationlist}
                    onChange={(e, value) =>{
                      if (value != null) setNewnode({ ...newmetier, emploistitre: value.label, emploisid: value.id, titre: value.label })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Appelation emplois" 
                            name="apemp"
                            variant="outlined"
                            onChange={changetexarea}
                        />
                    )}
                />
                {/* <TextField
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
                /> */}
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
          <Button color="success" onClick={handleSubmit} variant="contained">
            Crée le competance
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default CreateNewCompetanceModal