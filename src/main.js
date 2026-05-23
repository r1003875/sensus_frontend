import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { sessionStorageHelper } from './lib/sessionStorage'

const migrateSessionStorage = () => {
	if (typeof window === 'undefined') {
		return
	}

	sessionStorageHelper.migrateStorageValue({
		fromStorage: window.localStorage,
		toStorage: window.sessionStorage,
		key: 'sensus-session',
	})

	sessionStorageHelper.migrateStorageValue({
		fromStorage: window.localStorage,
		toStorage: window.sessionStorage,
		key: 'sensus-session-store',
	})
}

migrateSessionStorage()

createApp(App).use(router).mount('#app')
