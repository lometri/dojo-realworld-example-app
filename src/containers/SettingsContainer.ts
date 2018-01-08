import { Container } from '@dojo/widget-core/Container';
import { Store } from '@dojo/stores/Store';
import { Settings, SettingsProperties } from './../widgets/Settings';
import {
	bioInput,
	emailInput,
	passwordInput,
	getUserSettings,
	imageUrlInput,
	usernameInput,
	updateUserSettings
} from './../processes/settingsProcesses';

function getProperties(store: Store<any>, properties: SettingsProperties): SettingsProperties {
	const { get, path } = store;

	if (!get(path('settings', 'loading')) && !get(path('settings', 'loaded'))) {
		getUserSettings(store)();
	}

	return {
		email: get(path('settings', 'email')),
		password: get(path('settings', 'password')),
		username: get(path('settings', 'username')),
		imageUrl: get(path('settings', 'imageUrl')),
		bio: get(path('settings', 'bio')),
		onEmailInput: emailInput(store),
		onPasswordInput: passwordInput(store),
		onUsernameInput: usernameInput(store),
		onBioInput: bioInput(store),
		onImageUrlInput: imageUrlInput(store),
		onUpdateSettings: updateUserSettings(store)
	};
}

export const SettingsContainer = Container(Settings, 'state', { getProperties });