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
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { LoadingButton } from "@mui/lab";
import PartCompetanceShow from "../partie/PartCompetanceShow";
import ContextTravailShow from "../partie/ContextTravailShow";

const CreateMetierModal = ({
  open,
  onClose,
  onSubmit,
  datacompetance,
  matierselectionner,
  appelationlist,
  datacompetancedata,
  contextlist
}) => {
  const [loading, setLoading] = useState(false);
  const [newnode, setNewnode] = useState({});
  const [agrementlist, setagrementlist] = useState([]);
  const [conditionlist, setconditionlist] = useState([]);
  const [ficheslist, setficheslist] = useState([]);
  const [datacompetanceafficher, setdatacompetanceafficher] = useState({});
  const [accreditationlist, setaccreditationlist] = useState([]);
  
  const handleChangePoste = (event, value) => {
    if (value != null) {
      setNewnode({
        ...newnode,
        competance: value.titre,
        competanceid: value.id
      });
      let affichage = datacompetancedata.filter(data=> {
        if(value.id === data.id){return true}return false
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
      setdatacompetanceafficher(groupedData)
      console.log(affichage[0])
      setaccreditationlist(affichage[0].accreditation)
    } else {
      setNewnode({ ...newnode, competance: "", competanceid: 0 });
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewnode({ ...newnode, [name]: value });
  };
  const submitdata = async (e) => {
    setLoading(true);
    await onSubmit(newnode);
    setLoading(false);
    onClose();
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle textAlign="center" color={"black.main"}>
          Formulaire de création métier
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
                        name="titre"
                        onChange={handleChange}
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
                    <Autocomplete
                        sx={{
                            width: "100%",
                        }}
                        disablePortal
                        options={appelationlist || []}
                        onChange={(e, value) => {
                            if (value != null) {
                                setNewnode({
                                    ...newnode,
                                    emploistitre: value.label,
                                    emploisid: value.id
                                });
                            } else {
                                setNewnode({
                                    ...newnode,
                                    emploistitre: "",
                                    emploisid: ""
                                });
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            required
                            label="Intitulé Métier ROME"
                            name="appelation"
                            variant="outlined"
                            />
                        )}
                    />
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
                    value={matierselectionner.rome_definition.replaceAll("\\n", "\n")}
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
                    name="activite"
                    onChange={handleChange}
                    value={matierselectionner.rome_acces_metier.replaceAll("\\n", "\n")}
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
                display: "flex",
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  marginRight: "5px",
                }}
              >
                <Autocomplete
                  sx={{
                    width: "100%",
                  }}
                  disablePortal
                  options={datacompetance || []}
                  onChange={handleChangePoste}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Fiche compétence"
                      name="fiche_competance"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Box>
            <Box
                sx={{
                  margin: "auto",
                  gridTemplateColumns: "1fr 1fr",
                  width: "100%",
                }}
              >
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
                {accreditationlist.length > 0 ? (
                <>
                    <Typography variant="h5">Accreditation</Typography>
                    {accreditationlist.map((definitionitem) => {
                    return (
                        <>
                        <Grid
                            sx={{ flexGrow: 1, mt: 1 }}
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
                        </>
                    );
                    })}
                </>
                ) : null}
                <Typography variant="h5">Contextes de travail</Typography>
                <Grid
                    sx={{ flexGrow: 1, mt: 1 }}
                    container
                    spacing={2}
                  >
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
                </Grid>
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
export default CreateMetierModal;
