import { Post, PostType } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'


const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/gdegato.png',
      name: 'Rose Fernandes',
      role: 'Front-end',
    },
    content: [
      { type: 'paragraph', content: 'Fala pessoal👋' },
      {
        type: 'paragraph',
        content:
          'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui💪🏻',
      },
      { type: 'link', content: 'rose.desig/lovecats' },
      { type: 'link', content: 'rose.desig/lovecats' },
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/igormpmartins.png',
      name: 'Igor Martins',
      role: 'FullStack',
    },
    content: [
      { type: 'paragraph', content: 'Fala pessoal👋' },
      {
        type: 'paragraph',
        content:
          'Realizado com este novo projeto, revolucionário no mercado!💪🏻',
      },
      { type: 'link', content: 'ig.desig/soloband' },
      { type: 'link', content: 'ig.desig/soloband' },
    ],
    publishedAt: new Date('2022-05-03 20:00:00'),
  },
]

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}

export default App
