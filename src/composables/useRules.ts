export function useRules () {
  const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/

  return {
    required: (value?: string) => (!!value && value.length > 0) || 'This field is required',
    email: (value: string) => emailRegExp.test(value) || 'Invalid email',
    password: (value: string) => passwordRegExp.test(value) || 'This password is weak',
    passwordConfirmation: (value: string, valueConfirmation: string) => value === valueConfirmation || 'The passwords do not match',
  }
}
