# Framework Agnostic Widgets

The purpose of this POC is:

- Creating complex components in React and use them inside React and non-React applications.
- Release once, available everywhere. So, all the consumer apps get updated automatically.

To do that, we use [Web-components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to define custom html elemnts, e.g `<wl-search-result/>`, and we use [createRoot](https://react.dev/reference/react-dom/client/createRoot) and [createPortal](https://react.dev/reference/react-dom/createPortal) to fully separate widgets rendering from the hosted app rendering. Then we deploy the scripts on a CDN to allow all consumers get the same version.

## Code structure

The main functionality is inside the `widgets` folder. React components live in `src/react` folder, and their web-components are inside `src/web-components`.
The `apps` are some host applications for testing the functionality in different frameworks.

## How to create a framework-agnostic widget?

### Main logic in React

Just build your regular react components and put them in `react` folder.

You are free to create any kind of React component, just there are some rules for components that are exposed as final Web Component:

- They should not have `children`,
- `JSX` props is not allowed as it cannot be translated easily to the similar HTML properties.

Note that above constraints are only for facade components. Any inner components can be implemented as usual.

For example:

```tsx
// src/react/SearchResult.tsx
export function SearchResult({ pageSize, onClickResult }: SearchResultProps) {
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

widgets inside a same project could share context as regular app. We have to export this context provider as well. We can wrap all the required contexts (e.g. i18n, localization, authentication, ...) into one and later reuse it in `web-components` folder. For example:

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
```

⚠️Note! children may be renderend in different DOM hirarichy. If that affects how `ThemeProvider` work, you need to adjust it later.

If you want to pass properties to the context, you have two options:

- Pass them through widgets separately, which could be not a perfect approach if you have multiple widgets.
- Create a context widget to handle the work.

If you prefer the second approach, here is the sample code:

```tsx
// src/react/AppContextWidget.tsx
export function AppContextWidget({ theme }: AppContextWidgetProps) {
  const { setTheme } = useAppContext();

  useEffect(() => {
    setTheme(theme);
  });

  return <></>;
}
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
