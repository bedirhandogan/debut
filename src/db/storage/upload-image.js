import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import toast from 'react-hot-toast'
import { edit } from 'store/reducer/user'
import { AuthInstance } from '../auth'

const storage = getStorage()

async function uploadImage(fileName, image, dispatch) {
   const storageRef = ref(storage, fileName)

   try {
      await uploadBytes(storageRef, image)
      toast.success('Your picture has been successfully saved.')

      const url = await getDownloadURL(ref(storage, fileName))

      await updateProfile(AuthInstance.currentUser, {
         photoURL: url,
      })

      dispatch(edit({ photoUrl: url }))
   } catch (e) {
      console.error(e)
   }
}

export default uploadImage