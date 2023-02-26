import styles from './styles.module.css'
import { IconSearch } from '@tabler/icons-react'
import Input from 'components/shared/Input'
import ThemeSelector from 'components/shared/ThemeSelector'
import { useLocation } from 'react-router-dom'
import Breadcrumbs from 'components/shared/Breadcrumbs'

function Navbar() {
   const location = useLocation()
   console.log(location)

   return (
      <div className={styles.navbar}>
         <div className={styles.area}>
            <div className={styles.pageTitle}>
               {location.pathname !== '/app' && (
                  <Breadcrumbs
                     path={[
                        {
                           name: location.pathname.slice(5),
                           to: location.pathname,
                           end: true,
                        },
                     ]}
                  />
               )}
            </div>
         </div>
         <div className={styles.area}>
            <Input
               type={'text'}
               placeholder={'Search'}
               className={styles.navbarSearch}
            >
               <IconSearch
                  stroke={1.3}
                  width={20}
                  height={20}
                  style={{ color: 'var(--icon-color-primary)' }}
               />
            </Input>
            <ThemeSelector className={styles.navbarThemeSelector} />
         </div>
      </div>
   )
}

export default Navbar
