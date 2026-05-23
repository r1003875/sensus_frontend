const isBrowser = typeof window !== 'undefined'

const readStorageValue = (storage, key) => {
  if (!isBrowser) {
    return null
  }

  return storage.getItem(key)
}

const writeStorageValue = (storage, key, value) => {
  if (!isBrowser) {
    return
  }

  storage.setItem(key, value)
}

const removeStorageValue = (storage, key) => {
  if (!isBrowser) {
    return
  }

  storage.removeItem(key)
}

const migrateStorageValue = ({ fromStorage, toStorage, key }) => {
  if (!isBrowser) {
    return false
  }

  const existingValue = fromStorage.getItem(key)
  if (existingValue === null) {
    return false
  }

  if (toStorage.getItem(key) === null) {
    toStorage.setItem(key, existingValue)
  }

  fromStorage.removeItem(key)
  return true
}

export const sessionStorageHelper = {
  readStorageValue,
  writeStorageValue,
  removeStorageValue,
  migrateStorageValue,
}
