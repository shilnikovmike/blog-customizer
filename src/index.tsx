import { StrictMode } from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
