import { Header } from "../../components/Header/Header"
import { NewsFeed } from "../../components/NewsFeed/NewsFeed"
import { Sidebar } from "../../components/Sidebar/Sidebar"

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <NewsFeed />
        <Sidebar />
      </div>
    </div>
  )
}