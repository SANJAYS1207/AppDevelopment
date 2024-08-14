import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Properties from './properties/Properties';
import ForSale from './properties/ForSale';
import ForRent from './properties/ForRent';
import PropertyForm from './properties/PropertyForm';
import Contribution from './properties/Contribution';
import { Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import UpdateProfile from './properties/UpdateProfile';
const pages = [
  { name: 'Property', path: '/property' },
  { name: 'For Sale', path: '/forsale' },
  { name: 'For Rent', path: '/forrent' },
  { name: 'Sell Your Own', path: '/sellyourown' },
  { name: 'Your Properties', path: '/youcontribution' },
];

function UserPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState(null);
  const [userProperties, setUserProperties] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    try {
      const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (storedUserDetails) {
        setUserDetails(storedUserDetails);

        fetch(`http://localhost:3002/properties?user_id=${storedUserDetails.id}`)
          .then(response => response.json())
          .then(data => setUserProperties(data))
          .catch(error => console.error('Error fetching properties:', error));
      } else {
        console.error('No user details found in local storage');
      }
    } catch (error) {
      console.error('Error parsing user details:', error);
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('userDetails');
    localStorage.setItem('isUserLoggedIn', 'false');
    history.push('/');
  };

  const handleUpdate = () => {
    history.push('/updateprofile'); // Update profile route
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppBar position="fixed" sx={{ bgcolor: 'gray', zIndex: 1300 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Welcome, {userDetails.firstname}
            </Typography>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  sx={{ my: 2, color: 'white', display: 'block', mx: 5 }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Profile">
                <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                </IconButton>
              </Tooltip>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  <List sx={{ paddingTop: '80px' }}>
                    <ListItem>
                      <ListItemText primary={`Username: ${userDetails.firstname}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Email: ${userDetails.email}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Phone: ${userDetails.phoneNumber}`} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Properties:" />
                    </ListItem>
                    {userProperties.length > 0 ? (
                      userProperties.map((property) => (
                        <ListItem key={property.id}>
                          <ListItemText primary={property.type} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No properties found" />
                      </ListItem>
                    )}
                    <Divider />
                    {/* <ListItem button onClick={handleUpdate} sx={{ textAlign: 'center', backgroundColor: 'blue', color: 'white' }}>
                      <ListItemText primary="Update" />
                    </ListItem> */}
                    <ListItem button onClick={handleLogout} sx={{ textAlign: 'center', backgroundColor: 'red', color: 'white' }}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ mt: 10 }}>
        <Switch>
          <Route path="/property" component={Properties} />
          <Route path="/forsale" component={ForSale} />
          <Route path="/forrent" component={ForRent} />
          <Route path="/sellyourown" component={PropertyForm} />
          <Route path="/youcontribution" component={Contribution} />
          <Route path="/updateprofile" component={UpdateProfile} />
          {/* Add route for update profile */}
          <Route path="/updateprofile">
            {/* Add your UpdateProfile component here */}
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}

export default UserPage;
