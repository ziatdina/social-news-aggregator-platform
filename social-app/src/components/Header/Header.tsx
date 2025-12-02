import { Button, Input } from '@my-app/ui-library'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Социальная платформа
        </div>
        
        <div className={styles.controls}>
          <Input
            type="text"
            placeholder="Поиск.."
          />
          
          <Button variant='secondary'>
            Создать пост
          </Button>
        </div>
      </div>
    </header>
  )
}