import { Box } from "@mui/system";

function Row({children, ...props}){
    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", ...props}}>
            {children}
        </Box>
    )
}

export default Row;