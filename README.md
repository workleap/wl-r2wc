# Framework Agnostic Widgets

The purpose of this POC is:

- Creating complex components in React and use them inside React and non-React applications.
- Release once, available everywhere. So, all the consumer apps get updated automatically.

To do that, we use [Web-components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to define custom html elemnts, e.g `<wl-search-result/>`, and we use [createRoot](https://react.dev/reference/react-dom/client/createRoot) and [createPortal](https://react.dev/reference/react-dom/createPortal) to fully separate widgets rendering from the hosted app rendering. Then we deploy the scripts on a CDN to allow all consumers get the same version.

For example a simple HTML app can use the following `SearchResult` React component inside their pages as regular HTML tags:

```tsx
function SearchResult({ pageSize, theme }: SearchResultProps) {
  return <Content></Content>;
}
```

```html
<body>
  <div>
    <div>Search Results:</div>
    <search-result page-size="10" theme="light" />
  </div>
</body>
```

## Code structure

The main functionality is inside the `widgets` folder.
The `apps` folder contins a few examples to test the functionality in different frameworks.

## How to use this repo?

This repo is a template repo which also have some examples to see how this strategy work in action. After cloning the repo:

- Run `pnpm install` inside `/widgets`, `/app/vanilla-js`, and `app/react`,
- Run `pnpm build` inside `/widgets` to build the output files.
- To run the apps, inside their folders:
  - Run `pnpm start` for Vanilla-Js app.
  - run `pnpm dev` for React app.

Note: whenever you made a change inside the `widgets` you need only to run `pnpm build` and then refresh your running app.

you can follow the next steps to see how you can change and see the result.

## How to create a framework-agnostic widget?

### Main logic in React

Just build your regular react components and put them in `react` folder.

You are free to create any kind of React component, just there are some rules for exposed components:

- They should not have `children`. e.g.:

  ```tsx
  function NotAllowedComponenet({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
  }
  ```

- `JSX` props is not allowed as it cannot be translated easily to the similar HTML properties. e.g.:
  ```tsx
  function NotAllowedComponenet({ header }: { header: ReactNode }) {
    return <div>{header}</div>;
  }
  ```

Note that above constraints are ONLY for components that are getting exposed as web components. Any inner components can be implemented as usual.

Here is a valid component which we can later make a web component based on it:

```tsx
// src/react/SearchResult.tsx
export function SearchResult({ pageSize, onClickItem }: SearchResultProps) {
  return (
    <Body>
      <Header />
      <Content>
        {items.map((data) => (
          <Item />
        ))}
      </Content>
    </Body>
  );
}
```

#### Sharing context

widgets inside a same project could share context as regular React app. This context will be used at the rendering step. All widgets are getting rendered inside this context provider (check the `widgets.ts` file).

If you have multiple contexts, make sure you add them all here. For example:

```tsx
// src/react/AppContextProvider.tsx
export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState("light");
  const [isResultOpen, setIsResultOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{ theme, setTheme, isResultOpen, setIsResultOpen }}
    >
      <I18nProvider>
        <ThemeProvider colorScheme={theme}>{children}</ThemeProvider>
      </I18nProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
```

⚠️Note! children may be renderend in different DOM hirarichy. If that affects how `ThemeProvider` work, you need to adjust it.

#### Sharing config

There are scenarios you want to pass down some configs that are being used by all widgets. For example:

- Passing app current Theme or language
- Passing api URL, app name, app logo, etc.

If you have only one widget, it is ok to pass them through it as widget props, but if you have multiple widgets, it is not perfect to do same for all widgets.

The trick is to just create an empty Widget that gets all these configs and store them inside the previously mentioned `AppContextProvider`.

```tsx
// src/react/AppContext.tsx
export function AppContext({
  theme,
  appName,
  appLogo,
  apiUrl,
}: AppContextWidgetProps) {
  const { setTheme, setAppName, setAppLogo, setApiUrl } = useAppContext();

  useEffect(() => {
    setTheme(theme);
    setAppName(appName);
    //...
  });

  return <></>;
}
```

so consumer apps can use it in this way:

```html
<wl-app-context theme="dark" language="en" app-name="Office Vibe" />
```

### Create Web Components

In this section we create [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)(part of Web Components) to expose our React components as framework agnostic widgets. We don't need to create custom elements for inner components (e.g. `Body` , `Item`, `Header`)

To make life easier, we moved the generic codes to `r2wc` folder (React to Web-Component). This folder contains:

- `WebComponentHTMLElement.tsx`: The base class for defining and creating custom elements.
- `Init.tsx`: The main scripts to create and render custom elements in browser.
- `PropsProvider.tsx`: It brings a mechanism to keep custom elements properties sync with React component properties.

#### Define custom elements

To create a custom element, simply inherit from `WebComponentHTMLElement<T>` class where `T` is the React component `Props` type. Then, implement `reactComponent` and static `tagName` getters. Put the file inside the `src/web-components` folder.

For example:

```tsx
// src/web-components/SearchResultElement.tsx
export class SearchResultElement extends WebComponentHTMLElement<SearchResultProps> {
  get reactComponent() {
    return SearchResult;
  }

  static get tagName() {
    return "wl-search-result";
  }
}
```

#### Create initialize function

After defining all custom elements, we need to register them and define an `initialize` function. This function will be called by host apps to define and render custom elements. To do that, create the `widgets.ts` file.

Inside the file:

- We register each custom element seperately. Without having them registered, you cannot use them inside the host app.
- We render the widgets. We have to pass `AppContextProvider` to have all widgets access to the same context.

```tsx
// src/web-components/widgets.ts
function initialize() {
  register([SearchResultElement, SearchInputElement, AppContextElement]);
  render(AppContextProvider);
}

export interface SearchWidgetsConfig {
  initialize: () => void;
}

window.SearchWidgets = {
  initialize,
};
```

## How to deploy the changes on a CDN?

## How to consume framework-agnostic widget?
