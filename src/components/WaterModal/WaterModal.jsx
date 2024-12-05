import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import css from './WaterModal.module.css'; // Стилі модального вікна
import s from '../ModalBackdrop/ModalBackdrop.module.css'; // Стилі бекдропу
import WaterForm from '../WaterForm/WaterForm';
import { ANIMATION } from '../../constants';
import svg from '../../assets/icons/sprite.svg';

const WaterModal = ({
  operationType,
  onClose,
  water = {},
  timestampFromUrl = '',
}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(true); // Стан для анімації бекдропу

  const dynamicStyle = clsx(s.backdrop, active && s.active); // Стилі для бекдропу

  // Закриття модального вікна з анімацією або натисканням кнопки
  const handleClose = useCallback(() => {
    setActive(false);
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  }, [onClose]);

  // Закриття при натисканні поза модальним вікном або клавіші Escape
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.removeAttribute('style');
    };
  }, [handleClose]);

  const modalHeader = operationType => {
    switch (operationType) {
      case 'add':
        return t('waterModal.add');
      case 'edit':
        return t('waterModal.edit');
      default:
        return t('addWaterTitle');
    }
  };

  const currentTimestamp = Number.isNaN(Number(timestampFromUrl))
    ? Date.now() // Встановлюємо поточний час, якщо дані некоректні
    : Number(timestampFromUrl);

  const recordTimestamp = Number.isNaN(Number(water.date))
    ? Date.now() // Або інше значення за замовчуванням
    : Number(water.date);

  /* const currentTimestamp = Number(timestampFromUrl);
  const recordTimestamp = Number(water.date); */

  const editTime = operationType => {
    return operationType === 'edit' ? recordTimestamp : currentTimestamp;
  };

  const waterPortion = operationType => {
    return operationType === 'edit' ? water.amount : 50;
  };

  const waterID = operationType => {
    return operationType === 'edit' ? water.id : null;
  };

  return (
    <div className={dynamicStyle} onClick={handleBackdropClick}>
      <div className={css.WaterModal}>
        <h1>{modalHeader(operationType)}</h1>
        <WaterForm
          operationType={operationType}
          editTime={editTime(operationType)}
          waterPortion={waterPortion(operationType)}
          waterID={waterID(operationType)}
          handleClose={handleClose}
        />
        <button
          type="button"
          onClick={handleClose}
          aria-label={t('closeWaterModal')}
          className={css.WaterModalCloseBtn}
        >
          <svg>
            <use xlinkHref={svg + '#icon-clear'}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterModal;
