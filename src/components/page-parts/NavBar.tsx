import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/styles'
import { Theme } from '@mui/material/styles'

const settings = ['Celsius Mode', 'Dark Mode']

const NavBar = (): JSX.Element => {
  const theme = useTheme<Theme>()

  const [anchorElSettings, setAnchorElSettings] = useState<Element | null>(null)

  const handleOpenSettingsMenu = (event: React.MouseEvent) => {
    setAnchorElSettings(event.currentTarget)
  }

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null)
  }

  return (
    <AppBar position='static' sx={{ background: theme.palette.primary.main }}>
      <Container maxWidth='sm'>
        <Toolbar disableGutters sx={{ ml: theme.custom.margin, mr: theme.custom.margin }}>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Tooltip title='View info about game'>
              <IconButton size='large' aria-label='help button' aria-haspopup='true' color='inherit'>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant='h1'
            noWrap
            component='div'
            align='center'
            color={theme.palette.primary.contrastText}
            sx={{
              mr: 2,
              flexGrow: 1,
              display: 'flex',
              letterSpacing: '2px',
              fontWeight: 300,
              lineHeight: { xs: '1.2rem', sm: '1.6rem' },
              fontSize: { xs: '1.4rem', sm: '1.8rem' },
            }}
          >
            WEATHER
            <br />
            GUESSER
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton
                size='large'
                aria-label='settings button'
                aria-haspopup='true'
                onClick={handleOpenSettingsMenu}
              >
                <SettingsIcon style={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElSettings}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSettings)}
              onClose={handleCloseSettingsMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseSettingsMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar