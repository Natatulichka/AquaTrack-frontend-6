import { useState, useEffect } from 'react';
import styles from './advantages-section.module.css';
import { FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Section from 'components/Section/Section.jsx';
const AdvantagesSection = () => {
  const { t } = useTranslation();

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/users-count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
        setUserCount(0);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <Section>
      <section className={styles.AdvantagesSection}>
        <div className={styles.container}>
          <div className={styles.buttonCustomers}>
            <button className={styles.button}>
              <div className={styles.imageContainer}>
                <picture className={styles.image}>
                  <source
                    srcSet="
                                src/assets/img/customers/customer_1_tab_desk_1x.webp 1x,
                                src/assets/img/customers/customer_1_tab_desk_2x.webp 2x
                        "
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet="
                              src/assets/img/customers/customer_1_mob_1x.webp 1x,
                              src/assets/img/customers/customer_1_mob_2x.webp 2x
                              "
                    media="(max-width: 768px)"
                  />

                  <img
                    src="src/assets/img/customers/customer_1_mob_1x.webp"
                    alt="Customer 1"
                  />
                </picture>

                <picture className={styles.image}>
                  <source
                    srcSet="
                                src/assets/img/customers/customer_2_tab_desk_1x.webp 1x,
                                src/assets/img/customers/customer_2_tab_desk_2x.webp 2x
                        "
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet="
                              src/assets/img/customers/customer_2_mob_1x.webp 1x,
                              src/assets/img/customers/customer_2_mob_2x.webp 2x
                              "
                    media="(max-width: 768px)"
                  />
                  <img
                    src="src/assets/img/customers/customer_2_mob_1x.webp"
                    alt="Customer 2"
                  />
                </picture>

                <picture className={styles.image}>
                  <source
                    srcSet="
                                src/assets/img/customers/customer_3_tab_desk_1x.webp 1x,
                                src/assets/img/customers/customer_3_tab_desk_2x.webp 2x
                        "
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet="
                              src/assets/img/customers/customer_3_mob_1x.webp 1x,
                              src/assets/img/customers/customer_3_mob_2x.webp 2x
                              "
                    media="(max-width: 768px)"
                  />
                  <img
                    src="src/assets/img/customers/customer_3_mob_1x.webp"
                    alt="Customer 3"
                  />
                </picture>
              </div>
              <h3 className={styles.textCustomers}>
                {userCount !== null
                  ? t('homepage.advantages.customers', { counter: userCount })
                  : t('homepage.advantages.customers', { counter: 0 })}
                {/* Our <span className={styles.accent}>happy</span> customers */}
              </h3>
            </button>
          </div>
          <div className={styles.buttonsBenefits}>
            <button className={styles.buttonHabitDrive}>
              <FaCircle className={styles.icon} />
              <a href="#" className={styles.habitDrive}>
                {t('homepage.advantages.habitDrive')}
              </a>
            </button>
            <button className={styles.buttonViewStatistics}>
              <a href="#" className={styles.viewStatistics}>
                {t('homepage.advantages.viewStatistic')}
              </a>
            </button>
            <button className={styles.buttonPersonalRateSetting}>
              <a href="#" className={styles.personalRateSetting}>
                {t('homepage.advantages.personalSetting')}
              </a>
            </button>
          </div>
        </div>
      </section>
    </Section>
  );
};

export default AdvantagesSection;
