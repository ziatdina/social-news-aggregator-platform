import styles from './AuthPage.module.css'
import { AuthForm } from "../../components/AuthForm/AuthForm"

export const AuthPage = () => {
  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <AuthForm />
      </div>
    </div>
  )
}