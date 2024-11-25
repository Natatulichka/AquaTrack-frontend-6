import WaterMainInfo from 'components/TrackerSection/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';

function TrackerPage() {
  return (
    <div className={css.container}>
      <WaterMainInfo />
    </div>
  );
}

export default TrackerPage;
