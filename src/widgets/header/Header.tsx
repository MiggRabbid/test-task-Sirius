import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box
      component="header"
      className="mx-3! my-3! h-fit rounded-lg bg-white px-6 py-2! shadow-md"
    >
      <Typography component="h1" variant="h4" align="center">
        {'Тестовое задание для "Сириус Курсы"'}
      </Typography>
    </Box>
  );
}

export default Header;
