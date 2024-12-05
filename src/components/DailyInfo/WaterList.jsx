import { useState } from 'react';
import { SlPencil, SlTrash } from 'react-icons/sl';
import css from './WaterList.module.css';
import { useTranslation } from 'react-i18next';
import ModalDeleteEntry from './ModalDeleteEntry.jsx';
import WaterModal from '../WaterModal/WaterModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectChoosenDailyWater } from '../../redux/water/selectors';
import { deleteWater } from '../../redux/water/operations';
import { getFormattedDateForWaterList } from '../../utils/getDateNow';

const WaterList = () => {
  const { t } = useTranslation();
  const waterList = useSelector(selectChoosenDailyWater);
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Відкрити модальне вікно видалення
  const openDeleteModal = id => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  // Відкрити модальне вікно редагування
  const openEditModal = id => {
    setSelectedId(id);
    setIsEditModalOpen(true);
  };

  // Закрити модальне вікно
  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedId(null);
  };

  // Видалити елемент після підтвердження
  const confirmDelete = id => {
    dispatch(deleteWater(id));
    closeModal();
  };

  return (
    <>
      {waterList.length !== 0 && (
        <div className={css.waterListContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              overflow: 'hidden',
            }}
          >
            <defs>
              <symbol id="icon-water-glass" viewBox="0 0 31 32">
                <path d="M26.955 5.226c-.095-.321-.254-.616-.468-.868s-.477-.452-.772-.589a2.087 2.087 0 0 0-.937-.21H6.562a1.83 1.83 0 0 0-.937.197c-.301.139-.57.345-.785.604a2.36 2.36 0 0 0-.468.866 2.392 2.392 0 0 0-.089.984l2.076 18.377a5.202 5.202 0 0 0 1.633 3.255 4.78 4.78 0 0 0 3.253 1.313h8.861a4.804 4.804 0 0 0 3.266-1.313 5.316 5.316 0 0 0 1.62-3.255l1.127-10.331v-.158l.873-7.876a2.724 2.724 0 0 0-.038-.998zM14.17 25.375h-1.266a3.573 3.573 0 0 1-2.215-.945 3.744 3.744 0 0 1-1.139-2.192l-.304-2.258c-.039-.344.053-.691.258-.965s.504-.455.835-.503.667.04.936.246.45.512.503.854l.304 2.232c.034.244.151.467.329.63a1 1 0 0 0 .646.276h1.266c.336 0 .658.138.895.384s.371.58.371.928-.133.682-.371.928a1.242 1.242 0 0 1-.895.384h-.152zm10.127-12.116c-2.671.538-4.949.643-7.367-1.313-3-2.455-6.633-1.667-10.127-.381L6.17 5.999a.41.41 0 0 1 0-.171.337.337 0 0 1 .089-.144.257.257 0 0 1 .127-.105.262.262 0 0 1 .152 0h18.38a.53.53 0 0 1 .127.105.314.314 0 0 1 .076.144.304.304 0 0 1 0 .184l-.823 7.246z" />
              </symbol>
            </defs>
          </svg>
          <div className={css.waterList}>
            {waterList &&
              waterList.map(item => (
                <div key={item.id} className={css.waterItem}>
                  <svg className={css.waterIcon}>
                    <use href="#icon-water-glass" />
                  </svg>
                  <div className={css.waterDetails}>
                    <p className={css.waterAmount}>{item.amount} ml</p>
                    <p className={css.waterTime}>
                      {getFormattedDateForWaterList(item.date)}
                    </p>
                  </div>
                  <div className={css.waterActions}>
                    <button
                      className={css.waterEdit}
                      onClick={() => openEditModal(item.id)}
                      aria-label={t('chooseDate.edit')}
                    >
                      <SlPencil />
                    </button>
                    <button
                      className={css.waterDelete}
                      onClick={() => openDeleteModal(item.id)}
                      aria-label={t('chooseDate.delete')}
                    >
                      <SlTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {isDeleteModalOpen && (
            <ModalDeleteEntry
              id={selectedId}
              onClose={closeModal}
              onDelete={confirmDelete}
            />
          )}

          {isEditModalOpen && (
            <WaterModal
              operationType="edit"
              onClose={closeModal}
              water={waterList.find(item => item.id === selectedId)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default WaterList;
