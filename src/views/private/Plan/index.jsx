import './styles.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import prettyMs from 'pretty-ms'
import months from 'constants/months'
import {
   IconBookmark,
   IconDots,
   IconLayoutGrid,
   IconLayoutKanban,
   IconLayoutList,
} from '@tabler/icons-react'
import Members from 'components/shared/Members'
import Tags from 'components/shared/Tags'
import { useState } from 'react'
import Notes from 'views/private/Plan/Notes'
import Tasks from 'views/private/Plan/Tasks'
import Todos from 'views/private/Plan/Todos'

function Plan() {
   const { id } = useParams()
   const plans = useSelector((state) => state.plans.data)
   const [activeSection, setActiveSection] = useState('notes')

   const data = plans?.find((v) => v.id === id) || {}

   const createdDate = new Date(data.date?.createdAt)
   const [year, month, day] = [
      createdDate.getFullYear(),
      createdDate.getMonth(),
      createdDate.getDate(),
   ]

   const formattedUpdateDate = prettyMs(
      new Date().getTime() - data.date?.updatedAt || 0,
      {
         compact: true,
         verbose: true,
      }
   )

   const formattedCreateDate = `${day} ${months[month]} ${year}`

   const sections = {
      notes: <Notes />,
      tasks: <Tasks />,
      todos: <Todos />,
   }

   return (
      <div className={'plan'}>
         <div className={'plan-header'}>
            <div className={'plan-header-section'}>
               <div className={'plan-header-title'}>{data.title}</div>
               <Tags data={data} />
               <div className={'plan-header-options'}>
                  <div className={'plan-header-option'}>
                     <IconBookmark
                        stroke={1.3}
                        width={22}
                        height={22}
                        style={{ color: 'var(--icon-color-primary)' }}
                     />
                  </div>
                  <div className={'plan-header-option'}>
                     <IconDots
                        stroke={1.3}
                        width={22}
                        height={22}
                        style={{ color: 'var(--icon-color-primary)' }}
                     />
                  </div>
               </div>
            </div>
            <div className={'plan-header-section'}>
               <div className={'plan-header-description'}>
                  {data.description}
               </div>
            </div>
            <div className={'plan-header-section'}>
               <div className={'plan-header-detail'}>
                  <div className={'plan-header-label'}>Created</div>
                  <div className={'plan-header-date'}>
                     {formattedCreateDate}
                  </div>
               </div>
               <div className={'plan-header-detail'}>
                  <div className={'plan-header-label'}>Updated</div>
                  <div className={'plan-header-date'}>
                     {formattedUpdateDate} ago
                  </div>
               </div>
               <div className={'plan-header-detail'}>
                  <div className={'plan-header-label'}>Members</div>
                  <Members />
               </div>
               <div className={'plan-header-button'}>+ Add Member</div>
            </div>
            <div className={'plan-header-navigation'}>
               <div
                  className={'plan-header-item'}
                  onClick={() => setActiveSection('notes')}
               >
                  <IconLayoutGrid
                     stroke={1.5}
                     width={20}
                     height={20}
                     style={{ color: 'var(--icon-color-primary)' }}
                  />
                  Notes
                  {activeSection === 'notes' ? <span /> : ''}
               </div>
               <div
                  className={'plan-header-item'}
                  onClick={() => setActiveSection('tasks')}
               >
                  <IconLayoutKanban
                     stroke={1.5}
                     width={20}
                     height={20}
                     style={{ color: 'var(--icon-color-primary)' }}
                  />
                  Tasks
                  {activeSection === 'tasks' ? <span /> : ''}
               </div>
               <div
                  className={'plan-header-item'}
                  onClick={() => setActiveSection('todos')}
               >
                  <IconLayoutList
                     stroke={1.5}
                     width={20}
                     height={20}
                     style={{ color: 'var(--icon-color-primary)' }}
                  />
                  Todos
                  {activeSection === 'todos' ? <span /> : ''}
               </div>
            </div>
         </div>
         {sections[activeSection]}
      </div>
   )
}

export default Plan
