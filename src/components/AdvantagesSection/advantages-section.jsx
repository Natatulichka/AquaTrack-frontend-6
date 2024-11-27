import styles from "./advantages-section.module.css";

import { FaCircle } from "react-icons/fa";
import clsx from "clsx";

const AdvantagesSection = () => {
  return (
    <section className={styles.AdvantagesSection}>

      <div className={clsx("container",styles.container)}>
        <div className={styles.buttonCustomers}>
          <button className={styles.button}>
            <div className={styles.imageContainer}>
              <picture className={styles.image} >
                <source srcSet="
                                src/assets/img/customers/customer_1_tab_desk_1x.webp 1x,
                                src/assets/img/customers/customer_1_tab_desk_2x.webp 2x
                        "
                        media="(min-width: 768px)"
                />
                <source srcSet="
                              src/assets/img/customers/customer_1_mob_1x.webp 1x,
                              src/assets/img/customers/customer_1_mob_2x.webp 2x
                              "
                  media="(max-width: 768px)"
                />
                <img src="src/assets/img/customers/customer_1_mob_1x.webp"
                  alt="Customer 1"

                />
              </picture>

              <picture className={styles.image}>
                <source srcSet="
                                src/assets/img/customers/customer_2_tab_desk_1x.webp 1x,
                                src/assets/img/customers/customer_2_tab_desk_2x.webp 2x
                        "
                        media="(min-width: 768px)"
                />
                <source srcSet="
                              src/assets/img/customers/customer_2_mob_1x.webp 1x,
                              src/assets/img/customers/customer_2_mob_2x.webp 2x
                              "
                        media="(max-width: 768px)"
                />
                <img src="src/assets/img/customers/customer_2_mob_1x.webp"
                  alt="Customer 2"

                />
              </picture>

              <picture className={styles.image}>
                <source srcSet="
                                src/assets/img/customers/customer_3_tab_desk_1x.webp 1x,
                                src/assets/img/customers/customer_3_tab_desk_2x.webp 2x
                        "
                        media="(min-width: 768px)"
                />
                <source srcSet="
                              src/assets/img/customers/customer_3_mob_1x.webp 1x,
                              src/assets/img/customers/customer_3_mob_2x.webp 2x
                              "
                        media="(max-width: 768px)"
                />
                <img src="src/assets/img/customers/customer_3_mob_1x.webp"
                  alt="Customer 3"

                />
              </picture>



  </div>
            <h3 className={styles.textCustomers}>Our <span className={styles.accent}>happy</span> customers</h3>
          </button>
        </div>
        <div className={styles.buttonsBenefits}>
          <button className={styles.buttonHabitDrive}>
            <FaCircle className={styles.icon} />
            <a href="#" className={styles.habitDrive}>Habit drive</a>
          </button>
          <button className={styles.buttonViewStatistics}>
            <a href="#" className={styles.viewStatistics}>View statistics</a>
          </button>
          <button className={styles.buttonPersonalRateSetting}>
            <a href="#" className={styles.personalRateSetting}>Personal rate setting</a>
          </button>

        </div>
      </div>

    </section>
  );
};

export default AdvantagesSection;