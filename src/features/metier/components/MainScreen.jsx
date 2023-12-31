import { LeftMenu } from "../../../shared";
import { Fragment, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button } from "@mui/material";
import { useParams } from "react-router-dom";
// components
import RomeScreen from "./RomeScreen";
import PosteScreen from "./PosteScreen";
import MetierScreen from "./MetierScreen";
import CompetanceScreen from "./CompetanceScreen";
import HeaderInScreen from "../../header/HeaderInScreen";

export default function MainScreen() {
  const { screennum } = useParams();
  const theme = useTheme();
  const [screen, setScreen] = useState(parseInt(screennum));
  const page = "COMPETENCES";

  return (
    <Fragment>
      <HeaderInScreen title={page} />
      <Box
        backgroundColor="background.paper"
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={"auto"}
      >
        <Grid container spacing={2}>
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
            }}
          >
            <Box display={"flex"}>
              <Button
                key="metier"
                variant="contained"
                color={screen === 1 ? "primary" : "green"}
                size="large"
                onClick={(e) => setScreen(1)}
                sx={{ color: "black.main", fontWeight: "bold" }}
              >
                Rome
              </Button>
              <Button
                key="competance"
                variant="contained"
                color={screen === 2 ? "primary" : "green"}
                size="large"
                onClick={(e) => setScreen(2)}
                sx={{ color: "black.main", fontWeight: "bold", mx: 2 }}
              >
                Compétences
              </Button>
              <Button
                key="Postes"
                variant="contained"
                color={screen === 3 ? "primary" : "green"}
                size="large"
                onClick={(e) => setScreen(3)}
                sx={{ color: "black.main", fontWeight: "bold", mx: 2 }}
              >
                Poste
              </Button>
              <Button
                key="apemp"
                variant="contained"
                color={screen === 4 ? "primary" : "green"}
                size="large"
                onClick={(e) => setScreen(4)}
                sx={{ color: "black.main", fontWeight: "bold", mx: 2 }}
              >
                Métiers
              </Button>
            </Box>
            {screen === 1 && <RomeScreen />}
            {screen === 2 && <CompetanceScreen />}
            {screen === 3 && (
              <PosteScreen />
            )}
            {screen === 4 && (
              <MetierScreen />
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
