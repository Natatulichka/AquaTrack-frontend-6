import WelcomeSection from "../../components/WelcomeSection/welcome-section.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/advantages-section.jsx";
import styles from "./home-page.module.css";
function HomePage() {
  return (
    <div className={styles.sectionsContainer}>
      <WelcomeSection  className={styles.welcomeSection}/>
      <AdvantagesSection className={styles.advantagesSection} />
    </div>
  );
}

export default HomePage;
