export function getFilenameExtension (filename: string, defaultExtension = 'jpg') {
  return filename.split('.').pop() || defaultExtension
}
