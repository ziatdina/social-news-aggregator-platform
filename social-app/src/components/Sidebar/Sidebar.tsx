import '@my-app/ui-library/style.css'

import { Button } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './Sidebar.module.css'

export interface SidebarProps {
  onLogout?: () => void
}
export const Sidebar = (props: SidebarProps) => {
  const { onLogout } = props
  const navigate = useNavigate()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    navigate("/auth")
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>👤</div>
        <div>
          <div className={styles.userStatus}>Пользователь</div>
        </div>
      </div>

      <Button variant="secondary">Профиль</Button>
      <Button variant="secondary">Настройки</Button>
      <Button variant="secondary">Помощь</Button>

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