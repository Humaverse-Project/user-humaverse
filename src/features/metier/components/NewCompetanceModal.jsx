import React, { useState } from "react";
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
    Autocomplete,
    FormControlLabel,
    ListItemText,
    Checkbox,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Box,
    FormControl,
    InputLabel,
    FormLabel,
    RadioGroup,
    Radio
} from '@mui/material';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PartCompetanceCreation from "./partie/PartCompetanceCreation";
const Input = styled(MuiInput)`
  width: 42px;
`;

const CreateNewCompetanceModal = ({ open, onClose, onSubmit, rome, competance, appelationlist, setcompetance }) => {
  const generateRandomid = () => {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=[]{};:,.<>?";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }
  const [newmetier, setNewnode] = useState({});
  const [accreditationlist, setAccreditationlist] = useState([{accreditaiontitre: '', acrreditationvalue: '', id: generateRandomid()}])
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
    console.log(data,newmetier, accreditationlist)
    onSubmit(newmetier, data, accreditationlist );
    onClose();
  };
  const deletethiselement = (e, accreditation)=>{
    var index = accreditationlist.indexOf(accreditation);
    accreditationlist.splice(index, 1)
    setAccreditationlist([...accreditationlist])
  }
  const handleSliderChangeglobal = (e) =>{
    const brique = Object.keys(competance)
    for (let index = 0; index < brique.length; index++) {
      for (let mm = 0; mm < competance[brique[index]].length; mm++) {
        const element = competance[brique[index]][mm];
        element.niveau = parseInt(e.target.value)
      }
      setcompetance({...competance, [brique[index]] : competance[brique[index]]})
    }
  }
  const handleSliderChange = (newValue, accessitem)=>{
    accessitem.niveau = newValue
  }
  const changetexarea = (e)=>{
    setNewnode({ ...newmetier, [e.target.name]: e.target.value })
  }
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Générer les compétences à partir d'une fiche ROME <b>{rome.code}</b> - {rome.titre}</DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' }
              }}
            >
              <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Autocomplete
                      sx={{
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                        sx={{
                            m: 2,
                            width: '90%',
                        }}
                        type='number'
                        label="Niveau globlale" 
                        name="niveaugl"
                        variant="outlined"
                        onChange={handleSliderChangeglobal}
                    />
                  </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                          <Checkbox
                              onChange={(event) => {
                                  const isChecked = event.target.checked;
                                  if (isChecked) {
                                    setNewnode({ ...newmetier, applicationall: "ok" })
                                  } else {
                                    setNewnode({ ...newmetier, applicationall: "ko" })
                                  }
                              }}
                          />
                      }
                      label={<ListItemText primary={"Créer les compétences pour tous les métiers"} />}
                      sx={{
                          width: '100%',
                      }}
                      />
                  </Grid>
              </Grid>
              <Typography variant='h6'> <b>Définition niveaux</b></Typography>
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
                <Box
                  sx={{
                      display: 'flex',
                  }}>
                    <Typography sx={{ mt:2,ml:2 }} variant='h6'><b>Accreditations</b></Typography>
                
                    <IconButton
                      onClick={(e)=>
                        setAccreditationlist([...accreditationlist, {accreditaiontitre: '', acrreditationvalue: '', id: generateRandomid()}])
                      }
                      sx={{color: "green", mt:2}}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Box>
                  
              <Grid container spacing={2} alignItems="center">
                {
                  accreditationlist.map((accreditation) => (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      sx={{
                        display: 'flex',
                      }}
                      key={accreditation.id}
                    >
                      <FormControl
                        sx={{
                            color: 'black.main',
                            ml:2,
                            mt:2
                        }}
                        key={accreditation.id+"iun"}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Titre
                        </InputLabel>
                        <OutlinedInput
                          label="Titre"
                          key={accreditation.id+"iuc"}
                          id="outlined-adornment-password"
                          onChange = {(e)=>{ if(e.target.value){
                              accreditation.accreditaiontitre = e.target.value;
                              setAccreditationlist([...accreditationlist])
                            }} 
                          }
                          endAdornment={
                              <InputAdornment position="end">
                                  <IconButton
                                      onMouseDown={(e)=>
                                        deletethiselement(e, accreditation)
                                      }
                                      edge="end"
                                      sx={{color: "red"}}
                                  >
                                    <DeleteForeverIcon />
                                  </IconButton>
                              </InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl
                        key={accreditation.id+"iusn"}
                        sx={{
                          color: 'black.main',
                          ml:2,
                          mt:2
                      }}>
                        <RadioGroup
                          row
                          name="row-radio-buttons-group"
                          key={accreditation.id+"iussn"}
                        >
                          <FormControlLabel
                            value="Oui"
                            control={<Radio />}
                            label="Oui"
                            checked = {(accreditation.acrreditationvalue === "Oui")}
                            onChange = {(e)=>{ if(e.target.checked){
                                accreditation.acrreditationvalue = "Oui";
                                setAccreditationlist([...accreditationlist])
                              }} 
                            }
                          />
                          <FormControlLabel
                            value="Non"
                            control={<Radio />}
                            label="Non"
                            checked = {(accreditation.acrreditationvalue === "Non")}
                            onChange = {(e)=>{ if(e.target.checked){
                                accreditation.acrreditationvalue = "Non";
                                setAccreditationlist([...accreditationlist])
                              }} 
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  ))
                }
              </Grid>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button color="success" onClick={handleSubmit} variant="contained">
            Créer le compétence
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default CreateNewCompetanceModal;
