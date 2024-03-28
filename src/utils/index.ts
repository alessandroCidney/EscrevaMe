export function wait (ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function getFilenameExtension (filename: string, defaultExtension = 'jpg') {
  return filename.split('.').pop() || defaultExtension
}

export function selectFile (callbackFn: (files: File) => Promise<void> | void) {
  const inputElement = document.createElement('input')

  inputElement.style.display = 'none'
  inputElement.setAttribute('type', 'file')

  function onChange (event: Event) {
    const target = event.target

    if (target instanceof HTMLInputElement && target.files?.[0]) {
      callbackFn(target.files[0])
    }
  }

  inputElement.addEventListener('change', onChange)

  document.body.appendChild(inputElement)

  inputElement.click()

  document.body.removeEventListener('change', onChange)
  document.body.removeChild(inputElement)
}

export function removeObjectEmptyValues <T extends { [k: string]: any }> (obj: T) {
  for (const key in obj) {
    if ([null, undefined].includes(obj[key])) {
      delete obj[key]
    }
  }

  return obj
}
