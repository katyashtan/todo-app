import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import type { SupportedFilterModes } from './App';

type Props = {
  onFilterChanged: (
    value: SupportedFilterModes | ((prev: SupportedFilterModes) => SupportedFilterModes)
  ) => void;
};

export const FilterList = ({ onFilterChanged }: Props) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        backgroundColor: 'bisque',
        marginRight: '1.5vw',
      }}
    >
      <BottomNavigationAction
        sx={{
          borderRadius: '2vw',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
        onClick={() => onFilterChanged('All')}
        label="All"
      />
      <BottomNavigationAction
        sx={{
          borderRadius: '2vw',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
        onClick={() => onFilterChanged('Active')}
        label="Active"
      />
      <BottomNavigationAction
        sx={{
          borderRadius: '2vw',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
        onClick={() => onFilterChanged('Completed')}
        label="Completed"
      />
    </BottomNavigation>
  );
};
