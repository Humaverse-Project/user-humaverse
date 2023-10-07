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
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// components
import PartCompetanceCreation from "./partie/PartCompetanceCreation";

const EditCompetanceModal = ({
  open,
  onClose,
  onSubmit,
  competance,
  setcompetance,
  activeeditrow,
  competanceglobal,
  accreditationlist,
  setAccreditationlist,
}) => {
  console.log("competance", competance);
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
  const [nouvellecompetancelist, setnouvellecompetancelist] = useState([]);
  const [affichecgb, setaffichecgb] = useState([]);
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
    // console.log(data, accreditationlist, nouvellecompetancelist)
    onSubmit(data, accreditationlist, nouvellecompetancelist);
    // onClose();
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
  return (
    <Dialog open={open} maxWidth={"md"}>
      <DialogTitle textAlign="center">
        Modifier les compétences du métier de <b>{activeeditrow.emploiTitre}</b>
      </DialogTitle>
      <DialogContent dividers={true}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
            }}
          >
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
                    m: 2,
                    width: "90%",
                  }}
                  type="number"
                  label="Niveau globlale"
                  name="niveaugl"
                  variant="outlined"
                  onChange={handleSliderChangeglobal}
                />
              </Grid>
            </Grid>
            <Typography variant="h6">
              {" "}
              <b>Définition niveaux</b>
            </Typography>
            {"SAVOIRS FAIRE" in competance ? (
              <>
                <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                  Savoir-faire
                </Typography>
                {competance["SAVOIRS FAIRE"].map((accessitem) => (
                  <PartCompetanceCreation
                    handleSliderChange={handleSliderChange}
                    accessitem={accessitem}
                  />
                ))}
              </>
            ) : null}
            {"SAVOIRS" in competance ? (
              <>
                <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                  Savoirs
                </Typography>
                {competance["SAVOIRS"].map((accessitem) => (
                  <PartCompetanceCreation
                    handleSliderChange={handleSliderChange}
                    accessitem={accessitem}
                  />
                ))}
              </>
            ) : null}
            {"SAVOIR ÊTRE" in competance ? (
              <>
                <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                  Savoirs être
                </Typography>
                {competance["SAVOIR ÊTRE"].map((accessitem) => (
                  <PartCompetanceCreation
                    handleSliderChange={handleSliderChange}
                    accessitem={accessitem}
                  />
                ))}
              </>
            ) : null}
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
                        setnouvellecompetancelist([...nouvellecompetancelist]);
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
                        setnouvellecompetancelist([...nouvellecompetancelist]);
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
        <Button color="success" onClick={handleSubmit} variant="contained">
          Créer le compétence
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCompetanceModal;
