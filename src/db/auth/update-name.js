import { updateProfile } from 'firebase/auth'
import { AuthInstance } from 'db/auth/index'
import toast from 'react-hot-toast'
import { edit } from 'store/reducers/user'
import errorMessages from 'db/config/error-messages'

async function updateName(name, dispatch) {
   try {
      await updateProfile(AuthInstance.currentUser, {
         displayName: name,
      })
      toast.success('Your name has been updated.', {
         position: 'top-right',
      })
      dispatch(edit({ displayName: name }))
   } catch (e) {
      errorMessages(e.code)
      console.error(e)
   }
}

export default updateName
