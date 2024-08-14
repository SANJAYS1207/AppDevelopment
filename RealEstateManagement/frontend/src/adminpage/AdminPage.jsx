import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
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
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router-dom';
import ManageProperties from './manage/ManageProperties';
import ManageUsers from './manage/ManageUsers';

const pages = [
  { name: 'Manage Properties', path: '/admin' },
  { name: 'Manage Users', path: '/manage-users' },
];

function AdminPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [adminDetails, setAdminDetails] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    // Fetch admin details from local storage
    try {
      const storedAdminDetails = JSON.parse(localStorage.getItem('adminDetails'));
      if (storedAdminDetails) {
        setAdminDetails(storedAdminDetails);
      } else {
        console.error('No admin details found in local storage');
        setAdminDetails(null); // Explicitly set to null if not found
      }
    } catch (error) {
      console.error('Error parsing admin details:', error);
      setAdminDetails(null); // Explicitly set to null on error
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    // Implement logout logic here, such as clearing session data
    console.log('Logging out...');
    // Clear adminDetails from localStorage
    localStorage.removeItem('adminDetails');
    localStorage.setItem('isAdminLoggedIn', 'false');
    // Redirect to login page after logout
    history.push('/');
  };

  if (adminDetails === null) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
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
              Welcome, {adminDetails.firstName}
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
                  <Avatar alt="Admin Avatar" src="/static/images/avatar/1.jpg" />
                </IconButton>
              </Tooltip>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  <List sx={{ paddingTop: '80px' }}>
                    <ListItem>
                      <ListItemText primary={`Username: ${adminDetails.username}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Email: ${adminDetails.email}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Phone: ${adminDetails.phoneNumber}`} />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/admin">
                      <ListItemText primary="Manage Properties" />
                    </ListItem>
                    <ListItem button component={Link} to="/manage-users">
                      <ListItemText primary="Manage Users" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={handleLogout} sx={{ textAlign: 'center', backgroundColor: 'red' }}>
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
          <Route path="/admin" component={ManageProperties} />
          <Route path="/manage-users" component={ManageUsers} />
          <Redirect exact from="/" to="/manage-properties" /> {/* Redirect to Manage Properties */}
        </Switch>
      </Box>
    </Router>
  );
}

export default AdminPage;
