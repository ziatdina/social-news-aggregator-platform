import DOMPurify from 'dompurify'
 
import styles from './NewsCard.module.css'

export interface NewsCardProps {
    profPhoto: string
    author: string
    date: Date
    content: string
    pictures: string[]
    likes: number
    isLike: boolean
    isExpanded: boolean
    onToggle?: () => void
    onLikeToggle?: () => void
    dangerouslyRenderHTML?: boolean
}

export const NewsCard = (props: NewsCardProps) => {
  const { 
    profPhoto, 
    author, 
    date, 
    content, 
    pictures, 
    likes, 
    isLike, 
    isExpanded, 
    onToggle, 
    onLikeToggle,
    dangerouslyRenderHTML = false
  } = props

  const extractImagesFromHTML = (html: string): string[] => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g
    const images: string[] = []
    let match
    
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1])
    }
    
    return images
  }

  const allImages = [
    ...pictures,
    ...extractImagesFromHTML(content)
  ]

  const renderContent = () => {
    if (dangerouslyRenderHTML) {
      const htmlWithoutImages = content.replace(/<img[^>]*>/g, '')
    
      const cleanHTML = DOMPurify.sanitize(htmlWithoutImages)
      let htmlToRender = cleanHTML
      
      if (!isExpanded && cleanHTML.length > 1000) {
        htmlToRender = cleanHTML.substring(0, 1000) + '...'
      }
      
      return { __html: htmlToRender }
    }

    return undefined
  }

  return (
    <div className={styles.newsCard}>
      <div className={styles.authorSection}>
        {profPhoto && <img src={profPhoto} alt="аватарка" />}
        <div className={styles.authorText}>
          <span>{author}</span>
          <p>{date.toLocaleString()}</p>
        </div>
      </div>

      <div className={styles.newsSection} onClick={onToggle}>
        {dangerouslyRenderHTML ? (
          <div 
            className={styles.htmlContent}
            dangerouslySetInnerHTML={renderContent()}
          />) : (
          <p>{isExpanded ? content : (content.slice(0, 1000) + '...')}</p>
        )}
        {allImages.length > 0 && (
          isExpanded ? (
            <div className={styles.imagesContainer}>
              {allImages.map((src, index) => (
                <img key={index} src={src} alt={`фото ${index + 1}`} className={styles.postImage}/>
              ))}
            </div>
          ) : (
            <div className={styles.imagesContainer}>
              <img src={allImages[0]} alt="фото 1" className={styles.postImage}/>
            </div>
          )
        )}
      </div>

      <div className={styles.likeSection}>
        <span>{likes}</span>
        <span onClick={onLikeToggle}>{isLike ? '❤️' : '🩶'}</span>
      </div>
    </div>
  )
}