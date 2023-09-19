import React, {useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Autocomplete,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    Box
} from '@mui/material';

const CreateNewCompetanceModal = ({ open, onClose, onSubmit, acreditation, competanceGlobal, loadlistbrique }) => {
    const [compet, setCompet] = useState([]);
    const [newmetier, setNewnode] = useState({});
    const [donnees, setDonnees] = useState([]);
    const [elementsCoches, setelementsCoches] = useState([]);
    const [elementsNonCoches, setelementsNonCoches] = useState([]);
    const handleSubmit = () => {
      onSubmit(newmetier, elementsCoches);
      setelementsCoches([])
      setelementsNonCoches([])
      onClose();
    };
    const handlebriquecompetance = async (event, value) => {
      let data = await loadlistbrique(value)
      setDonnees(data)
      setelementsNonCoches(data)
    };
    const [filtre, setFiltre] = useState('');
    
    

    const handleFiltreChange = (e) => {
      setFiltre(e.target.value.toLowerCase());
      let filtres = donnees.filter((element) =>
        element.brqCompTitre.toLowerCase().includes(filtre)
      );
      setelementsNonCoches(filtres)
    };
    
    const handleSelection = (element, type) => {
      if (type === "add") {
        let remo = elementsNonCoches.indexOf(element);
        elementsNonCoches.splice(remo, 1)
        setelementsNonCoches(elementsNonCoches)
        setelementsCoches([...elementsCoches, element])
      } else {
        let index = elementsCoches.indexOf(element)
        elementsCoches.splice(index, 1)
        setelementsCoches(elementsCoches)
        setelementsNonCoches([...elementsCoches, element])
      }
    };

    const handleChangecategorie = (event, value) => {
        let categ = competanceGlobal.filter(category=> {
          if(category.type === value){
            return true
          }
          return false
        })
        setCompet(categ)
    };
    
    const changetexarea = (e)=>{
      setNewnode({ ...newmetier, [e.target.name]: e.target.value })
    }
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Crée une fiche competance</DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' }
              }}
            >
              <Typography>Competance</Typography>
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
                    key="niveau"
                    label="Niveau"
                    name="niveau"
                    required
                    onChange={changetexarea}
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
                  <Autocomplete
                    sx={{
                        m: 2,
                        width: '90%',
                    }}
                    disablePortal
                    options={acreditation}
                    freeSolo
                    onChange={(e, value) =>{
                      if (value != null) setNewnode({ ...newmetier, accretitre: value.label, accreid: value.id })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            label="Accredition" 
                            name="accretitre"
                            variant="outlined"
                            onChange={changetexarea}
                        />
                    )}
                  />
              </Grid>
              <Typography>Brique competance</Typography>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                    display: 'flex',
                }}
              >
                <Autocomplete
                  sx={{
                      m: 2,
                      width: '100%',
                  }}
                  disablePortal
                  options={["SAVOIRS", "SAVOIRS FAIRE", "SAVOIR ÊTRE"]}
                  onChange={handleChangecategorie}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          required
                          label="Categorie" 
                          name="categorie"
                          variant="outlined"
                      />
                  )}
                />
                <Autocomplete
                  sx={{
                      m: 2,
                      width: '100%',
                  }}
                  disablePortal
                  options={compet || []}
                  onChange={handlebriquecompetance}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          required
                          label="Titre" 
                          name="titre"
                          variant="outlined"
                      />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                    display: 'flex',
                }}
              >
                <Box flex="1"
                  sx={{
                      m: 2,
                      width: '100%',
                  }}>
                  <TextField
                    variant="outlined"
                    label="Filtrer"
                    fullWidth
                    value={filtre}
                    onChange={handleFiltreChange}
                    style={{ marginBottom: '5px' }}
                  />
                  <List sx={{maxHeight: "30vh", height: "30vh", overflow: "auto"}}>
                    {elementsNonCoches.map((element) => (
                      <ListItem key={element.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={() => handleSelection(element, "add")}
                            />
                          }
                          label={<ListItemText primary={element.brqCompTitre} />}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box flex="1"
                  sx={{
                    m: 2,
                    width: '100%',
                }}>
                  <List sx={{maxHeight: "40vh", height: "40vh", overflow: "auto"}}>
                    {elementsCoches.map((element) => (
                      <ListItem key={element.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked = {true}
                              onChange={() => handleSelection(element, "remove")}
                            />
                          }
                          label={<ListItemText primary={element.brqCompTitre} />}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
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