import { Divider, Grid, ListItem } from "@mui/material";

const ContextTravailShow = ({ context, type, titre }) => {
  if (context === undefined) {
    return <></>;
  }
  return (
    <>
        <Grid
            sx={{ flexGrow: 1, mt: 1, ml: 2 }}
            container
            spacing={2}
        >
            <Grid
            item
            xs={5}
            key={type}
            >
            <ListItem sx={{ p: 0 }}>
                {" "}
                {titre}
            </ListItem>
            </Grid>
            <Grid item xs={6}>
            {context[type].map(
                (accessitem) => (
                <ListItem sx={{ p: 0 }}>
                    {" "}
                    {accessitem.brqCtxTitre}
                </ListItem>
                )
            )}
            </Grid>
        </Grid>
        <Divider variant="middle" sx={{width:"100%"}}/>
    </>
  );
};
export default ContextTravailShow;
