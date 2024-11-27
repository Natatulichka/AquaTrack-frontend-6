import css from './UserPanel.module.css';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
  const { t } = useTranslation();
  return (
    <div className={css.welcome}>
      {t('userPanel.greeting')}
      <span className={css.userName}>, Nadia</span>
    </div>
  );
};

export default UserPanel;
