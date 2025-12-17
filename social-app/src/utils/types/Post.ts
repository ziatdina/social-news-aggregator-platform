export interface Post {
    id: string
    avatar: string
    authorId: string
    authorName: string
    content: string
    pictures?: string[]
    createdAt: string
    likes: string[]
}