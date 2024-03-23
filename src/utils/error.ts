import { AuthErrorCodes } from 'firebase/auth/web-extension'

export function getFirebaseErrorMessage (code: string) {
  switch (code) {
    case AuthErrorCodes.POPUP_CLOSED_BY_USER:
      return 'The authentication pop-up was closed during the procedure.'
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Invalid email.'
    case AuthErrorCodes.INVALID_IDP_RESPONSE:
      return 'Incorrect email or password.'
    default:
      return 'Unidentified error.'
  }
}
