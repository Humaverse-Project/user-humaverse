import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Alert,
  Radio,
  Button,
  Dialog,
  TextField,
  Typography,
  InputLabel,
  RadioGroup,
  IconButton,
  FormControl,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Swal for notifications
import Swal from "sweetalert2";
// components
import PartCompetanceCreation from "../partie/PartCompetanceCreation";

const EditCompetanceModal = ({
  open,
  onClose,
  competance,
  setcompetance,
  activeeditrow,
  competanceglobal,
  setcompetanceglobal,
  setfichecompetance,
  accreditationlist,
  setAccreditationlist,
  postcompetance,
}) => {
  const [affichecgb, setaffichecgb] = useState([]);
  const allSavoirs = ["Savoir faire", "Savoir être", "Savoirs"];
  const [nouvellecompetancelist, setnouvellecompetancelist] = useState([]);

  // Management loading and error
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);

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

  const handleSaveEditRow = (
    elementsCoches,
    accreditationlist,
    nouvellecompetance
  ) => {
    setLoadingEdit(true);
    const values = {
      emploistitre: activeeditrow.emploiTitre,
      emploisid: activeeditrow.id,
      titre: activeeditrow.emploiTitre,
    };
    return postcompetance(
      values,
      elementsCoches,
      accreditationlist,
      activeeditrow.romeData.id,
      nouvellecompetance
    )
      .then((data) => {
        setcompetanceglobal(data.fiche_competance_global);
        setfichecompetance(data.fiche_competance);
        setLoadingEdit(false);
        onClose();
        Swal.fire({
          text: `${activeeditrow.emploiTitre} a été modifié avec succès`,
          target: "#custom-target",
          icon: "success",
          customClass: {
            container: "position-absolute",
          },
          toast: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        setErrorEdit(error);
        setLoadingEdit(false);
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
    handleSaveEditRow(data, accreditationlist, nouvellecompetancelist);
  };

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
  const handleajoutcompetance = (e) => {
    setnouvellecompetancelist([
      ...nouvellecompetancelist,
      {
        globaltitre: "",
        globalid: null,
        compettitre: "",
        globalcategorie: "",
        niveau: 0,
        cahrt: generateRandomid(),
      },
    ]);
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

  return (
    <>
      {errorEdit !== "" && <Alert severity="error">{errorEdit}</Alert>}
      <Dialog open={open} maxWidth={"md"}>
        <DialogTitle textAlign="center">
          Modifier les compétences du métier de{" "}
          <b>{activeeditrow.emploiTitre}</b>
        </DialogTitle>
        <DialogContent dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
              }}
            >
              <Box>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      sx={{
                        width: "100%",
                      }}
                      aria-readonly
                      value={activeeditrow.emploiTitre}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{
                        width: "100%",
                      }}
                      aria-readonly
                      value={activeeditrow.romeData.rome_coderome}
                    ></TextField>
                  </Grid>
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
              </Box>

              {res.map((item, index) => (
                <div key={index}>
                  {" "}
                  {/* Add a unique key for each item */}
                  <Typography variant="h5" sx={{ mt: 2, ml: 0 }}>
                    {allSavoirs[index]}
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
              <Button onClick={handleajoutcompetance}>
                Ajouter plus de competances
              </Button>
              <Grid container spacing={2} alignItems="center">
                {nouvellecompetancelist.map((list) => (
                  <>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      sx={{
                        display: "flex",
                      }}
                      key={list.cahrt}
                    >
                      <Autocomplete
                        sx={{
                          width: "100%",
                        }}
                        disablePortal
                        options={["SAVOIRS", "SAVOIRS FAIRE", "SAVOIR ÊTRE"]}
                        onChange={(e, value) => {
                          if (value != null) {
                            list.globalcategorie = value;
                            setnouvellecompetancelist([
                              ...nouvellecompetancelist,
                            ]);
                            let com = competanceglobal.filter((cgb) => {
                              if (cgb.compGbCategorie === value) {
                                return true;
                              }
                              return false;
                            });
                            setaffichecgb(
                              com.map((comps) => {
                                return {
                                  label: comps.compGbCategorie,
                                  id: comps.id,
                                };
                              })
                            );
                          } else {
                            list.globalcategorie = "";
                            setnouvellecompetancelist([
                              ...nouvellecompetancelist,
                            ]);
                            setaffichecgb([]);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label="Categorie"
                            name="apemp"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      sx={{
                        display: "flex",
                      }}
                      key={list.cahrt + "ss"}
                    >
                      <Autocomplete
                        sx={{
                          width: "100%",
                        }}
                        disablePortal
                        options={affichecgb}
                        freeSolo
                        onChange={(e, value) => {
                          if (value != null) {
                            list.globaltitre = value.label;
                            list.globalid = value.id;
                            setnouvellecompetancelist([
                              ...nouvellecompetancelist,
                            ]);
                          } else {
                            list.globaltitre = "";
                            list.globalid = null;
                            setnouvellecompetancelist([
                              ...nouvellecompetancelist,
                            ]);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label="titre Compétence global"
                            name="apemp"
                            onChange={(e) => {
                              list.globaltitre = e.target.value;
                              list.globalid = "nouveau";
                              setnouvellecompetancelist([
                                ...nouvellecompetancelist,
                              ]);
                            }}
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      sx={{
                        display: "flex",
                      }}
                      key={list.cahrt + "ssfff"}
                    >
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        required
                        label="Titre brique compétence"
                        name="apemp"
                        onChange={(e) => {
                          list.compettitre = e.target.value;
                          setnouvellecompetancelist([
                            ...nouvellecompetancelist,
                          ]);
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      sx={{
                        display: "flex",
                      }}
                      key={list.cahrt + "ddfdfdf"}
                    >
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        type="number"
                        required
                        label="Niveau"
                        name="apemp"
                        value={list.niveau}
                        onChange={(e) => {
                          if (e.target.value > 100) {
                            list.niveau = 100;
                          } else if (e.target.value < 0) {
                            list.niveau = 0;
                          } else {
                            list.niveau = e.target.value;
                          }
                          setnouvellecompetancelist([
                            ...nouvellecompetancelist,
                          ]);
                        }}
                        variant="outlined"
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 100,
                        }}
                      />
                    </Grid>
                  </>
                ))}
              </Grid>
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
                        value={accreditation.accreditaiontitre}
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
            disabled={loadingEdit}
            sx={{
              color: "white",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "green",
              },
              width: "20%",
            }}
          >
            {loadingEdit ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              "Modifier"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCompetanceModal;
