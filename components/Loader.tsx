import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  size?: number;
}

const Loader = ({size}: Props) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary" size={size ? size : 60} />
      </Stack>
    </div>
  );
}

export default Loader