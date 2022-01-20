import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

 const DropDownItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default DropDownItem