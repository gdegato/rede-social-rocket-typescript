import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((previousLike) => {
      return previousLike + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/gdegato.png"
        alt=''
        onClick={()=> alert('Hello weiasdjalsda')}
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Rose Fernandes</strong>
              <time title="11 de maio de 2023" dateTime="2022-05-11 08:00:30">
                Publicado há 1h
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
