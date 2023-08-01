import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import { DataGrid } from '@mui/x-data-grid';

function FicheRHScreen() {
    const [textToSearh, setTextToSearh] = useState()
    const theme = useTheme()
    const columns = [
        { field: 'nomEntreprise', headerName: 'nom Entreprise', width: 150 },
        { field: 'adresse', headerName: 'adresse', width: 130 },
        { field: 'siret', headerName: 'siret', width: 130 },
        {
          field: 'codeNAF',
          headerName: 'code NAF',
          width: 90,
        },
        { field: 'tailleEntreprise', headerName: 'taille Entreprise', width: 130 },
        { field: 'nomRH', headerName: 'nom RH', width: 130 },
        { field: 'numeroTVA', headerName: 'numero TVA', width: 130 },
    ];
    const rows = [
        {
            id: 1,
            nomEntreprise: "La Société Innovante SAS",
            adresse: "123 Rue de la Révolution, 75001 Paris, France",
            siret: "12345678900001",
            codeNAF: "6201Z",
            tailleEntreprise: "50 salariés",
            nomRH: "Marie Dupont",
            numeroTVA: "FR12345678901",
        },
        {
            id: 2,
            nomEntreprise: "TechnoTech Solutions",
            adresse: "456 Avenue de l'Innovation, 69002 Lyon, France",
            siret: "98765432100002",
            codeNAF: "5829C",
            tailleEntreprise: "100 salariés",
            nomRH: "Paul Martin",
            numeroTVA: "FR98765432102",
        },
        {
            id: 3,
            nomEntreprise: "MegaData Services",
            adresse: "789 Rue du Futur, 31000 Toulouse, France",
            siret: "65432109800003",
            codeNAF: "7311Z",
            tailleEntreprise: "30 salariés",
            nomRH: "Sophie Leclerc",
            numeroTVA: "FR65432109803",
        },
        {
            id: 4,
            nomEntreprise: "GlobalTech Corporation",
            adresse: "567 Tech Street, San Francisco, CA 94105, USA",
            siret: "78901234500004",
            codeNAF: "6202A",
            tailleEntreprise: "250 employees",
            nomRH: "John Smith",
            numeroTVA: "US78901234504",
        },
        {
            id: 5,
            nomEntreprise: "EcoGreen Solutions Ltd.",
            adresse: "23 Green Lane, London E1 7EZ, UK",
            siret: "54321098700005",
            codeNAF: "3511Z",
            tailleEntreprise: "75 employees",
            nomRH: "Emily Watson",
            numeroTVA: "UK54321098705",
        },
        {
            id: 6,
            nomEntreprise: "InnoTech GmbH",
            adresse: "12 Innovation Strasse, 10115 Berlin, Germany",
            siret: "13579246800006",
            codeNAF: "7112B",
            tailleEntreprise: "80 Mitarbeiter",
            nomRH: "Thomas Müller",
            numeroTVA: "DE13579246806",
        },
        {
            id: 7,
            nomEntreprise: "AlphaSoft Solutions",
            adresse: "789 Software Avenue, Bangalore 560001, India",
            siret: "24681357900007",
            codeNAF: "6209Z",
            tailleEntreprise: "200 employees",
            nomRH: "Asha Patel",
            numeroTVA: "IN24681357907",
        },
        {
            id: 8,
            nomEntreprise: "TechVision Co.",
            adresse: "100 Tech Park, Tokyo 100-0001, Japan",
            siret: "97531086400008",
            codeNAF: "6201A",
            tailleEntreprise: "150 employees",
            nomRH: "Takeshi Nakamura",
            numeroTVA: "JP97531086408",
        },
        {
            id: 9,
            nomEntreprise: "Nouvelle Tech SARL",
            adresse: "23 Rue de l'Innovation, 75002 Paris, France",
            siret: "86420975300009",
            codeNAF: "5821Z",
            tailleEntreprise: "40 salariés",
            nomRH: "Julie Martin",
            numeroTVA: "FR86420975309",
        },
        {
            id: 10,
            nomEntreprise: "Dynamic Software Inc.",
            adresse: "456 Software Lane, New York, NY 10001, USA",
            siret: "98765432100010",
            codeNAF: "6202B",
            tailleEntreprise: "300 employees",
            nomRH: "Robert Johnson",
            numeroTVA: "US98765432110",
        },
        {
            id: 11,
            nomEntreprise: "MegaCorp Ltd.",
            adresse: "789 Corporate Road, London SW1A 1AA, UK",
            siret: "65432109800011",
            codeNAF: "7022Z",
            tailleEntreprise: "500 employees",
            nomRH: "Emma Williams",
            numeroTVA: "UK65432109811",
        },
        {
            id: 12,
            nomEntreprise: "WebTech Solutions",
            adresse: "12 Web Avenue, Berlin 10178, Germany",
            siret: "24681357900012",
            codeNAF: "6203A",
            tailleEntreprise: "90 Mitarbeiter",
            nomRH: "Hans Schmidt",
            numeroTVA: "DE24681357912",
        },
        {
            id: 13,
            nomEntreprise: "InfoTech India Pvt. Ltd.",
            adresse: "789 IT Park, Mumbai 400001, India",
            siret: "13579246800013",
            codeNAF: "6203B",
            tailleEntreprise: "120 employees",
            nomRH: "Amit Singh",
            numeroTVA: "IN13579246813",
        },
        {
            id: 14,
            nomEntreprise: "JapanTech Co.",
            adresse: "100 Technology Road, Tokyo 100-0002, Japan",
            siret: "97531086400014",
            codeNAF: "6209Z",
            tailleEntreprise: "80 employees",
            nomRH: "Yuki Tanaka",
            numeroTVA: "JP97531086414",
        },
        {
            id: 15,
            nomEntreprise: "TechNouveau SARL",
            adresse: "23 High-Tech Street, Paris 75003, France",
            siret: "86420975300015",
            codeNAF: "6202A",
            tailleEntreprise: "65 salariés",
            nomRH: "Sophie Bernard",
            numeroTVA: "FR86420975315",
        },
        {
            id: 16,
            nomEntreprise: "InnoTech Solutions Pvt. Ltd.",
            adresse: "456 Innovation Road, Bangalore 560002, India",
            siret: "98765432100016",
            codeNAF: "5829C",
            tailleEntreprise: "180 employees",
            nomRH: "Rajesh Sharma",
            numeroTVA: "IN98765432116",
        },
        {
            id: 17,
            nomEntreprise: "WebVision Co.",
            adresse: "789 Web Park, New York, NY 10002, USA",
            siret: "65432109800017",
            codeNAF: "6203B",
            tailleEntreprise: "220 employees",
            nomRH: "Sarah White",
            numeroTVA: "US65432109817",
        },
        {
            id: 18,
            nomEntreprise: "TechNexus GmbH",
            adresse: "12 Tech Center, Berlin 10179, Germany",
            siret: "24681357900018",
            codeNAF: "6201Z",
            tailleEntreprise: "100 Mitarbeiter",
            nomRH: "Michael Bauer",
            numeroTVA: "DE24681357918",
        },
        {
            id: 19,
            nomEntreprise: "TechSolutions India Pvt. Ltd.",
            adresse: "789 IT Center, Mumbai 400002, India",
            siret: "13579246800019",
            codeNAF: "5821Z",
            tailleEntreprise: "50 employees",
            nomRH: "Anita Verma",
            numeroTVA: "IN13579246819",
        },
        {
            id: 20,
            nomEntreprise: "TechWave Co.",
            adresse: "100 Tech Avenue, Tokyo 100-0003, Japan",
            siret: "97531086400020",
            codeNAF: "6202B",
            tailleEntreprise: "75 employees",
            nomRH: "Kenji Suzuki",
            numeroTVA: "JP97531086420",
        },
    ];
    return (
        <Fragment>
            <HeaderInScreen
                title={'Fiche par utilisateur RH'}
                secondSubtitle={textToSearh && 'Recherche'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                flexDirection="row"
                sx={{
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
                justifyContent="space-between"
                alignItems="flex-start"
                minHeight="80vh"
                py={6}
                px={4}
            >
                <Box>
                    <TextField
                        id="outlined-basic"
                        value={textToSearh}
                        onChange={(e) => setTextToSearh(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <FormGroup sx={{ ml: 2, mt: 1 }}>
                        
                    </FormGroup>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        [theme.breakpoints.down('md')]: {
                            alignItems: 'flex-start',
                            mt: 8
                        },
                        flex: 2,
                        ml: 6,
                        [theme.breakpoints.down('lg')]: {
                            ml: 0,
                        },
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>
            </Box>
        </Fragment>
    )
}
export default FicheRHScreen