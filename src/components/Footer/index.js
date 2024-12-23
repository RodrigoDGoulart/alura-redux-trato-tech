import styles from './Footer.module.scss';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa'

const iconePrpops = {
  color: 'white',
  size: 24
}

export default function Footer() {
  return(
    <footer className={styles.footer}>
      <div>
        <FaFacebook {...iconePrpops} />
        <FaTwitter {...iconePrpops} />
        <FaInstagram {...iconePrpops} />
      </div>
      <span>Desenvolvido por Alura.</span>
    </footer>
  )
}