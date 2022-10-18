import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <RotatingLines
      strokeColor="#3f51b5"
      strokeWidth="5"
      animationDuration="0.75"
      width="64"
      visible={true}
    />
  );
};
