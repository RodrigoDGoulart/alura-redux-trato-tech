import styles from './NavBar.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} />

    </nav>
  )
}