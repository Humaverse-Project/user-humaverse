import HeaderInScreen from '../../header/HeaderInScreen'
import { LeftMenu } from '../../../shared'
import { LoadingAPI } from '../../../shared'
import React, { Fragment, useState, useEffect } from 'react';
import { getdatacompetance } from '../../../services/CompetanceService'
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavLink, useParams } from 'react-router-dom';
import { Button, ListItem, Slider, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {datefonctionun} from "../../../services/DateFormat"

function CompetanceDetailScreen() {
    const { code } = useParams();
    const page = 'COMPETENCES'
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState(null);
    const [titre, settitre] = useState({});
    const [emploi, setEmplois] = useState({});
    const [definition, setdefinition] = useState([]);
    const [accreditation, setaccreditation] = useState([]);
    const [access, setaccess] = useState([]);
    const [mobilite, setmobilite] = useState({});
    const [ competance, setcompetance ] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await getdatacompetance(code);
                const reponsemetie = await datametierexistant;
                settitre(reponsemetie.ficCompTitreEmploi)
                setEmplois(reponsemetie.appelation)
                setdefinition(reponsemetie.appelation.romeData.rome_definition.split("\\n"))
                setaccess(reponsemetie.appelation.romeData.rome_acces_metier.split("\\n"))
                setmobilite({romeevolution: reponsemetie.appelation.romeData.romeevolution, romeproche: reponsemetie.appelation.romeData.romeproche})
                setaccreditation(reponsemetie.accreditation)
                const data = reponsemetie.briquesCompetencesNiveaux
                const groupedData = {};
                data.forEach((item) => {
                    const categorie = item.briquescompetances.compGb.compGbCategorie;
                    const titre = item.briquescompetances.compGb.compGbTitre;
                    if (!groupedData[categorie]) {
                      groupedData[categorie] = {};
                    }
                    if (!groupedData[categorie][titre]) {
                      groupedData[categorie][titre] = [];
                    }
                    let itemtopush = {
                        brqCompTitre: item.briquescompetances.brqCompTitre,
                        niveau: item.niveau
                    }
                    groupedData[categorie][titre].push(itemtopush);
                });
                setcompetance(groupedData)
                console.log(groupedData)
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError(true);
            }
            setLoading(false)
        };
        fetchData();
    }, [code]);
    

    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={'Competance - '+code}
              />
              { LoadingAPI (loading, error, page)}
          </Fragment>
        );
    }
  
    // Affichez les données récupérées
    return (
      <Fragment>
        <HeaderInScreen
            title={'Competance - '+titre}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={'auto'}
        >
            <Grid container spacing={2} color={"black.main"}>
                <Grid item xs={12} md={3}>
                    {LeftMenu(page)}
                </Grid>
                <Grid item xs={12} md={9}
                    sx={{
                        [theme.breakpoints.up('lg')]: {
                            mt: 5,
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                        },
                        maxHeight: "85vh",
                        height: "85vh",
                        overflowX: "hidden"
                    }}
                >
                    <NavLink
                            to="/competences"
                            style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}
                        >
                        <Button 
                            key="metier"
                            variant="contained"
                            color={'green'}
                            size='large'
                            sx={{ color: 'black.main', fontWeight: 'bold', mb:2}}>
                            RETOUR
                        </Button>
                    </NavLink>
                    <ThemeProvider theme={theme}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='h5' sx={{ mt:1 }}>Emplois</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid sx={{ flexGrow: 1,ml:2 }} container spacing={2}>
                                <Grid item xs={6} key={emploi.id}>
                                    <ListItem>• <b>Titre</b>: {emploi.emploiTitre}</ListItem>
                                    <ListItem>• <b>Date création</b>: {datefonctionun(emploi.createdAt)}</ListItem>
                                    <ListItem>• <b>Derniere mise à jours</b>: {datefonctionun(emploi.updatedAt)}</ListItem>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='h5' sx={{ mt:1 }}>Rome</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid sx={{ flexGrow: 1,mt:1, ml:2 }} container spacing={2}>
                                <Grid item xs={11} key={emploi.romeData.id}>
                                    <ListItem>• <b>Code ROME</b>: {emploi.romeData.rome_coderome}</ListItem>
                                    <ListItem>• <b>Libellé</b>: {emploi.romeData.nom}</ListItem>
                                </Grid>
                                <Grid item xs={11} key={emploi.romeData.id+"detail"}>
                                    <ListItem>• <b>Définition</b>: </ListItem>
                                    {definition.map((definitionitem) => (
                                        <Grid item xs={11} key={definitionitem} sx={{ pl:2 }}>
                                            <ListItem>- {definitionitem}</ListItem>
                                        </Grid>
                                    ))}
                                    <ListItem>• <b>Accès au métier</b>: </ListItem>
                                    {access.map((definitionitem) => (
                                        <Grid item xs={11} key={definitionitem}  sx={{ pl:2 }}>
                                            <ListItem>- {definitionitem}</ListItem>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Typography variant='h5' sx={{ mt:2,ml:2 }}>Fiches ROME proches</Typography><hr></hr>
                            <Grid sx={{ flexGrow: 1,mt:1, ml:2 }} container spacing={2}>
                                {mobilite.romeproche.map((definitionitem) => (
                                    <Grid item xs={11} key={definitionitem.id}>
                                        <ListItem sx={{p:0}}>{definitionitem.rome_coderome} {definitionitem.nom}</ListItem>
                                    </Grid>
                                ))}
                            </Grid>
                            <hr></hr>
                            <Typography variant='h5' sx={{ mt:2,ml:2 }}>Fiches ROME envisageables si évolution</Typography><hr></hr>
                            <Grid sx={{ flexGrow: 1,mt:1, ml:2 }} container spacing={2}>
                                {mobilite.romeevolution.map((definitionitem) => (
                                    <Grid item xs={11} key={definitionitem.id}>
                                        <ListItem sx={{p:0}}>{definitionitem.rome_coderome} {definitionitem.nom}</ListItem>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography variant='h5' sx={{ mt:1 }}>Compétences</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                { "SAVOIRS FAIRE" in competance ? (
                                    <><Typography variant='h5' sx={{ mt:2,ml:2 }}>Savoir-faire</Typography><hr></hr>
                                            {Object.keys(competance["SAVOIRS FAIRE"]).map((accessitem) => (
                                                <><Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                                    <Grid item xs={3} key={accessitem}>
                                                        <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
                                                    </Grid><Grid item xs={8} key={accessitem + "2"}>
                                                        {competance["SAVOIRS FAIRE"][accessitem].map((datass) => (
                                                            <>
                                                                <Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                                                    <Grid item xs={8} key={accessitem + "2"}>
                                                                        <ListItem sx={{ p: 0 }}> {datass.brqCompTitre}</ListItem>
                                                                    </Grid>
                                                                    <Grid item xs={4} key={datass.brqCompTitre + "11"}>
                                                                        <Slider
                                                                            defaultValue={datass.niveau}
                                                                            valueLabelDisplay="on"
                                                                            step={1}
                                                                            min={0}
                                                                            max={100}
                                                                            disabled
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                            
                                                        ))}
                                                    </Grid>
                                                </Grid><hr></hr></>
                                            ))}
                                        </>
                                ):
                                (null)
                                }
                                { "SAVOIR ÊTRE" in competance ? (
                                    <><Typography variant='h5' sx={{ mt:2,ml:2 }}>Savoir-être professionnels</Typography><hr></hr>
                                            {Object.keys(competance["SAVOIR ÊTRE"]).map((accessitem) => (
                                                <><Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                                    <Grid item xs={3} key={accessitem}>
                                                        <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
                                                    </Grid><Grid item xs={8} key={accessitem + "2"}>
                                                        {competance["SAVOIR ÊTRE"][accessitem].map((datass) => (
                                                            <>
                                                                <Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                                                    <Grid item xs={8} key={accessitem + "2"}>
                                                                        <ListItem sx={{ p: 0 }}> {datass.brqCompTitre}</ListItem>
                                                                    </Grid>
                                                                    <Grid item xs={4} key={datass.brqCompTitre + "11"}>
                                                                        <Slider
                                                                            defaultValue={datass.niveau}
                                                                            valueLabelDisplay="on"
                                                                            step={1}
                                                                            min={0}
                                                                            max={100}
                                                                            disabled
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                            
                                                        ))}
                                                    </Grid>
                                                </Grid><hr></hr></>
                                            ))}
                                    </>
                                ):
                                    (<></>)
                                }
                                { "SAVOIRS" in competance ? (
                                    <><Typography variant='h5' sx={{ mt:2,ml:2 }}>Savoirs</Typography><hr></hr>
                                            {Object.keys(competance["SAVOIRS"]).map((accessitem) => (
                                                <><Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                                    <Grid item xs={3} key={accessitem}>
                                                        <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
                                                    </Grid><Grid item xs={8} key={accessitem + "2"}>
                                                        { competance["SAVOIRS"][accessitem].map((datass) => (
                                                            <>
                                                                <Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                                                    <Grid item xs={8} key={accessitem + "2"}>
                                                                        <ListItem sx={{ p: 0 }}> {datass.brqCompTitre}</ListItem>
                                                                    </Grid>
                                                                    <Grid item xs={4} key={datass.brqCompTitre + "11"}>
                                                                        <Slider
                                                                            defaultValue={datass.niveau}
                                                                            valueLabelDisplay="on"
                                                                            step={1}
                                                                            min={0}
                                                                            max={100}
                                                                            disabled
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                            
                                                        ))}
                                                    </Grid>
                                                </Grid><hr></hr></>
                                            ))}
                                        </>
                                ):
                                (null)
                                }
                            </AccordionDetails>
                        </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='h5' sx={{ mt:1 }}>Accreditation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                <Grid item xs={4} key="entete">
                                    <ListItem sx={{ p: 0 }}> <b>Titre</b></ListItem>
                                </Grid><Grid item xs={4} key="valeur">
                                    <ListItem sx={{ p: 0 }}> <b>Valeur</b></ListItem>
                                </Grid>
                                <Grid item xs={4} key="ajout">
                                    <ListItem sx={{ p: 0 }}> <b>Date création</b></ListItem>
                                </Grid>
                            </Grid>
                            {accreditation.map((definitionitem) => (
                                <>
                                    <Grid sx={{ flexGrow: 1, mt: 1, ml: 2 }} container spacing={2}>
                                        <Grid item xs={4} key={definitionitem.id}>
                                            <ListItem sx={{ p: 0 }}> {definitionitem.accreTitre}</ListItem>
                                        </Grid><Grid item xs={4} key={definitionitem.accreTitre + "2"}>
                                            <ListItem sx={{ p: 0 }}> {definitionitem.value}</ListItem>
                                        </Grid>
                                        <Grid item xs={4} key={definitionitem.accreTitre + "5"}>
                                            <ListItem sx={{ p: 0 }}> {datefonctionun(definitionitem.createdAt)}</ListItem>
                                        </Grid>
                                    </Grid>
                                </>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    </ThemeProvider>
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default CompetanceDetailScreen