import * as React from "react";
import { Divider, Grid, ListItem, Slider } from "@mui/material";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
const Input = styled(MuiInput)`
  width: 42px;
`;
const PartCompetanceCreation = ({ handleSliderChange, accessitem }) => {
  const [value, setValue] = React.useState(
    typeof accessitem.niveau === "number" ? accessitem.niveau : 0
  );

  const handleSliderChangeinterne = (newValue, accessitem) => {
    setValue(newValue);
    accessitem.niveau = newValue;
    handleSliderChange(newValue, accessitem);
  };
  const handleInputChange = (event, accessitem) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
    accessitem.niveau =
      event.target.value === "" ? 0 : Number(event.target.value);
    handleSliderChange(
      event.target.value === "" ? 0 : Number(event.target.value),
      accessitem
    );
  };

  const handleBlur = (accessitem) => {
    if (value < 0) {
      setValue(0);
      accessitem.niveau = 0;
      handleSliderChange(0, accessitem);
    } else if (value > 100) {
      setValue(100);
      accessitem.niveau = 100;
      handleSliderChange(100, accessitem);
    }
  };

  return (
    <>
      <Grid
        sx={{ flexGrow: 1, mt: 1, pl: 3 }}
        container
        spacing={2}
        key={accessitem.id + "2"}
      >
        <Grid item xs={9} key={accessitem.id}>
          <ListItem sx={{ p: 0, ml: 3 }} key={accessitem.id + "544"}>
            {" "}
            {accessitem.brqCompTitre}
          </ListItem>
        </Grid>
        <Grid item xs={3} key={accessitem.id + "range"}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={accessitem.id + "container"}
          >
            <Grid item xs={9} key={accessitem.id + "gridslide"}>
              <Slider
                key={accessitem.id + "slide"}
                value={
                  typeof accessitem.niveau === "number" ? accessitem.niveau : 0
                }
                onChange={(event, newValue) =>
                  handleSliderChangeinterne(newValue, accessitem)
                }
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={100}
              />
            </Grid>
            <Grid item xs={3} key={accessitem.id + "gridinput"}>
              <Input
                key={accessitem.id + "input"}
                value={
                  typeof accessitem.niveau === "number" ? accessitem.niveau : 0
                }
                size="small"
                onChange={(e) => handleInputChange(e, accessitem)}
                onBlur={() => handleBlur(accessitem)}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PartCompetanceCreation;
