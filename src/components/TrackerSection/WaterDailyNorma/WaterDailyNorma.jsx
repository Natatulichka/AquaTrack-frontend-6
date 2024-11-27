import { useTranslation } from 'react-i18next';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const dayliNorma = 1.5;

  return (
    <div className={css.dayliNorma}>
      <p className={css.dayliNormaLiters}>
        {dayliNorma}
        {t('waterDailyNorma.liters')}
      </p>
      <p className={css.dayliNormaText}>{t('waterDailyNorma.dailyNorma')}</p>
    </div>
  );
};

export default WaterDailyNorma;
