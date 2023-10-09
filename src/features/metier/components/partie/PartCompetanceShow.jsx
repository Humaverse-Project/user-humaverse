import { Grid, ListItem, Slider, Typography } from "@mui/material";

const PartCompetanceShow = ({ groupedData, type, titre }) => {
  if (groupedData === undefined) {
    return <></>;
  }
  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, pl: 2 }}>
        {titre}
      </Typography>
      <hr></hr>
      {Object.keys(groupedData[type]).map((accessitem) => (
        <>
          <Grid sx={{ flexGrow: 1, mt: 1, pl: 2 }} container spacing={2}>
            <Grid item xs={4} key={accessitem}>
              <ListItem sx={{ p: 0 }}> {accessitem}</ListItem>
            </Grid>
            <Grid item xs={8} key={accessitem + "111"}>
              {groupedData[type][accessitem].map((datass) => (
                <>
                  <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={6} key={accessitem + "44"}>
                      <ListItem sx={{ p: 0 }}>
                        {" "}
                        {datass.briquescompetances.brqCompTitre}
                      </ListItem>
                    </Grid>
                    <Grid item xs={6} key={accessitem + "11"}>
                      <Slider
                        value={datass.niveau}
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
          </Grid>
          <hr></hr>
        </>
      ))}
    </>
  );
};
export default PartCompetanceShow;
