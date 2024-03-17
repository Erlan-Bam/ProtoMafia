import styles from "./NavigationBar1.module.css";

const NavigationBar1 = () => {
  return (
    <header className={styles.navigationBar}>
      <img
        className={styles.logoBlack11Icon}
        loading="lazy"
        alt=""
        src="/logo-black-1-1.svg"
      />
      <div className={styles.parent}>
        <div className={styles.div}>Главная</div>
        <div className={styles.div1}>Об игре</div>
        <div className={styles.div2}>Онлайн мафия</div>
        <div className={styles.div3}>Расписание</div>
        <div className={styles.div4}>Рейтинг</div>
        <div className={styles.div5}>+7 700 100 11 11</div>
      </div>
      <div className={styles.createGameButton}>
        <div className={styles.icons}>
          <div className={styles.languageSelector}>
            <div className={styles.rus}>RUS</div>
            <img className={styles.leftIcon} alt="" src="/left@2x.png" />
          </div>
          <img
            className={styles.userIcon}
            loading="lazy"
            alt=""
            src="/user.svg"
          />
        </div>
        <img
          className={styles.settingSvgrepocomIcon}
          loading="lazy"
          alt=""
          src="/setting-svgrepocom.svg"
        />
      </div>
    </header>
  );
};

export default NavigationBar1;
