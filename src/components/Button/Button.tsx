import ClipLoader from "react-spinners/ClipLoader";
import './Button.scss'
import {CSSProperties} from "react";
import useWindowDimensions from "../../hooks";

type ButtonProps = {
    isLoading: boolean,
};

export const Button  = (props: ButtonProps) => {
  const {
    isLoading,
  } = props;
  const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "#ffffff",
  };

  const { width } = useWindowDimensions();

  return (
      <button className='btn-send' type='submit' disabled={isLoading}>
          {isLoading ? <ClipLoader color={'#ffffff'} loading={isLoading} cssOverride={override} size={width > 600 ? 33 : 22.5} /> : 'Оставить заявку'}
      </button>
  );
};