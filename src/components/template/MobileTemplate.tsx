import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestoreIcon from '@material-ui/icons/Restore';
import React from "react";
type MobileTemplateProps = {};

const MobileTemplate: React.FC<MobileTemplateProps> = ({ ...props }) => {
  const [value, setValue] = React.useState(0);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Simple Question App
        </Typography>
        {props.children}
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="MyPage" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Box>
    </Container>
  );
};

export default MobileTemplate;
