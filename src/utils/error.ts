import { FirebaseError } from 'firebase/app'
import { AuthErrorCodes } from 'firebase/auth/web-extension'

import { usePopupStore } from '@/store/popup'

export function getFirebaseErrorMessage (code: string) {
  switch (code) {
    case AuthErrorCodes.POPUP_CLOSED_BY_USER:
      return 'The authentication pop-up was closed during the procedure.'
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Invalid email.'
    case AuthErrorCodes.INVALID_IDP_RESPONSE:
      return 'Incorrect email or password.'
    default:
      return 'An internal error has occurred.'
  }
}

export class ApplicationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export function defaultErrorHandling (err: unknown) {
  const popupStore = usePopupStore()

  if (err instanceof FirebaseError) {
    popupStore.showErrorPopup(getFirebaseErrorMessage(err.code))
  } else if (err instanceof Error) {
    popupStore.showErrorPopup(err.message)
  } else {
    popupStore.showErrorPopup()
  }
}
