import { Divider, Grid, ListItem, Slider, Typography } from "@mui/material"


const PartCompetanceCreation = ({ competance, type, handleSliderChange, titre }) => {
    if(competance === undefined){
        return(
            <></>
        )
    }
    return (
        <><Typography variant='h5' sx={{ mt:2,ml:2 }}>{titre}</Typography>
            {competance[type].map((accessitem) => (
                <>
                <Grid sx={{ flexGrow: 1, mt: 1, pl: 3 }} container spacing={2} key={accessitem.id+"2"}>
                <Grid item xs={9} key={accessitem.id}>
                    <ListItem sx={{ p: 0 }} key={accessitem.id+"544"}> {accessitem.brqCompTitre}</ListItem>
                </Grid>
                <Grid item xs={3} key={accessitem.id+"range"}>
                    <Slider
                    defaultValue={0}
                    onChange={(event, newValue)=>handleSliderChange(newValue, accessitem)}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={100}
                    />
                </Grid>
                </Grid><Divider variant="middle" /></>
            ))}
        </>
    )
}

export default PartCompetanceCreation