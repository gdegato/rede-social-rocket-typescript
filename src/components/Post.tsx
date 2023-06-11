import { Avatar } from './Avatar'
import { Comment } from './Comment'
import { format, formatDistanceToNow } from 'date-fns'
import styles from './Post.module.css'
import ptBR from 'date-fns/locale/pt-BR'
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  author: Author;
  publishedAt: Date;
  content: Content[];
  id: number;
}

interface PostProps {
  post: PostType;
}


export function Post({ post }: PostProps) {

  const [comments, setComments] = useState(['Post muito bacana, hein?'])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(
    post.publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    },
  )

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('')
    setNewCommentText(e.target.value)
  }

  function handleNewCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Esse campo é obrigatório, viu??')
  }

  function deleteComment(commentsToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentsToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <div>
          <time
            title={publishedDateFormatted}
            dateTime={post.publishedAt.toISOString()}
          >
            {publishedDateRelativeToNow}
          </time>
        </div>
      </header>

      <div className={styles.content}>
        {post.content.map((item) => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>
          } else if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              content={comment}
              key={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
