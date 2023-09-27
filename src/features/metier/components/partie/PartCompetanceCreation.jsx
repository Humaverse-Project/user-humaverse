import * as React from "react";
import { Divider, Grid, ListItem, Slider } from "@mui/material";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
const Input = styled(MuiInput)`
  width: 42px;
`;
const PartCompetanceCreation = ({ handleSliderChange, accessitem, value }) => {
  const [valueInterne, setValueInterne] = React.useState(0);

  const handleSliderChangeinterne = (newValue, accessitem) => {
    handleSliderChange(newValue, accessitem);
  };

  const handleInputChange = (event, accessitem) => {
    setValueInterne(Number(event.target.value));
    handleSliderChange(
      event.target.value === "" ? 0 : Number(event.target.value),
      accessitem
    );
  };

  React.useEffect(() => {
    setValueInterne(value);
    handleSliderChange(value, accessitem);
  }, [value]);

  const handleBlur = (accessitem) => {
    if (value < 0) {
      setValueInterne(0);
      handleSliderChange(0, accessitem);
    } else if (value > 100) {
      setValueInterne(100);
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
          <ListItem sx={{ p: 0 }} key={accessitem.id + "544"}>
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
                defaultValue={0}
                value={valueInterne}
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
                value={valueInterne}
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
      <Divider variant="middle" />
    </>
  );
};

export default PartCompetanceCreation;
