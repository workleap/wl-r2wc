# Framework Agnostic Widgets

The purpose of this POC is:

- Creating complex components in React and using them inside React and non-React applications.
- Release once, available everywhere. So, all the consumer apps get updated automatically.

To do that, we use [Web-components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to define custom html elements, e.g `<wl-search-result/>`, and we use [createRoot](https://react.dev/reference/react-dom/client/createRoot) and [createPortal](https://react.dev/reference/react-dom/createPortal) to fully separate widgets rendering from the hosted app rendering. Then we deploy the scripts on a CDN to allow all consumers to get the same version.

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
The `apps` folder contains a few examples to test the functionality in different frameworks.

## How to use this repo?

This repo is a template repo which also has some examples to see how this strategy works in action. After cloning the repo:

- Run `pnpm install` inside `/widgets`, `/app/vanilla-js`, and `app/react`,
- Run `pnpm build` inside `/widgets` to build the output files.
- To run the apps, inside their folders:
  - Run `pnpm start` for Vanilla-Js app.
  - run `pnpm dev` for React app.

> [!IMPORTANT]
> whenever you make a change inside the `widgets` you need only to run `pnpm build` and then refresh your running app.

You can follow the next steps to see how you can change and see the result.

## How to create a framework-agnostic widget?

### Main logic in React

Just build your regular react components and put them in the `react` folder.

You are free to create any kind of React component, just there are some rules for exposed components:

- They should **NOT** have `children`. e.g.:

  ```tsx
  function NotAllowedComponenet({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
  }
  ```

- `JSX` props are not allowed as they cannot be translated easily to the similar HTML properties. e.g.:
  ```tsx
  function NotAllowedComponenet({ header }: { header: ReactNode }) {
    return <div>{header}</div>;
  }
  ```

> [!NOTE]
> that above constraints are ONLY for components that are getting exposed as web components. Any inner components can be implemented as usual.

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

Widgets inside the same project could share context as a regular React app. This context will be used at the rendering step. All widgets are getting rendered inside this context provider (check the [widgets.ts](widgets/src/web-components/widgets.ts) file).

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

> [!WARNING]
 Children may be rendered in different DOM nodes. If that affects how `ThemeProvider` works, you need to adjust it.

#### Sharing config with a context

There are scenarios where you want to pass down some configs that are being used by all widgets. For example:

- Passing app current Theme or language
- Passing api URL, app name, app logo, etc.

If you have only one widget, it is ok to pass them through it as widget props, but if you have multiple widgets, it is not perfect to do the same for all widgets.

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
You can see it in both [vanilla-js](/apps/vanilla-js/public/index.html) and [react](/apps/react/src/App.tsx) examples too.

### Create Web Components

In this section we create [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)(part of Web Components) to expose our React components as framework agnostic widgets. We don't need to create custom elements for inner components (e.g. `Body` , `Item`, `Header`)

To make life easier, we moved the generic codes to the `r2wc` folder (React to Web-Component). This folder contains:

- `WebComponentHTMLElement.tsx`: The base class for defining and creating custom elements.
- `Init.tsx`: The main scripts to create and render custom elements in the browser.
- `PropsProvider.tsx`: It brings a mechanism to keep custom element properties sync with React component properties.

#### Define custom elements

To create a custom element, simply inherit from the `WebComponentHTMLElement<T>` class where `T` is the React component `Props` type. Then, implement `reactComponent` and static `tagName` getters. Put the file inside the `src/web-components` folder.

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

- We register each custom element separately. Without having them registered, you cannot use them inside the host app.
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

#### Build the output

Everything is ready! Just make sure you have setup the `tsup.build.ts` correctly:

- Include both `minify: true` and `treeshake: true`
- Include the required css file and `widget.ts` inside the `src/index.ts` file.

After running the `pnpm build` inside the `widgets` folder, you will get `index.ts` and `index.css` files inside the `dist` folder. You need them in consumer apps to load and render widgets.

> [!IMPORTANT]
> This output is not for packaging. It is for direct usage as external urls inside the consumer apps.

## Deployment

This widgets project generates two files that need to be made available to our widgets consumers: `index.js` and `index.css`.

These files need to be hosted in an Azure storage container, served via Azure Front Door. The storage system automatically handles compression in Brotli (`.br`) or Gzip (`.gz`) formats. Make sure to activate the compression in the optimization settings of the Front Door profile. That storage will need to be set up by the team that owns the widgets project.

For the Workleap AI project, Max Beaudoin is currently setting up the storage system and will provide the necessary details to the team.

### How to deploy the changes on a CDN?

#### Manual Upload

Currently, the deployment process involves manually uploading the index.js and index.css files to the Azure storage container.

- Navigate to the Azure portal and locate the appropriate storage account and container.
- Upload the files to the container. Make sure to replace any existing files.
- The CDN will automatically serve the updated versions with appropriate compression.

#### Automating the Deployment (Future):

This proof of concept does not currently have an automated deployment process. However, the team that owns the widgets project could set up a CI/CD pipeline to automatically deploy the changes to the Azure storage container.

#### URLs:

After deployment, the files will be available on a public URL:

For instance, for this POC, the URLs are:

- JavaScript: https://cdn.platform.workleap-dev.com/hopper/workleap-ai-test/index.js
- CSS: https://cdn.platform.workleap-dev.com/hopper/workleap-ai-test/index.css

#### Versioning

Versioning is not required in the default setup since we aim to avoid breaking changes. By avoiding breaking changes, all consumers can continue using the latest version of the files without needing to update their applications.

- You should prioritize deprecating old features instead of removing them,
- You should use feature flags to opt-in to new features that would otherwise be breaking changes.

However, in the event that breaking changes need to be introduced, versioned folders can be added to the CDN.

For example, breaking changes might be deployed to:

- JavaScript: https://cdn.platform.workleap-dev.com/hopper/workleap-ai-test/2/index.js
- CSS: https://cdn.platform.workleap-dev.com/hopper/workleap-ai-test/2/index.css

In such cases, consumers will need to manually update the URLs in their applications to point to the new version (/2/index.js and /2/index.css). Since breaking changes are involved, this manual update is necessary to ensure compatibility with the new version.

### How to consume framework-agnostic widget?

The framework-agnostic widget can be consumed directly in any HTML page by referencing the deployed CDN files. To include the widget in your project, use the following snippet:

```html
<script
  type="module"
  src="https://cdn.platform.workleap-dev.com/hopper/workleap-ai-test/index.js"
></script>
<link
  rel="stylesheet"
  href="https://cdn.platform.workleap-dev.com/hopper/workleap-ai-test/index.css"
/>
```

Once this is added to the HTML page, the script can now inject the new web-components into the page. This can be done as soon as the script loads, or after a method `initialize` is called.

#### React

An example usage of the widget in an React page:

```jsx
<wl-movie-context theme={theme}></wl-movie-context>
```

An example of usage of the widget API :

```jsx
useEffect(() => {
  window.MovieWidgets?.initialize();
}, []);
```

#### Typescript

If the app consuming the widget is written in TypeScript, you will need to provide type definitions for the widget props.

We will try to update this POC later to provide guidance on how to properly do this for multiple frameworks.

For now, the consumers can manually create a type definition on their side.

For custom components used in a react application, you can create a type definition like this:

```typescript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "wl-movie-pop-up": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          text?: string;
        },
        HTMLElement
      >;

      "wl-movie-details": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "show-ranking"?: string;
        },
        HTMLElement
      >;

      "wl-movie-context": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          theme?: string;
        },
        HTMLElement
      >;
    }
  }
}
```

For the API available through the window.MovieWidgets object, you can create a type definition like this:

```typescript
interface MovieWidgetsConfig {
  initialize: () => void;
}

declare global {
  interface Window {
    MovieWidgets?: MovieWidgetsConfig;
  }
}
```

## Future Improvements

Even if the current POC is working, there are some improvements that we will look at in the future:

- Possibility of implementing the widget using the Shadow DOM to avoid conflicts with the host app styles.
- Further optimizations for bundle size with improved tree-shaking
- Using preload scripts and styles to avoid page flickering for mission critical widgets like the Navbar
- Better support for typescript for React applications
- Extract the r2wc folder into a library package
- Move to Cloudflare CDN and provide a pipeline to update the CDN files






