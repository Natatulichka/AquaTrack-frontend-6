import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersCount } from '../../redux/common/operations';
import {
  selectCountUsers,
  selectCommonError,
} from '../../redux/common/selectors';
import styles from './advantages-section.module.css';
import { FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Section from 'components/Section/Section.jsx';
const AdvantagesSection = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userCount = useSelector(selectCountUsers);
  const error = useSelector(selectCommonError);

  useEffect(() => {
    dispatch(getUsersCount());
  }, [dispatch]);

  return (
    <Section>
      <section className={styles.AdvantagesSection}>
        <div className={styles.container}>
          <div className={styles.buttonCustomers}>
            <button className={styles.button}>
              <div className={styles.imageContainer}>
                <picture className={styles.image}>
                  <source
                    srcSet="/img/customers/customer_1_tab_desk_1x.webp 1x,
                            /img/customers/customer_1_tab_desk_2x.webp 2x"
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet="/img/customers/customer_1_mob_1x.webp 1x,
                            /img/customers/customer_1_mob_2x.webp 2x"
                    media="(max-width: 768px)"
                  />

                  <img
                    src="/img/customers/customer_1_mob_1x.webp"
                    alt="Customer 1"
                  />
                </picture>

                <picture className={styles.image}>
                  <source
                    srcSet="src/assets/img/customers/customer_2_tab_desk_1x.webp 1x,
                            src/assets/img/customers/customer_2_tab_desk_2x.webp 2x"
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet="src/assets/img/customers/customer_2_mob_1x.webp 1x,
                            src/assets/img/customers/customer_2_mob_2x.webp 2x"
                    media="(max-width: 768px)"
                  />
                  <img
                    src="src/assets/img/customers/customer_2_mob_1x.webp"
                    alt="Customer 2"
                  />
                </picture>

                <picture className={styles.image}>
                  <source
                    srcSet="src/assets/img/customers/customer_3_tab_desk_1x.webp 1x,
                           src/assets/img/customers/customer_3_tab_desk_2x.webp 2x"
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet="src/assets/img/customers/customer_3_mob_1x.webp 1x,
                            src/assets/img/customers/customer_3_mob_2x.webp 2x"
                    media="(max-width: 768px)"
                  />
                  <img
                    src="src/assets/img/customers/customer_3_mob_1x.webp"
                    alt="Customer 3"
                  />
                </picture>
              </div>
              <h3 className={styles.textCustomers}>
                <span>
                  {userCount !== null
                    ? t('homepage.advantages.our', { counter: userCount })
                    : t('homepage.advantages.our', { counter: 0 })}
                  <span className={styles.accent}>
                    {t('homepage.advantages.accent')}
                  </span>
                  {t('homepage.advantages.customers')}
                </span>
              </h3>
            </button>
          </div>
          <ul className={styles.buttonsBenefits}>
            <li className={styles.buttonHabitDrive}>
              <FaCircle className={styles.icon} />
              <p className={styles.habitDrive}>
                {t('homepage.advantages.habitDrive')}
              </p>
            </li>
            <li className={styles.buttonViewStatistics}>
              <p className={styles.viewStatistics}>
                {t('homepage.advantages.viewStatistic')}
              </p>
            </li>
            <li className={styles.buttonPersonalRateSetting}>
              <p className={styles.personalRateSetting}>
                {t('homepage.advantages.personalSetting')}
              </p>
            </li>
          </ul>
          {error && <p className={styles.error}>Error: {error}</p>}
        </div>
      </section>
    </Section>
  );
};

export default AdvantagesSection;
