import { Button } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './Sidebar.module.css'
import { useAuth } from '../../utils/contexts'

export const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const handleLogin = () => {
    navigate('/auth')
  }

  if (!isAuthenticated || !user) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.guestSection}>
          <h3 className={styles.guestTitle}>Вы вошли как гость</h3>
        </div>
        <div className={styles.divider} />
        <div>
          <Button
            variant="primary"
            onClick={handleLogin}
          >
            Войти
          </Button>
        </div>
      </aside>
    )
  }

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.userSection}>
          <img src={user.avatar} alt={user.username} className={styles.userAvatar}></img>
          <span className={styles.userName}>{user.username}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <nav className={styles.navigation}>
        <Button
          variant="secondary"
        >
          Мой профиль
        </Button>
        <Button
          variant="secondary"
        >
          Сохраненное
        </Button>
        <Button
          variant="secondary"
        >
          Подписки
        </Button>
        <Button
          variant="secondary"
        >
          Настройки
        </Button>
      </nav>

      <div className={styles.divider} />

      <div>
        <Button
          variant="danger"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </div>
    </aside>
  )
}