import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import type { SupportedFilterModes } from './App';

type Props = {
  onFilterChanged: (
    value: SupportedFilterModes | ((prev: SupportedFilterModes) => SupportedFilterModes)
  ) => void;
};

const FILTER_MODES: SupportedFilterModes[] = ['All', 'Active', 'Completed'];

export const FilterList = ({ onFilterChanged }: Props) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        backgroundColor: 'bisque',
        marginRight: '1.5vw',
      }}
    >
      {FILTER_MODES.map((mode) => (
        <BottomNavigationAction
          sx={{
            borderRadius: '2vw',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
          onClick={() => onFilterChanged(mode)}
          label={mode}
          key={mode}
        />
      ))}
    </BottomNavigation>
  );
};
