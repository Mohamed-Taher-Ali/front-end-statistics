import { useDispatch, useSelector } from 'react-redux';
import { updateColorMode } from '../store/slices/colorMode';
import { IRootState } from 'src/store/types';
 
export function useLightDarkMode () {
  const state = useSelector(s => s as IRootState);
  const dispatch = useDispatch();

  const modesLabel = {
    moveToLight: 'Light mode',
    moveToDark: 'Dark mode',
  };

  const onToggle = () => {
    dispatch(updateColorMode(
      state.colorMode.currentMode.mode === 'dark'
      ? "light"
      : "dark"
    ));
  }

    return ({
      onToggle,
      modesLabel,
      mode: state.colorMode.currentMode.mode,
    })
}