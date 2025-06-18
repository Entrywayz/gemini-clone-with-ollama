import { useContext, useState } from 'react'
import { assets } from '../../assets/assets.ts'
import './Sidebar.css'
import { Context } from '../../context/Context.tsx'

const Sidebar = () => {

  const [extended, setExtended] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <aside className='sidebar'>
      <section className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt='menu' />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} />
          {extended  ? (<p>New Chat</p>) : null }
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item: string, index: number) => {
              return (
                <div onClick={() => loadPrompt(item)} key={index} className="recent-entry">
                  <img src={assets.message_icon}  />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
            
          </div>
          ) : null
        }
        
      </section>
      <section className="bottom">
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon}  alt=""  />
          {extended ? (<p>Help</p>) : null }
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt=""  />
          {extended ? (<p>Activity</p>) : null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt=""  />
          {extended ? (<p>Settings</p>) : null}
        </div>
      </section>
    </aside>
  )
}

export default Sidebar