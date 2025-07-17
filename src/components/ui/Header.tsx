// /src/components/ui/Header.tsx
'use client';

import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, 
  ListItemButton, ListItemText, Divider, Container, Menu, MenuItem, Fade, CircularProgress
} from '@mui/material';
import { Link } from '@/i18n/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslations } from 'next-intl';
import { locations } from '@/lib/locations';

// --- 1. Import tools to check authentication state ---
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import LogOutButton from '../auth/LogOutButton'; // We reuse the logout button

export default function Header() {
  const t = useTranslations('Header');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // --- 2. Get the current user and loading state ---
  const [user, loading] = useAuthState(auth);

  const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
  const handleMenuClose = () => { setAnchorEl(null); };

  // --- UPDATED: Contact is now a standard navigation link ---
  const navLinks = [
    { text: t('about'), href: '/about' },
    { text: t('blogLink'), href: '/blog' },
    { text: t('contact'), href: '/contact' },
  ];

  // --- 3. Update the mobile drawer to be auth-aware ---
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'background.default', height: '100%' }}>
      <Typography variant="h6" sx={{ my: 2 }}>{t('mobileMenuTitle')}</Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
            <ListItemButton component={Link} href="/experiences" sx={{ textAlign: 'center' }}>
                <ListItemText primary={t('experiences')} />
            </ListItemButton>
        </ListItem>
        {navLinks.map((link) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton component={Link} href={link.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {/* Conditionally show Login or Logout in the mobile drawer */}
        {user ? (
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
                <LogOutButton />
            </ListItem>
        ) : (
            <ListItem disablePadding>
                <ListItemButton component={Link} href="/admin/login" sx={{ textAlign: 'center' }}>
                    <ListItemText primary={t('login')} sx={{ color: 'primary.main', fontWeight: 'bold' }}/>
                </ListItemButton>
            </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: '0 !important' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <Box component="img" src="/favicon.ico" alt={t('siteTitle')} sx={{ height: 40, mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {t('siteTitle')}
                </Typography>
              </Link>
            </Box>

            {isMobileOrTablet ? (
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            ) : (
              // --- 4. Update the Desktop view to be auth-aware ---
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box onMouseLeave={handleMenuClose}>
                  <Button color="inherit" onMouseEnter={handleMenuOpen} endIcon={<ArrowDropDownIcon />}>
                    {t('experiences')}
                  </Button>
                  <Menu id="experiences-menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose} TransitionComponent={Fade} MenuListProps={{ onMouseLeave: handleMenuClose }}>
                    <MenuItem component={Link} href="/experiences" onClick={handleMenuClose}>{t('allExperiences')}</MenuItem>
                    <Divider />
                    {locations.map((location) => (
                      <MenuItem key={location.id} component={Link} href={`/experiences?location=${location.id}`} onClick={handleMenuClose}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                
                {navLinks.map((link) => (
                  <Button key={link.text} color="inherit" component={Link} href={link.href}>
                    {link.text}
                  </Button>
                ))}
                
                {/* Conditionally render Login or Log Out button */}
                <Box sx={{ ml: 2 }}>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : user ? (
                    <LogOutButton />
                  ) : (
                    <Button variant="contained" color="primary" component={Link} href="/admin/login">
                      {t('login')}
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }}}>
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
