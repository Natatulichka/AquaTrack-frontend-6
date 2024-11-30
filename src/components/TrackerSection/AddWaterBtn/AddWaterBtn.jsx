import css from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = () => {
  const { t } = useTranslation();
  return (
    <button className={css.addWaterBtn} type="button">
      + {t('waterModal.add')}
    </button>
  );
};

export default AddWaterBtn;
