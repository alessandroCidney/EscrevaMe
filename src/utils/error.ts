import { FirebaseError } from 'firebase/app'
import { AuthErrorCodes } from 'firebase/auth/web-extension'

import { usePopupStore } from '@/store/popup'

export function getFirebaseErrorMessage (code: string) {
  switch (code) {
    case 'permission-denied':
      return 'You do not have permission to perform this action.'
    case AuthErrorCodes.POPUP_CLOSED_BY_USER:
      return 'The authentication pop-up was closed during the procedure.'
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Invalid email.'
    case AuthErrorCodes.INVALID_IDP_RESPONSE:
      return 'Incorrect email or password.'
    case AuthErrorCodes.EXPIRED_OOB_CODE:
      return 'The link used has expired.'
    case AuthErrorCodes.INVALID_OOB_CODE:
      return 'The link used is invalid.'
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
