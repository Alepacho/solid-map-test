/* @refresh reload */
import { render } from 'solid-js/web';
import { createContext } from 'solid-js';
import { useStore } from './store';
import './index.css';
import App from './App';
import { HopeThemeConfig, HopeProvider, NotificationsProvider } from '@hope-ui/solid'

const config: HopeThemeConfig = {
	initialColorMode: "system"
}

const root = document.getElementById('root');
const { Provider } = createContext();

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
	);
}

render(() => <HopeProvider config={config}>
	<NotificationsProvider placement="bottom-end">
		<Provider value={useStore}>
			<App />
		</Provider>
	</NotificationsProvider>
</HopeProvider>, root!);
