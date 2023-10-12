import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  TextField,
  Grid,
  Typography,
  ListItem,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { LoadingButton } from "@mui/lab";
import PartCompetanceShow from "../partie/PartCompetanceShow";
import ContextTravailShow from "../partie/ContextTravailShow";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const Input = styled(MuiInput)`
  width: 100%;
`;
const MySwal = withReactContent(Swal);

const EditMetierModal = ({
  open,
  onClose,
  onSubmit,
  datacompetance,
  matierselectionner,
  appelationlist,
  datacompetancedata,
  contextlist,
  selectedpostdata
}) => {
    console.log(selectedpostdata)
    const [loading, setLoading] = useState(false);
    
    
    let agr = []
    let cnd = []
    let fiche = []
    for (let index = 0; index < selectedpostdata.briquecontextmetier.length; index++) {
        const element = selectedpostdata.briquecontextmetier[index];
        if(element.contexttitre === "Agrément - Réglementation du métier") {
            agr.push({name: element.name, id: element.id })
        } else if(element.contexttitre === "Conditions générales de travail") {
            cnd.push({name: element.name, id: element.id })
        } else if(element.contexttitre === "Fiches - Instructions - Scripts à respecter") {
            fiche.push({name: element.name, id: element.id })
        }
    }

    const [agrementlist, setagrementlist] = useState(agr);
    const [conditionlist, setconditionlist] = useState(cnd);
    const [ficheslist, setficheslist] = useState(fiche);

    const [expanded, setExpanded] = useState(false);

    const handleChangeaccord = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const deletethisagrementelement = (e, accreditation) => {
        let index = agrementlist.indexOf(accreditation);
        agrementlist.splice(index, 1);
        setagrementlist([...agrementlist]);
    };
    const deletethisconditionlement = (e, accreditation) => {
        let index = conditionlist.indexOf(accreditation);
        conditionlist.splice(index, 1);
        setconditionlist([...conditionlist]);
    };
    const deletethisFICHElement = (e, accreditation) => {
        let index = ficheslist.indexOf(accreditation);
        ficheslist.splice(index, 1);
        setficheslist([...ficheslist]);
    };
  
    const generateRandomid = () => {
        const length = 10;
        const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=[]{};:,.<>?";
        let password = "";

        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
        }
        return password;
    };

    let das = datacompetance.filter(com => {if(com.titre === selectedpostdata.emplois.emploiTitre) return true; return false})

    const [newnode, setNewnode] = useState({
        competanceid:0,
        definition: matierselectionner.rome_definition,
        formation: matierselectionner.rome_acces_metier,
        metierid: 0,
        convention: selectedpostdata.convention,
        definition: selectedpostdata.definition,
        activite: selectedpostdata.activite,
        formation: selectedpostdata.formation,
        competance: das[0].titre,
        titre: selectedpostdata.titre,
        competanceid: das[0].id,
        emploistitre: selectedpostdata.emplois.emploiTitre,
        emploisid: selectedpostdata.emplois.id
    });
    let affichage = datacompetancedata.filter(data=> {
    if(das[0].id === data.id){return true}return false
    })
    let donnees = affichage[0].briquesCompetencesNiveaux;
    const groupedData = {};
    donnees.forEach((item) => {
        const categorie = item.briquescompetances.compGb.compGbCategorie;
        const titre = item.briquescompetances.compGb.compGbTitre;
        if (!groupedData[categorie]) {
        groupedData[categorie] = {};
        }
        if (!groupedData[categorie][titre]) {
        groupedData[categorie][titre] = [];
        }
        groupedData[categorie][titre].push(item);
    });
    const [datacompetanceafficher, setdatacompetanceafficher] = useState(groupedData);
    const [accreditationlist, setaccreditationlist] = useState(affichage[0].accreditation);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewnode({ ...newnode, [name]: value });
    };
    const submitdata = async (e) => {
        setLoading(true);
        await onSubmit(agrementlist, ficheslist, conditionlist, newnode);
        setLoading(false);
        onClose();
    };
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle textAlign="center" color={"black.main"}>
          Modification métier
        </DialogTitle>
        <DialogContent dividers={true}>
          <Stack
            sx={{
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
                <Grid
                    item
                    xs={6}
                    sm={6}
                    sx={{
                    display: "flex",
                    marginRight: "5px",
                    }}
                >
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        required
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Intitulé Emploi
                        </InputLabel>
                        <OutlinedInput
                            readOnly
                            value={selectedpostdata.titre}
                            name="titre"
                            label="Intitulé Emploi"
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={6}
                    sx={{
                    display: "flex",
                    marginRight: "5px",
                    }}
                >
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        required
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Intitulé Métier
                        </InputLabel>
                        <OutlinedInput
                            label="Intitulé Métier"
                            name="appelation"
                            variant="outlined"
                            readOnly
                            value={selectedpostdata.fichecompetance.titre}
                        />
                    </FormControl>
                </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
                <Grid
                    item
                    xs={6}
                    sm={6}
                    sx={{
                    display: "flex",
                    marginRight: "5px",
                    }}
                >
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        required
                    >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Code ROME
                    </InputLabel>
                    <OutlinedInput
                        name="Code ROME"
                        disabled
                        value={matierselectionner.rome_coderome }
                        label="Code ROME"
                    />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={6}
                    sx={{
                    display: "flex",
                    marginRight: "5px",
                    }}
                >
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        required
                    >
                    <InputLabel htmlFor="outlined-adornment-password">
                        Libellé ROME
                    </InputLabel>
                    <OutlinedInput
                        name="Libellé ROME"
                        disabled
                        value={matierselectionner.nom}
                        label="Libellé ROME"
                    />
                    </FormControl>
                </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Grid
                item
                xs={6}
                sm={6}
                sx={{
                  display: "flex",
                  marginRight: "5px",
                }}
              >
                <FormControl
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  required
                >
                  <TextField
                    name="convention"
                    onChange={handleChange}
                    value={newnode.convention}
                    InputProps={{
                      multiline: true,
                    }}
                    label="Conventions collectives"
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                sx={{
                  display: "flex",
                  marginRight: "5px",
                }}
              >
                <FormControl
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  required
                >
                  <TextField
                    name="activite"
                    onChange={handleChange}
                    value={newnode.activite}
                    InputProps={{
                      multiline: true,
                    }}
                    label="Activité"
                  />
                </FormControl>
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Grid
                item
                xs={6}
                sm={6}
                sx={{
                  display: "flex",
                  marginRight: "5px",
                }}
              >
                <FormControl
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  required
                >
                  <TextField
                    name="definition"
                    onChange={handleChange}
                    value={newnode.definition}
                    InputProps={{
                      multiline: true,
                    }}
                    label="Définition des tâches"
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                sx={{
                  display: "flex",
                  marginRight: "5px",
                }}
              >
                <FormControl
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  required
                >
                  <TextField
                    name="formation"
                    onChange={handleChange}
                    value={newnode.formation}
                    InputProps={{
                      multiline: true,
                    }}
                    label="Formation - Expérience nécessaire"
                  />
                </FormControl>
              </Grid>
            </Box>
            <Box
                sx={{
                  margin: "auto",
                  gridTemplateColumns: "1fr 1fr",
                  width: "100%",
                }}
              >
                {newnode.competanceid !== 0 ? (
                  <Accordion expanded={expanded === 'competance'} onChange={handleChangeaccord('competance')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5">
                        Compétences
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {"SAVOIRS FAIRE" in datacompetanceafficher ? (
                        <PartCompetanceShow
                          datacompetanceafficher={datacompetanceafficher}
                          type={"SAVOIRS FAIRE"}
                          titre={"Savoir-faire"}
                        />
                      ) : null}
                      {"SAVOIRS" in datacompetanceafficher ? (
                        <PartCompetanceShow
                          groupedData={datacompetanceafficher}
                          type={"SAVOIRS"}
                          titre={"Savoirs"}
                        />
                      ) : null}
                      {"SAVOIR ÊTRE" in datacompetanceafficher ? (
                        <PartCompetanceShow
                          groupedData={datacompetanceafficher}
                          type={"SAVOIR ÊTRE"}
                          titre={"Savoirs être"}
                        />
                      ) : null}
                    </AccordionDetails>
                  </Accordion>
                ) : null}
                {accreditationlist.length > 0 ? (
                  <Accordion expanded={expanded === 'Accreditation'} onChange={handleChangeaccord('Accreditation')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5">
                      Accreditation
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {accreditationlist.map((definitionitem) => {
                        return (
                            <>
                            <Grid
                                sx={{ flexGrow: 1, mt: 1, pl: 2 }}
                                container
                                spacing={2}
                            >
                                <Grid item xs={4} key={definitionitem.id}>
                                <ListItem sx={{ p: 0 }}>
                                    {" "}
                                    {definitionitem.accreTitre}
                                </ListItem>
                                </Grid>
                                <Grid item xs={4} key={definitionitem.accreTitre + "2"}>
                                <ListItem sx={{ p: 0 }}>
                                    {" "}
                                    {definitionitem.value}
                                </ListItem>
                                </Grid>
                            </Grid>
                            <Divider variant="middle" sx={{width:"100%"}}/>
                            </>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                ) : null}
                <Accordion expanded={expanded === 'Mobilite'} onChange={handleChangeaccord('Mobilite')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5">
                    Mobilité professionnelle
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                      Fiches ROME proches
                    </Typography>
                    <hr></hr>
                    <Grid
                      sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                      container
                      spacing={2}
                    >
                      {matierselectionner.romeproche.map((definitionitem) => (
                        <Grid item xs={11} key={definitionitem.id}>
                          <ListItem sx={{ p: 0 }}>
                            {definitionitem.rome_coderome} {definitionitem.nom}
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                    <hr></hr>
                    <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                      Fiches ROME envisageables si évolution
                    </Typography>
                    <hr></hr>
                    <Grid
                      sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                      container
                      spacing={2}
                    >
                      {matierselectionner.romeevolution.map((definitionitem) => (
                        <Grid item xs={11} key={definitionitem.id}>
                          <ListItem sx={{ p: 0 }}>
                            {definitionitem.rome_coderome} {definitionitem.nom}
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {newnode.competanceid !== 0 ? (
                  <Accordion expanded={expanded === 'Contextes'} onChange={handleChangeaccord('Contextes')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h5">
                      Contextes de travail
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {"CONDITIONS_TRAVAIL" in contextlist ? (
                        <ContextTravailShow 
                            context={contextlist}
                            type={"CONDITIONS_TRAVAIL"}
                            titre={"Conditions de travail et risques professionnels"}
                        />
                    ) : null}
                    {"HORAIRE_ET_DUREE_TRAVAIL" in contextlist ? (
                        <ContextTravailShow 
                            context={contextlist}
                            type={"HORAIRE_ET_DUREE_TRAVAIL"}
                            titre={"Horaires et durée du travail"}
                        />
                    ) : null}
                    {"TYPE_BENEFICIAIRE" in contextlist ? (
                        <ContextTravailShow 
                            context={contextlist}
                            type={"TYPE_BENEFICIAIRE"}
                            titre={"Publics spécifiques"}
                        />
                    ) : null}
                    {"TYPE_STRUCTURE_ACCUEIL" in contextlist ? (
                        <ContextTravailShow 
                            context={contextlist}
                            type={"TYPE_STRUCTURE_ACCUEIL"}
                            titre={"Types de structures"}
                        />
                    ) : null}
                    {"LIEU_ET_DEPLACEMENT" in contextlist ? (
                        <ContextTravailShow 
                            context={contextlist}
                            type={"LIEU_ET_DEPLACEMENT"}
                            titre={"LIEU_ET_DEPLACEMENT"}
                        />
                    ) : null}
                    <Grid
                        sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                        container
                        spacing={2}
                    >
                        <Grid
                          item
                          xs={5}
                        >
                        <ListItem sx={{ p: 0,  display: "flex", }}>
                            {" "}
                            <Typography>Agrément - Réglementation du métier</Typography>
                            <IconButton
                              onClick={(e) =>
                                setagrementlist([
                                  ...agrementlist,
                                  {
                                    name : "",
                                    id: generateRandomid(),
                                  },
                                ])
                              }
                              sx={{ color: "green" }}
                            >
                              <AddCircleIcon />
                            </IconButton>
                        </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                          {agrementlist.map(
                              (accessitem) => (
                                <FormControl
                                  sx={{
                                    color: "black.main",
                                    width: "100%"
                                  }}
                                  key={accessitem.id + "iun"}
                                  variant="outlined"
                                >
                                  <Input
                                    key={accessitem.id + "input"}
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        accessitem.name = e.target.value;
                                        setagrementlist([...agrementlist]);
                                      }
                                    }}
                                    value={accessitem.name}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          onMouseDown={(e) =>
                                            deletethisagrementelement(e, accessitem)
                                          }
                                          edge="end"
                                          sx={{ color: "red" }}
                                        >
                                          <DeleteForeverIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )
                          )}
                        </Grid>
                    </Grid>
                    <Divider variant="middle" sx={{width:"100%"}}/>
                    <Grid
                        sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                        container
                        spacing={2}
                    >
                        <Grid
                          item
                          xs={5}
                        >
                        <ListItem sx={{ p: 0,  display: "flex", }}>
                            {" "}
                            <Typography>Conditions générales de travail</Typography>
                            <IconButton
                              onClick={(e) =>
                                setconditionlist([
                                  ...conditionlist,
                                  {
                                    name : "",
                                    id: generateRandomid(),
                                  },
                                ])
                              }
                              sx={{ color: "green" }}
                            >
                              <AddCircleIcon />
                            </IconButton>
                        </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                          {conditionlist.map(
                              (accessitem) => (
                                <FormControl
                                  sx={{
                                    color: "black.main",
                                    width: "100%"
                                  }}
                                  key={accessitem.id + "iun"}
                                  variant="outlined"
                                >
                                  <Input
                                    key={accessitem.id + "input"}
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        accessitem.name = e.target.value;
                                        setconditionlist([...conditionlist]);
                                      }
                                    }}
                                    value={accessitem.name}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          onMouseDown={(e) =>
                                            deletethisconditionlement(e, accessitem)
                                          }
                                          edge="end"
                                          sx={{ color: "red" }}
                                        >
                                          <DeleteForeverIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )
                          )}
                        </Grid>
                    </Grid>
                    <Divider variant="middle" sx={{width:"100%"}}/>
                    <Grid
                        sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                        container
                        spacing={2}
                    >
                        <Grid
                          item
                          xs={5}
                        >
                        <ListItem sx={{ p: 0,  display: "flex", }}>
                            {" "}
                            <Typography>Fiches - Instructions - Scripts à respecter</Typography>
                            <IconButton
                              onClick={(e) =>
                                setficheslist([
                                  ...ficheslist,
                                  {
                                    name : "",
                                    id: generateRandomid(),
                                  },
                                ])
                              }
                              sx={{ color: "green" }}
                            >
                              <AddCircleIcon />
                            </IconButton>
                        </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                          {ficheslist.map(
                              (accessitem) => (
                                <FormControl
                                  sx={{
                                    color: "black.main",
                                    width: "100%"
                                  }}
                                  key={accessitem.id + "iun"}
                                  variant="outlined"
                                >
                                  <Input
                                    key={accessitem.id + "input"}
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        accessitem.name = e.target.value;
                                        setficheslist([...ficheslist]);
                                      }
                                    }}
                                    value={accessitem.name}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          onMouseDown={(e) =>
                                            deletethisFICHElement(e, accessitem)
                                          }
                                          edge="end"
                                          sx={{ color: "red" }}
                                        >
                                          <DeleteForeverIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )
                          )}
                        </Grid>
                    </Grid>
                    <Divider variant="middle" sx={{width:"100%"}}/>
                  </AccordionDetails>
                </Accordion>
                ) : null}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Annuler
          </Button>
          <LoadingButton
            loading={loading}
            sx={{ width: "auto" }}
            variant="contained"
            fullWidth
            onClick={submitdata}
            color="success"
          >
            Enregistrer
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default EditMetierModal;
