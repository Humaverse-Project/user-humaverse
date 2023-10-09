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
  Alert,
  RadioGroup,
  Radio,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PartCompetanceCreation from "../partie/PartCompetanceCreation";

// Swal pour les notifications
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const CreateNewCompetanceModal = ({
  open,
  onClose,
  rome,
  competance,
  appelationlist,
  setcompetance,
  setcompetanceglobal,
  setfichecompetance,
  matierselectionner,
  postcompetance,
}) => {
  // state local for loading creation
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);

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
  const [newmetier, setNewnode] = useState({});
  const [accreditationlist, setAccreditationlist] = useState([
    { accreditaiontitre: "", acrreditationvalue: "", id: generateRandomid() },
  ]);

  // Gestion de creation de competence par metier
  const [isCreateByMetier, setIsCreateByMetier] = useState(false);
  const [isCheckedCreateAllMetier, setIsCheckedCreateAllMetier] =
    useState(false);

  const allSavoirs = ["Savoir faire", "Savoir être", "Savoirs"];

  // creatuion service competance
  const handleCreateNewRow = (values, elementsCoches, accreditationlist) => {
    setLoadingCreate(true);
    postcompetance(
      values,
      elementsCoches,
      accreditationlist,
      matierselectionner.id
    )
      .then((data) => {
        setcompetanceglobal(data.fiche_competance_global);
        setfichecompetance(data.fiche_competance);
        setLoadingCreate(false);
        onClose();
        MySwal.fire({
          text: "La compétence a été créée avec succès",
          target: "#custom-target",
          customClass: {
            container: "position-absolute",
          },
          toast: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        setErrorCreate(true);
        setLoadingCreate(false);
      });
  };

  const handleSubmit = () => {
    let data = [];
    if ("SAVOIRS FAIRE" in competance) {
      data = data.concat(competance["SAVOIRS FAIRE"]);
    }
    if ("SAVOIRS" in competance) {
      data = data.concat(competance["SAVOIRS"]);
    }
    if ("SAVOIR ÊTRE" in competance) {
      data = data.concat(competance["SAVOIR ÊTRE"]);
    }
    handleCreateNewRow(newmetier, data, accreditationlist);
  };

  const reformatteDataCompetance = (competance) => {
    const finalDataSF = [];
    const finalDataSE = [];
    const finalDataS = [];

    if ("SAVOIRS FAIRE" in competance) {
      const dataSF = competance["SAVOIRS FAIRE"];
      for (let i = 0; i < dataSF.length; i++) {
        const existingIndex = finalDataSF.findIndex(
          (item) => item.titre === dataSF[i].compGb.compGbTitre
        );
        if (existingIndex !== -1) {
          finalDataSF[existingIndex].data.push(dataSF[i]);
        } else {
          finalDataSF.push({
            titre: dataSF[i].compGb.compGbTitre,
            data: [dataSF[i]],
          });
        }
      }
    }

    if ("SAVOIR ÊTRE" in competance) {
      const dataSE = competance["SAVOIR ÊTRE"];
      for (let i = 0; i < dataSE.length; i++) {
        const existingIndex = finalDataSE.findIndex(
          (item) => item.titre === dataSE[i].compGb.compGbTitre
        );
        if (existingIndex !== -1) {
          finalDataSE[existingIndex].data.push(dataSE[i]);
        } else {
          finalDataSE.push({
            titre: dataSE[i].compGb.compGbTitre,
            data: [dataSE[i]],
          });
        }
      }
    }

    if ("SAVOIRS" in competance) {
      const dataS = competance["SAVOIRS"];
      for (let i = 0; i < dataS.length; i++) {
        const existingIndex = finalDataS.findIndex(
          (item) => item.titre === dataS[i].compGb.compGbTitre
        );
        if (existingIndex !== -1) {
          finalDataS[existingIndex].data.push(dataS[i]);
        } else {
          finalDataS.push({
            titre: dataS[i].compGb.compGbTitre,
            data: [dataS[i]],
          });
        }
      }
    }

    return [finalDataSF, finalDataSE, finalDataS];
  };

  const res = reformatteDataCompetance(competance);

  const deletethiselement = (e, accreditation) => {
    let index = accreditationlist.indexOf(accreditation);
    accreditationlist.splice(index, 1);
    setAccreditationlist([...accreditationlist]);
  };
  const handleSliderChangeglobal = (e) => {
    const brique = Object.keys(competance);
    for (let index = 0; index < brique.length; index++) {
      for (let mm = 0; mm < competance[brique[index]].length; mm++) {
        const element = competance[brique[index]][mm];
        element.niveau = parseInt(e.target.value);
      }
      setcompetance({
        ...competance,
        [brique[index]]: competance[brique[index]],
      });
    }
  };
  const handleSliderChange = (newValue, accessitem) => {
    accessitem.niveau = newValue;
  };
  const changetexarea = (e) => {
    setNewnode({ ...newmetier, [e.target.name]: e.target.value });
  };

  return (
    <>
      {errorCreate !== "" && <Alert severity="error">{errorCreate}</Alert>}
      <Dialog open={open} maxWidth={"md"}>
        <DialogTitle textAlign="center">
          Générer les compétences à partir d'une fiche ROME{" "}
          <b>
            {rome.code} - {rome.label.replace(`${rome.code}`, "")}
          </b>
        </DialogTitle>
        <DialogContent dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
              }}
            >
              <Typography
                sx={{
                  mb: 3,
                }}
                variant="h6"
              >
                {" "}
                Créer les compétences par métier
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Autocomplete
                    sx={{
                      width: "100%",
                    }}
                    disabled={isCheckedCreateAllMetier}
                    disablePortal
                    options={appelationlist}
                    onChange={(e, value) => {
                      if (value != null) {
                        setNewnode({
                          ...newmetier,
                          emploistitre: value.label,
                          emploisid: value.id,
                          titre: value.label,
                        });
                        setIsCreateByMetier(true);
                      } else {
                        setNewnode({
                          ...newmetier,
                          emploistitre: "",
                          emploisid: "",
                          titre: "",
                        });
                        setIsCreateByMetier(false);
                      }
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
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                  mb: 3,
                  mt: 2,
                }}
              >
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={isCreateByMetier}
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          if (isChecked) {
                            setNewnode({ ...newmetier, applicationall: "ok" });
                            setIsCheckedCreateAllMetier(true);
                          } else {
                            setNewnode({ ...newmetier, applicationall: "ko" });
                            setIsCheckedCreateAllMetier(false);
                          }
                        }}
                      />
                    }
                    label={
                      <ListItemText
                        primary={"Créer les compétences pour tous les métiers"}
                      />
                    }
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: -3,
                    }}
                  >
                    {" "}
                    <b>Définition niveaux</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{
                      width: "50%",
                      ml: 36,
                      mt: 2,
                      mb: -6,
                    }}
                    type="number"
                    label="Niveau globlale"
                    name="niveaugl"
                    variant="outlined"
                    onChange={handleSliderChangeglobal}
                  />
                </Grid>
              </Grid>

              {res.map((item, index) => (
                <div key={index}>
                  {" "}
                  {/* Add a unique key for each item */}
                  <Typography variant="h5" sx={{ mt: 2, ml: 0 }}>
                    {allSavoirs[index].toLowerCase()}
                  </Typography>
                  <hr></hr>
                  {item.map(
                    (
                      item2,
                      subIndex // Use subIndex as a unique key
                    ) => (
                      <div key={subIndex}>
                        {" "}
                        {/* Add a unique key for each item2 */}
                        <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
                          {item2.titre}
                        </Typography>
                        {item2.data.map(
                          (
                            accessitem,
                            innerIndex // Use innerIndex as a unique key
                          ) => (
                            <PartCompetanceCreation
                              key={innerIndex} // Add a unique key for each accessitem
                              handleSliderChange={handleSliderChange}
                              accessitem={accessitem}
                            />
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              ))}

              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography sx={{ mt: 2, ml: 2 }} variant="h6">
                  <b>Accreditations</b>
                </Typography>

                <IconButton
                  onClick={(e) =>
                    setAccreditationlist([
                      ...accreditationlist,
                      {
                        accreditaiontitre: "",
                        acrreditationvalue: "",
                        id: generateRandomid(),
                      },
                    ])
                  }
                  sx={{ color: "green", mt: 2 }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2} alignItems="center">
                {accreditationlist.map((accreditation) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    sx={{
                      display: "flex",
                    }}
                    key={accreditation.id}
                  >
                    <FormControl
                      sx={{
                        color: "black.main",
                        ml: 2,
                        mt: 2,
                      }}
                      key={accreditation.id + "iun"}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Titre
                      </InputLabel>
                      <OutlinedInput
                        label="Titre"
                        key={accreditation.id + "iuc"}
                        id="outlined-adornment-password"
                        onChange={(e) => {
                          if (e.target.value) {
                            accreditation.accreditaiontitre = e.target.value;
                            setAccreditationlist([...accreditationlist]);
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onMouseDown={(e) =>
                                deletethiselement(e, accreditation)
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
                    <FormControl
                      key={accreditation.id + "iusn"}
                      sx={{
                        color: "black.main",
                        ml: 2,
                        mt: 2,
                      }}
                    >
                      <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        key={accreditation.id + "iussn"}
                      >
                        <FormControlLabel
                          value="Oui"
                          control={<Radio />}
                          label="Oui"
                          checked={accreditation.acrreditationvalue === "Oui"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              accreditation.acrreditationvalue = "Oui";
                              setAccreditationlist([...accreditationlist]);
                            }
                          }}
                        />
                        <FormControlLabel
                          value="Non"
                          control={<Radio />}
                          label="Non"
                          checked={accreditation.acrreditationvalue === "Non"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              accreditation.acrreditationvalue = "Non";
                              setAccreditationlist([...accreditationlist]);
                            }
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button
            color="success"
            onClick={handleSubmit}
            variant="contained"
            disabled={loadingCreate}
            sx={{
              color: "white",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "green",
              },
              width: "20%",
            }}
          >
            {loadingCreate ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              "Créer une compétence"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateNewCompetanceModal;
