import styles from './HomePage.module.css'
import { Header } from "../../components/Header/Header"
import { NewsFeed } from "../../components/NewsFeed/NewsFeed"
import { Sidebar } from "../../components/Sidebar/Sidebar"

export const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Header />
      <div className={styles.content}>
        <NewsFeed />
        <Sidebar />
      </div>
    </div>
  )
}