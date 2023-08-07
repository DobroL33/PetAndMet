import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../images/new_logo.jpg';
import {useNavigate} from 'react-router-dom';


const pages = ['입양', '참여 소통', '후원', '로그인', '회원가입'];
const settings = ['입양 절차', '입양 신청', '입양 후기'];
const notify = ['공지 사항', '봉사 신청', 'Q & A'];
const charge = ['충전 하기', '후원 하기', '후원 후기'];

function Navbar() {

  let navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }
  const goToSignUP = () => {
    navigate('/register');
  }
  const goToAdoptProcess = () => {
    navigate('/adpotprocess');
  }
  const goToAdoptCheckList = () => {
    navigate('/adoptchecklist');
  }
  const goToAdoptReview = () => {
    navigate('/adoptreview');
  }
  const goToNotice = () => {
    navigate('/notice');
  }
  const goToVolunteer = () => {
    navigate('/volunteer');
  }
  const goToQna = () => {
    navigate('/qna');
  }
  const goToCharge = () => {
    navigate('/donate/charge');
  }
  const goToDonate = () => {
    navigate('/donate/item');
  }
  const goToDonateReview = () => {
    navigate('/donatereview');
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElNotify, setAnchorElNotify] = React.useState<null | HTMLElement>(null);
  const [anchorElCharge, setAnchorElCharge] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenNotify = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotify(event.currentTarget);
  };
  const handleCloseNotify = () => {
    setAnchorElNotify(null);
  };
  const handleOpenCharge = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCharge(event.currentTarget);
  };
  const handleCloseCharge = () => {
    setAnchorElCharge(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFA629' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
          >
            <img alt='logo' src={logo} style={{width: 100}}/>              
          </Typography>
          <Box sx = {{flexGrow : 1}}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Box sx={{flexGrow: 1}}></Box>
            <Box sx={{flexGrow: 1}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              >
              <MenuIcon />
            </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={
                    index === 0
                      ? handleOpenUserMenu
                      : index === 1
                      ? handleOpenNotify
                      : index === 2
                      ? handleOpenCharge
                      : index === 3
                      ? goToLogin
                      : index === 4
                      ? goToSignUP                   
                      : handleCloseNavMenu
                  }>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* 작아질 때 */}
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           <Box sx={{flexGrow: 1}}></Box>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={
                  index === 0
                  ? handleOpenUserMenu
                  : index === 1
                  ? handleOpenNotify
                  : index === 2
                  ? handleOpenCharge
                  : index === 3
                  ? goToLogin
                  : index === 4
                  ? goToSignUP
                    : handleCloseNavMenu
                }
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem 
                key={setting}
                 onClick={
                  index === 0
                  ? goToAdoptProcess
                  :index === 1
                  ? goToAdoptCheckList
                  :index === 2
                  ? goToAdoptReview
                  :handleCloseUserMenu
                  }>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNotify}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotify)}
              onClose={handleCloseNotify}
            >
              {notify.map((item, index) => (
                <MenuItem 
                  key={item}
                  onClick={
                    index === 0
                    ? goToNotice
                    :index === 1
                    ? goToVolunteer
                    :index === 2
                    ? goToQna
                    :handleCloseNotify
                  }>
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElCharge}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElCharge)}
              onClose={handleCloseCharge}
            >
              {charge.map((item, index) => (
                <MenuItem key={item} onClick={
                  index === 0
                  ? goToCharge
                  :index === 1
                  ? goToDonate
                  :index === 2
                  ? goToDonateReview
                  :handleCloseCharge
                  }>
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
