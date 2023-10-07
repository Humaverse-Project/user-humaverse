import { LeftMenu } from "../../../shared";
import { Fragment, useState } from "react";
import { LoadingAPI } from "../../../shared";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button } from "@mui/material";

// components
import RomeScreen from "./RomeScreen";
import PosteScreen from "./PosteScreen";
import MetierScreen from "./MetierScreen";
import CompetanceScreen from "./CompetanceScreen";
import HeaderInScreen from "../../header/HeaderInScreen";

export default function MainScreen() {
  const theme = useTheme();
  const [screen, setScreen] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const page = "COMPETENCES";
  if (loading || error) {
    return (
      <Fragment>
        <HeaderInScreen title={page} />
        {LoadingAPI(loading, error, page)}
      </Fragment>
    );
  }
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
                color={"green"}
                size="large"
                onClick={(e) => setScreen(4)}
                sx={{ color: "black.main", fontWeight: "bold", mx: 2 }}
              >
                Métiers
              </Button>
            </Box>
            {screen === 1 && (
              <RomeScreen setError={setError} setLoading={setLoading} />
            )}
            {screen === 2 && (
              <CompetanceScreen setError={setError} setLoading={setLoading} />
            )}
            {screen === 3 && (
              <PosteScreen setError={setError} setLoading={setLoading} />
            )}
            {screen === 4 && (
              <MetierScreen setError={setError} setLoading={setLoading} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
