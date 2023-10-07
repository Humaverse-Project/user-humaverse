import HeaderInScreen from "../../header/HeaderInScreen";
import { LeftMenu, Text } from "../../../shared";
import { LoadingAPI } from "../../../shared";
import React, { Fragment, useState, useEffect } from "react";
import { getdatarome } from "../../../services/RomeService";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, NavLink, useParams } from "react-router-dom"; // Importez useParams pour récupérer les paramètres d'URL
import { Button, ListItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RomeDetailScreen() {
  const { code } = useParams();
  const page = "COMPETENCES";
  const [loading, setLoading] = useState([]);
  const [emplois, setemplois] = useState([]);
  const [definition, setdefinition] = useState([]);
  const [access, setaccess] = useState(true);
  const [competance, setcompetance] = useState({});
  const [error, setError] = useState(null);
  const [context, setcontext] = useState({});
  const [mobilite, setmobilite] = useState({});
  const [titre, settitre] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datametierexistant = await getdatarome(code);
        const reponsemetie = await datametierexistant;
        setemplois(reponsemetie.appelation);
        setdefinition(reponsemetie.rome.rome_definition.split("\\n"));
        setaccess(reponsemetie.rome.rome_acces_metier.split("\\n"));
        settitre(reponsemetie.rome.nom);
        setmobilite({
          romeevolution: reponsemetie.rome.romeevolution,
          romeproche: reponsemetie.rome.romeproche,
        });
        const data = reponsemetie.briquecompetance;
        const groupedData = {};
        data.forEach((item) => {
          const categorie = item.compGb.compGbCategorie;
          const titre = item.compGb.compGbTitre;
          if (!groupedData[categorie]) {
            groupedData[categorie] = {};
          }
          if (!groupedData[categorie][titre]) {
            groupedData[categorie][titre] = [];
          }
          groupedData[categorie][titre].push(item);
        });
        const dataT = reponsemetie.briquecontexte;
        const groupedDataT = {};
        dataT.forEach((item) => {
          const titre = item.contexte.ctxTrvTitre;
          if (!groupedDataT[titre]) {
            groupedDataT[titre] = [];
          }
          groupedDataT[titre].push(item);
        });
        setcontext(groupedDataT);
        setcompetance(groupedData);
        console.log(reponsemetie);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [code]);

  if (loading || error) {
    return (
      <Fragment>
        <HeaderInScreen title={"Fiche ROME - " + code} />
        {LoadingAPI(loading, error, page)}
      </Fragment>
    );
  }

  // Affichez les données récupérées
  return (
    <Fragment>
      <HeaderInScreen title={"Fiche ROME - " + code + " " + titre} />
      <Box
        backgroundColor="background.paper"
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={"auto"}
      >
        <Grid container spacing={2} color={"black.main"}>
          <Grid item xs={12} md={3}>
            {LeftMenu(page)}
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{
              [theme.breakpoints.up("lg")]: {
                mt: 5,
              },
              [theme.breakpoints.down("sm")]: {
                my: 1,
                mx: 0,
              },
              maxHeight: "85vh",
              height: "85vh",
              overflowX: "hidden",
            }}
          >
            <NavLink
              to="/competences"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Button
                key="metier"
                variant="outlined"
                size="large"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                &lt;&lt; Retour
              </Button>
            </NavLink>
            <ThemeProvider theme={theme}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    Emplois
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                    container
                    spacing={2}
                  >
                    {emplois.map((emploi) => (
                      <Grid item xs={6} key={emploi.id}>
                        <ListItem sx={{ p: 0 }}>
                          • {emploi.emploiTitre}
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    Définition
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                    container
                    spacing={2}
                  >
                    {definition.map((definitionitem) => (
                      <Grid item xs={11} key={definitionitem}>
                        <ListItem sx={{ p: 0 }}>• {definitionitem}</ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    Accès au métier
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                    container
                    spacing={2}
                  >
                    {access.map((definitionitem) => (
                      <Grid item xs={11} key={definitionitem}>
                        <ListItem sx={{ p: 0 }}>{definitionitem}</ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    Compétences
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {"SAVOIRS FAIRE" in competance ? (
                    <>
                      <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                        Savoir-faire
                      </Typography>
                      <hr></hr>
                      {Object.keys(competance["SAVOIRS FAIRE"]).map(
                        (accessitem) => (
                          <>
                            <></>
                            <Grid
                              sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                              container
                              spacing={2}
                            >
                              <Grid item xs={5} key={accessitem}>
                                <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
                              </Grid>
                              <Grid item xs={6} key={accessitem + "2"}>
                                {competance["SAVOIRS FAIRE"][accessitem].map(
                                  (datass) => (
                                    <ListItem sx={{ p: 0 }}>
                                      {" "}
                                      {datass.brqCompTitre}
                                    </ListItem>
                                  )
                                )}
                              </Grid>
                            </Grid>
                            <hr></hr>
                          </>
                        )
                      )}
                    </>
                  ) : null}
                  {"SAVOIR ÊTRE" in competance ? (
                    <>
                      <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                        Savoir-être professionnels
                      </Typography>
                      <hr></hr>
                      {Object.keys(competance["SAVOIR ÊTRE"]).map(
                        (accessitem) => (
                          <>
                            <></>
                            <Grid
                              sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                              container
                              spacing={2}
                            >
                              <Grid item xs={5} key={accessitem}>
                                <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
                              </Grid>
                              <Grid item xs={6} key={accessitem + "2"}>
                                {competance["SAVOIR ÊTRE"][accessitem].map(
                                  (datass) => (
                                    <ListItem sx={{ p: 0 }}>
                                      {" "}
                                      {datass.brqCompTitre}
                                    </ListItem>
                                  )
                                )}
                              </Grid>
                            </Grid>
                            <hr></hr>
                          </>
                        )
                      )}
                    </>
                  ) : null}
                  {"SAVOIRS" in competance ? (
                    <>
                      <Typography variant="h5" sx={{ mt: 2, ml: 2 }}>
                        Savoirs
                      </Typography>
                      <hr></hr>
                      {Object.keys(competance["SAVOIRS"]).map((accessitem) => (
                        <>
                          <></>
                          <Grid
                            sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                            container
                            spacing={2}
                          >
                            <Grid item xs={5} key={accessitem}>
                              <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
                            </Grid>
                            <Grid item xs={6} key={accessitem + "2"}>
                              {competance["SAVOIRS"][accessitem].map(
                                (datass) => (
                                  <ListItem sx={{ p: 0 }}>
                                    {" "}
                                    {datass.brqCompTitre}
                                  </ListItem>
                                )
                              )}
                            </Grid>
                          </Grid>
                          <hr></hr>
                        </>
                      ))}
                    </>
                  ) : null}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    Contextes de travail
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                    container
                    spacing={2}
                  >
                    {"CONDITIONS_TRAVAIL" in context ? (
                      <>
                        <Grid
                          sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                          container
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={5}
                            key={
                              "Conditions de travail et risques professionnels"
                            }
                          >
                            <ListItem sx={{ p: 0 }}>
                              {" "}
                              Conditions de travail et risques professionnels
                            </ListItem>
                          </Grid>
                          <Grid item xs={6}>
                            {context["CONDITIONS_TRAVAIL"].map((accessitem) => (
                              <ListItem sx={{ p: 0 }}>
                                {" "}
                                {accessitem.brqCtxTitre}
                              </ListItem>
                            ))}
                          </Grid>
                        </Grid>
                        <hr></hr>
                      </>
                    ) : null}
                    {"HORAIRE_ET_DUREE_TRAVAIL" in context ? (
                      <>
                        <Grid
                          sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                          container
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={5}
                            key={"Horaires et durée du travail"}
                          >
                            <ListItem sx={{ p: 0 }}>
                              {" "}
                              Horaires et durée du travail
                            </ListItem>
                          </Grid>
                          <Grid item xs={6}>
                            {context["HORAIRE_ET_DUREE_TRAVAIL"].map(
                              (accessitem) => (
                                <ListItem sx={{ p: 0 }}>
                                  {" "}
                                  {accessitem.brqCtxTitre}
                                </ListItem>
                              )
                            )}
                          </Grid>
                        </Grid>
                        <hr></hr>
                      </>
                    ) : null}
                    {"TYPE_BENEFICIAIRE" in context ? (
                      <>
                        <Grid
                          sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                          container
                          spacing={2}
                        >
                          <Grid item xs={5} key={"Publics spécifiques"}>
                            <ListItem sx={{ p: 0 }}>
                              {" "}
                              Publics spécifiques
                            </ListItem>
                          </Grid>
                          <Grid item xs={6}>
                            {context["TYPE_BENEFICIAIRE"].map((accessitem) => (
                              <ListItem sx={{ p: 0 }}>
                                {" "}
                                {accessitem.brqCtxTitre}
                              </ListItem>
                            ))}
                          </Grid>
                        </Grid>
                        <hr></hr>
                      </>
                    ) : null}
                    {"TYPE_STRUCTURE_ACCUEIL" in context ? (
                      <>
                        <Grid
                          sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                          container
                          spacing={2}
                        >
                          <Grid item xs={5} key={"Types de structures"}>
                            <ListItem sx={{ p: 0 }}>
                              {" "}
                              Types de structures
                            </ListItem>
                          </Grid>
                          <Grid item xs={6}>
                            {context["TYPE_STRUCTURE_ACCUEIL"].map(
                              (accessitem) => (
                                <ListItem sx={{ p: 0 }}>
                                  {" "}
                                  {accessitem.brqCtxTitre}
                                </ListItem>
                              )
                            )}
                          </Grid>
                        </Grid>
                        <hr></hr>
                      </>
                    ) : null}
                    {"LIEU_ET_DEPLACEMENT" in context ? (
                      <>
                        <Grid
                          sx={{ flexGrow: 1, mt: 1, ml: 2 }}
                          container
                          spacing={2}
                        >
                          <Grid item xs={5} key={"LIEU_ET_DEPLACEMENT"}>
                            <ListItem sx={{ p: 0 }}>
                              {" "}
                              LIEU_ET_DEPLACEMENT
                            </ListItem>
                          </Grid>
                          <Grid item xs={6}>
                            {context["LIEU_ET_DEPLACEMENT"].map(
                              (accessitem) => (
                                <ListItem sx={{ p: 0 }}>
                                  {" "}
                                  {accessitem.brqCtxTitre}
                                </ListItem>
                              )
                            )}
                          </Grid>
                        </Grid>
                        <hr></hr>
                      </>
                    ) : null}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h4" sx={{ mt: 1 }}>
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
                    {mobilite.romeproche.map((definitionitem) => (
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
                    {mobilite.romeevolution.map((definitionitem) => (
                      <Grid item xs={11} key={definitionitem.id}>
                        <ListItem sx={{ p: 0 }}>
                          {definitionitem.rome_coderome} {definitionitem.nom}
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default RomeDetailScreen;
