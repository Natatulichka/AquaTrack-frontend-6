import Logo from 'components/Logo/logo';
import BottleImg from '../BottleImg/BottleImg';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import css from './WaterMainInfo.module.css';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';

const WaterMainInfo = () => {
  return (
    <div className={css.waterMainInfo}>
      <Logo />

      <BottleImg />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
