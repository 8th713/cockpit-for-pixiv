import React from 'react'
import { Box } from './Box'
import { SxProps } from './utils'
import { SvgIcon } from './SvgIcon'

interface IconProps extends React.ComponentProps<typeof SvgIcon> {}

export interface LabelProps extends SxProps {
  children?: React.ReactNode
  icon: React.ComponentType<IconProps>
}

export const Label = ({ children, icon: Icon, sx, ...props }: LabelProps) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      ...sx
    }}
    {...props}
  >
    <Icon width="18" height="18" sx={{ mr: 1 }} />
    {children}
  </Box>
)
