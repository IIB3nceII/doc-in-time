import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MatchMediaMock from 'jest-matchmedia-mock';
import store from 'src/shared/store';
import Navbar from './Navbar';

import { HiOutlineCalendar, HiOutlineHome } from 'react-icons/hi';

let matchMedia: MatchMediaMock;

describe('Render Navbar component without items', () => {
	beforeAll(() => {
		matchMedia = new MatchMediaMock();
	});

	afterEach(() => {
		matchMedia.clear();
	});

	test('Test if matchMedia mocking works', () => {
		const mediaQuery = '(prefers-color-scheme: light)';
		const firstListener = jest.fn();
		const secondListener = jest.fn();
		const mql = window.matchMedia(mediaQuery);

		mql.addEventListener("change", ev => ev.matches && firstListener());
		mql.addEventListener("change", ev => ev.matches && secondListener());

		matchMedia.useMediaQuery(mediaQuery);

		expect(firstListener).toBeCalledTimes(1);
		expect(secondListener).toBeCalledTimes(1);
	})

	test("#navbar rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar');
		expect(element).not.toBe(null);
	})

	test("#navbar_logo rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_logo');
		expect(element).not.toBe(null);
	})

	test("#navbar_item_0 is not rendered", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_item_0');
		expect(element).toBe(null);
	})

	test("#navbar_item_1 is not rendered", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_item_1');
		expect(element).toBe(null);
	})

	test("#navbar_search rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_search');
		expect(element).not.toBe(null);
	})

	test("#darkmode_switcher rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#darkmode_switcher');
		expect(element).not.toBe(null);
	})

	test("#navbar_login rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_login');
		expect(element).not.toBe(null);
	})

	test("#search_area is not rendered", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#search_area');
		expect(element).toBe(null);
	})

	/*test("#search_area rendered properly after clicking on #navbar_search", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={[]} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const btn = container.querySelector('#navbar_search')
		expect(btn).not.toBe(null);
		if (btn) {
			fireEvent.click(btn);
		}
		const element = container.querySelector('#search_area');
		expect(element).not.toBe(null);
	})*/
})

describe('Render Navbar component with items', () => {
	const navbarItems = [
		{
			path: "/",
			icon: <HiOutlineHome className="h-8 w-8" />,
			title_key: "navbar.home",
			isActive: false,
		},
		{
			path: "calendar",
			icon: <HiOutlineCalendar className="h-8 w-8" />,
			title_key: "navbar.calendar",
			isActive: false,
		},
	]

	beforeAll(() => {
		matchMedia = new MatchMediaMock();
	});

	afterEach(() => {
		matchMedia.clear();
	});

	test('Test if matchMedia mocking works', () => {
		const mediaQuery = '(prefers-color-scheme: light)';
		const firstListener = jest.fn();
		const secondListener = jest.fn();
		const mql = window.matchMedia(mediaQuery);

		mql.addEventListener("change", ev => ev.matches && firstListener());
		mql.addEventListener("change", ev => ev.matches && secondListener());

		matchMedia.useMediaQuery(mediaQuery);

		expect(firstListener).toBeCalledTimes(1);
		expect(secondListener).toBeCalledTimes(1);
	})

	test("#navbar rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar');
		expect(element).not.toBe(null);
	})

	test("#navbar_logo rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_logo');
		expect(element).not.toBe(null);
	})

	test("#navbar_item_0 rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_item_0');
		expect(element).not.toBe(null);
	})

	test("#navbar_item_1 rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_item_1');
		expect(element).not.toBe(null);
	})

	test("#navbar_search rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_search');
		expect(element).not.toBe(null);
	})

	test("#darkmode_switcher rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#darkmode_switcher');
		expect(element).not.toBe(null);
	})

	test("#navbar_login rendered properly", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#navbar_login');
		expect(element).not.toBe(null);
	})

	test("#search_area is not rendered", () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navbar items={navbarItems} setCurrentTab={() => { }} />
				</BrowserRouter>
			</Provider>
		);

		const element = container.querySelector('#search_area');
		expect(element).toBe(null);
	})
})