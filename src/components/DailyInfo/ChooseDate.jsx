import css from './ChooseDate.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectChoosenDay } from '../../redux/common/selectors';
import { useEffect } from 'react';
import { setSelectedDay } from '../../redux/common/operations';
import { useParams } from 'react-router';

const ChooseDate = () => {
  const { t } = useTranslation();
  const { date } = useParams();
  const { isToday, day, month } = getDateMonthString(parseDateTime(date));
  const dispatch = useDispatch();
  //   const dateString = isToday
  //   ? t('chooseDate.today')
  //   : `${day} ${t(month + 'Day')}`;
  // return <h3 className={css.selectedDate}>{dateString}</h3>;
  const selectedDay = useSelector(selectChoosenDay);

  useEffect(() => {
    dispatch(setSelectedDay(new Date()));
  }, [dispatch]);

  return <h3 className={css.selectedDate}>{selectedDay}</h3>;
};

export default ChooseDate;
