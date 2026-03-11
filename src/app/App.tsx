import { Box } from '@mui/material';
import { chips } from '@/shared/data';
import { WidthSwitcher } from '@/shared/ui/width-switcher';
import { Header } from '@/widgets/header';
import { ChipList } from '@/widgets/chip-list';

function App() {
  return (
    <Box>
      <Header />
      <Box className="px-6! py-8!">
        <WidthSwitcher>
          <ChipList items={chips} />
        </WidthSwitcher>
      </Box>
    </Box>
  );
}

export default App;
