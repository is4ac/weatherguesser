import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Theme,
  ThemeProvider,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext, lighterPalette, darkPalette } from 'src/styles/theme'
import { TempModeContext } from 'src/contexts'

const SettingsDialog = ({ open, onClose }: { open: boolean; onClose: () => void }): JSX.Element => {
  const theme = useTheme<Theme>()

  const colorMode = useContext(ColorModeContext)
  const tempMode = useContext(TempModeContext)

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose} sx={{}}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='button'>Settings</Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <FormControlLabel
            sx={{ mt: 1 }}
            control={<Switch checked={theme.palette.mode === 'dark'} onChange={colorMode.toggleColorMode} />}
            label='Dark mode'
            labelPlacement='start'
          />
          <Tooltip title='Celsius mode coming soon'>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={<Switch disabled checked={tempMode.mode === 'C'} onChange={tempMode.toggleTempMode} />}
              label='Celsius mode'
              labelPlacement='start'
            />
          </Tooltip>
        </Box>
      </DialogContent>
      <DialogActions>
        <ThemeProvider theme={theme.palette.mode === 'dark' ? lighterPalette : darkPalette}>
          <Button color='primary' variant='text' onClick={onClose}>
            Close
          </Button>
        </ThemeProvider>
      </DialogActions>
    </Dialog>
  )
}

export default SettingsDialog
