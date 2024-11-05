# Framework Agnostic Widgets

The purpose of this template is:

- Creating complex components in React and using them inside React and non-React applications.
- Release once, available everywhere. So, all the consumer apps get updated automatically.

To do that, we use [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to define custom html elements, e.g `<wl-movie-details/>`, and we use [createRoot](https://react.dev/reference/react-dom/client/createRoot) and [createPortal](https://react.dev/reference/react-dom/createPortal) to fully separate widgets rendering from the hosted app rendering. Then we deploy the scripts on a CDN to allow all consumers to get the same version.

For example a simple HTML app can use the following `MovieDetails` React component inside their pages as regular HTML tags:

```tsx
function MovieDetails({ mode, showRanking }: MovieDetailsProps) {
    return <Content>...</Content>;
}
```

```html
<head>
    <link rel="modulepreload" href="https://cdn.platform.workleap-dev.com/movie-widgets/index.js" />
    <script type="module" blocking="render">
        import { MovieWidgets } from "https://cdn.platform.workleap-dev.com/movie-widgets/index.js";

        MovieWidgets.initialize();
    </script>    
</head>
<body>
    <div>
        <div>Selected Movie Details:</div>
        <wl-movie-details mode="modal" show-ranking="true" />
        <wl-movie-finder />
    </div>
</body>
```

## Code structure

- The `packages/r2wc` package contains the core functionality that will be used by different widgets. 
- The `packages/movie-widgets` package is a sample template to show how to build  framework-agnostic widgets.  
- The `apps` folder contains a few examples to test `packages/movie-widgets` across different frameworks.

## How to use this repo?

This repo is a package + template repo which also has some examples to see how this strategy works in action. After cloning the repo:

- Run `pnpm install && pnpm build` inside the root,
- To run the sample apps run `pnpm dev` inside the [Vanilla-Js app](/apps/vanilla-js/) or the [React app](/apps/react/) folders.

> [!IMPORTANT]
> Whenever you make a change inside the `packages/movie-widgets` you only need to run `pnpm build` and then refresh your running apps. It is becuase of having [dist](/packages/movie-widgets/dist/) folder as `cdn` for each app: [VanillaJs](/apps/vanilla-js/server.js) and [React](/apps/react/webpack.dev.js).

You can follow the next steps to see how you can change and see the result.

## How to create a framework-agnostic widget?
It is recommended having a separate package for this purpose. It helps managing different builds easily. For the rest, `packages/movie-widgets` showcases this.  

### Main logic in React

Just build your regular React components and put them in the `src` folder.

You are free to create any kind of React component, just there are some rules for  components that are being **exposed** as Web Components:

- They should **NOT** have `children`. e.g.:

  ```tsx
  function NotAllowedWebComponent({ children }: { children: ReactNode }) {
      return <div>{children}</div>;
  }
  ```

- `JSX` props are **NOT** not allowed as they cannot be translated easily to the similar HTML properties. e.g.:
  ```tsx
  function NotAllowedWebComponent({ header }: { header: ReactNode }) {
      return <div>{header}</div>;
  }
  ```

> [!NOTE]
> The above constraints are ONLY for components that are getting exposed as web components. Any inner components can be implemented as usual.

Here is a valid component which we can later make a web component based on it. Note that `<Layout/>`, `<Header/>`, `<Content/>` are inner components.

```tsx
// src/MovieDetails.tsx
export interface MovieDetailsProps {
    showRanking: boolean;
    onBuy: (movie : MovieData, count: number) => void;
    mode: "modal" | "inline";
}

export function MovieDetails({ showRanking, mode, onBuy }: MovieDetailsProps) {
    const { selectedMovie } = useAppContext();

    return (
      <Layout mode={mode}>
        <Header />
        <Content>
          {movie.details}
        </Content>
        <Button onClick={()=> onBuy(selectedMovie, 1);}>
      </Layout>
    );
}
```

#### [Optional] Sharing context

Widgets inside the same project could share context as a regular React app. This context will be used at the rendering step. All widgets are getting rendered inside this context provider (check the [widgets.ts](widgets/src/web-components/widgets.ts) file). For example:


```tsx
// src/AppContextProvider.tsx
export function AppContextProvider({ children }: {
    children?: React.ReactNode | undefined;
}) {
    const [isResultOpen, setIsResultOpen] = useState(false);  

    return (
      <AppContext.Provider value={{ isResultOpen, setIsResultOpen }}>
          {children}
      </AppContext.Provider>
    );
}
```

> [!CAUTION] 
> This context will be used at app level. If you are using client routers like [React Router](https://reactrouter.com/), this context stay live between client page navigations. By client page navigation, we mean the full refresh doesn't happen. 
>
> It is a great tool if you want to keep an state between page navigations (e.g. keeping the chatbox open). 

> [!WARNING]
 The above element is NOT being associated with any DOM element, and the `{children}` (i.e widgets) are being rendered in different DOM nodes (Thanks to React [createPortal](https://react.dev/reference/react-dom/createPortal)). So, if any of above providers generate DOM element, they are not being present in DOM hierarchy.   

#### [Optional] App settings

There are scenarios where you want to pass down some app settings that are being used by all widgets. For example:

- Passing app current theme or language
- Passing backend API URL, app name, app logo, etc.

If you have only one widget, it is ok to pass them through it as widget props, but if you have multiple widgets, it is not perfect to do the same for all widgets. To do that, add these settings to `AppSettings` and modify previously created `AppContextProvider` to handle them.

```tsx
// src/AppContextProvider.tsx
export interface AppSettings {
    theme: "light" | "dark" | "system";
    language: string;
}

export function AppContextProvider({ children, ...props }: PropsWithChildren<AppSettings>) {
    const [theme, setTheme] = useState(props.theme);

    useEffect(() => {
        setTheme(props.theme);
    }, [props.theme]);

    return (
        <I18nProvider lang={props.language}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </I18nProvider>
    );
}
```
Pay attention to the `useEffect` in the above code. We need it if we wrap a setting with `useSate`. In this case, the passed value to `useState` is only for initiation and it is not getting updated on later calls. As the host app can change the app settings through the `update` method, we need to use `useEffect` to make sure the state gets the changes. 

> [!NOTE]
You need to merge the two above examples if you support both optional "Sharing context" and passing down "App Settings" use cases.


### Create Web Components

In this section we create [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) (part of Web Components) to expose our React components as framework agnostic widgets. We don't need to create custom elements for inner components (e.g. `Body` , `Item`, `Header`)

To make life easier, we moved the generic codes to the `@workleap/r2wc` package (React to Web Component).


#### Define custom elements

To create a custom element, 
- inherit from the `WebComponentHTMLElement<Props, ObservedAttributesType>` class (inside `@workleap/r2wc` package), where:
- (optional) `Props` is the React component `Props` type. 
- (optional) `ObservedAttributesType` is the union type for new observed HTML attributes. This helps to keep type safety for them. You will see the usage in the following example. 

Define these properties in the inherited class:
- `tagName` (**required**): To set the HTML attribute name.
- `reactComponent` (**required**): to set the related React component,
- `observedAttributes`: to set the newly added HTML attributes if there is any. 
- `map`: to define a map for HTML attributes to React props, and HTML events to React callback props.
- `initialStyle`: to define initial style for the Web Component before having it rendered. it is really helpful to prevent [layout shifting](https://web.dev/articles/cls) while waiting the web component to get rendered. 

It is also required to define a `ObservedAttributesType`  union type based on the `observedAttributes` values.

```tsx
// src/MovieDetailsElement.tsx
import { WebComponentHTMLElement, type Map } from "@workleap/r2wc"

type ObservedAttributesType = (typeof MovieDetailsElement.observedAttributes)[number];

export class MovieDetailsElement extends WebComponentHTMLElement<MovieDetailsProps, ObservedAttributesType> {
    static tagName = "wl-movie-details";
    static observedAttributes = ["show-ranking", "mode"] as const;

    get reactComponent() {
        return MovieDetails;
    }

    get map(): Map<MovieDetailsProps, ObservedAttributesType> {
        return {
            attributes: {
                "show-ranking": { to: "showRanking", convert: value => value === "true" },
                "mode": "mode"
            },
            events: {
                "on-buy": "onBuy"
            }
        };
    }

    get initialStyle(): Partial<CSSStyleDeclaration> {
        return {
            display: "block",
            height: "48px"
        };
    }    
}
```

> [!NOTE]
> **`static observedAttributes`**
> - Attribute names should follow Kebab-Case naming convention. 
> - Follow the array with `as const`  to get type-safety support.
>
> &nbsp;
>
> **`get map()`**
> 
> It has two parts: `attributes` and `events`. 
> 
> - **`attributes`**
> 
>   The left side of each map item is attribute name, and the right side says how to map from attribute to the related React prop. You have to define a map for all attributes defined in `observedAttributes` array.
>   
>   The right side of the map could be:
>   - The React property name defined in `Props`, or
>   - An object that also defines how to convert the passed HTML attribute value from string. `{to: 'propName', convert: (value:string)=> PropertyType}`
>
> &nbsp;
> 
> - **`events`**
> 
>   This section defines new HTML events for related callbacks in `Props`. Note that unlike `observedAttributes`, we don't need to define these event names separately.  
 
> [!TIP]
> The base class has the `data` property ([not attribute](https://open-wc.org/guides/knowledge/attributes-and-properties/)) for the underlying React component. In other words, you can use the `data` property in Javascript to get and set all React props regardless of declaring attributes or events. 

Put the created file inside the `src` folder.


#### Define WidgetsManager

The host app needs an API to register and initialize the widgets. `WidgetsManager` class does this for you. To do that, create the [widgets.ts](/packages/movie-widgets/src/widgets.ts) file and create a new instance of the `WidgetsManager` class. Its construcor accepts this parameters:

- `elements` (**required**): An array of widgets to register. Without having them registered, you cannot use them in the host app.
- `contextProvider`: to pass shared context provider, e.g. `AppContextProvider`.
- `ignoreLoadingCss`: if you want the host to load the related CSS file, set this to true. Otherwise the manager will load the css file [automatically](/packages/r2wc/src/WidgetsManager.tsx).
- `syncRendering`: (**not recommended**) If you want the web component rendering happens syncronously. It may be useful for critical widgets that need to be present as soon as the page gets loaded. It is not recommended as it uses [flushSync](https://react.dev/reference/react-dom/flushSync) behind the hood and it may affect the overal page load time.  

Then set the result to a const and export it from the module. 

If you like to have access to it across the whole document, you can assign it to a window variable.

```tsx
// src/widgets.ts
const MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement],
    contextProvider: AppContextProvider
});

window.MovieWidgets = MovieWidgets;

export { MovieWidgets };
```

> [!IMPORTANT]
> You need to create a `types.d.ts` [file](/packages/movie-widgets/src/types.d.ts) and add the following declaration to be able to define `window.MovieWidgets` at window level:
> ```ts
> import type { IWidgetsManager } from "@workleap/r2wc";
> import type { AppSettings } from "./AppContextProvider.tsx";
> 
> export declare global {
>     interface Window {
>         MovieWidgets?: IWidgetsManager<AppSettings>;
>     }
> }
> ```

If you don't have `contextProvider`, simply ignore it:
```tsx
// src/widgets.ts
window.MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement]
});

export { MovieWidgets };
```

`WidgetsManager` loades the related `CSS` file automatically at the time of load. If you want to load the CSS file manually, you can pass the `ignoreLoadingCss: true` to the constructor.

`WidgetsManager` class exposes the following API which is being used inside the host apps.
- `initialize(config: AppSettings)` : To initiate the widgets and pass the initial state of `AppSettings`.
- `update(config: Partial<AppSettings>)`: To change the state of `AppSettings`. You only need to pass the changed settings.
- `appSettings: AppSettings`: To get the current app settings.

#### [Optional] Define React helpers
If you want to ease the process of using your defined web components inside React hosts, you
have to create the following files and [later](#optional-react-helpers-output) set up the package to export them properly.

First, declare types for defined Web Components inside the [/src/helpers/react/types.d.ts](/packages/movie-widgets/src/helpers/react/types.d.ts) file:

```ts
import type { WebComponentHTMLElement } from "@workleap/r2wc";

export declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "wl-movie-details": WebComponentHTMLElement;
            "wl-movie-finder": WebComponentHTMLElement;
        }
    }
}
```

Second, define wrapper components inside [src/helpers/react/index.ts](/packages/movie-widgets/src/helpers/react/index.ts) to ease the usage. Make sure you export both `types.d.ts` file as mentioned below:

```ts
import { createWebComponent } from "@workleap/r2wc/helpers/react";
import type { MovieDetailsProps } from "../../MovieDetails.tsx";

export type * from "../../types.d.ts";
export type * from "./types.d.ts";

export const MovieDetails = createWebComponent<MovieDetailsProps>("wl-movie-details");
export const MovieFinder = createWebComponent("wl-movie-finder");
```

> [!TIP]
> With above definitions, the host app can easily use the component's props similar to how they defined, but just through the `data` property:
> ```ts
> function Page() {
>   return (
>     <MovideDetails data={{mode: "inline", showRanking: true}} />
>   );
> }
> ```
> Without these helpers, your hosts have to do more to be able to use Web Components.


## Build the output
Everything is ready! We setup two different builds. One for CDN output, and the other a helper package for React hosts.

### CDN output

 Just make sure you have setup the [tsup.build.cdn.ts file](/packages/movie-widgets/tsup.build.cdn.ts) correctly:

```ts
export default defineBuildConfig({
    entry: ["src/index.ts"],
    outDir: "dist/cdn",
    noExternal: [/.*/],
    dts: false,
    minify: true,
    treeshake: true
});
```

After running the `pnpm build` inside the package, you will get `index.ts` and `index.css` files inside the `dist/cdn` folder. You need them in host apps to load and render widgets.

> [!IMPORTANT]
> This output is **NOT** for packaging. It is expected to be downloaded by the host apps from a CDN.


### [Optional] React helpers output
If you have defined [React helpers](#optional-define-react-helpers), you have to build the special output of your package as weel. 

 First, create the [tsup.build.react.ts file](/packages/movie-widgets/tsup.build.react.ts). Rememer to enable `dts: true`: 
```ts
export default defineBuildConfig({
    entry: ["src/helpers/react/index.ts"],
    outDir: "dist/react",
    dts: true,
    clean: true,
    sourcemap: true
});
```

Second, add the following to the [package.json](/packages/movie-widgets/package.json):
```json
    "name": "@workleap/movie-widgets",
    "version": "1.0.0",
    "main": "dist/react/index.js",
    "types": "dist/react/index.d.ts",
    "exports": {
        "./react": {
            "import": "./dist/react/index.js",
            "types": "./dist/react/index.d.ts"
        }
    },
    "files": [
        "dist"
    ],
```
The above ensures you can import `@workleap/movie-widgets/helpers/react` inside the React hosts.

## Deployment

The generated files inside the `/dist/cdn` folder (i.e `index.js` and `index.css`) need to be made available to our widgets consumers.

> [!CAUTION]
> #### The total combined size of these two files (after minification and Gzip compression) **SHOULD NOT** exceed 100KB.
> 
> You can use [this extension](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize) to see the Gzip size of the generated files.

These files need to be hosted in an Azure storage container, served via Azure Front Door. The storage system automatically handles compression in Brotli (`.br`) or Gzip (`.gz`) formats. Make sure to activate the compression in the optimization settings of the Front Door profile. That storage will need to be set up by the team that owns the widgets project.

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

For instance, for this template, the URLs are:

- JavaScript: https://cdn.workleap.com/movie-widgets/index.css
- CSS: https://cdn.workleap.com/movie-widgets/index.css

#### Versioning

Versioning is not required in the default setup since we aim to avoid breaking changes. By avoiding breaking changes, all consumers can continue using the latest version of the files without needing to update their applications.

- You should prioritize deprecating old features instead of removing them,
- You should use feature flags to opt-in to new features that would otherwise be breaking changes.

However, in the event that breaking changes need to be introduced, versioned folders can be added to the CDN.

For example, breaking changes might be deployed to:

- JavaScript: https://cdn.workleap.com/movie-widgets/2/index.js
- CSS: https://cdn.workleap.com/movie-widgets/2/index.css

In such cases, consumers will need to manually update the URLs in their applications to point to the new version (/2/index.js and /2/index.css). Since breaking changes are involved, this manual update is necessary to ensure compatibility with the new version.

## Usage
**How to consume framework agnostic widget?**

The framework agnostic widget can be consumed directly in any HTML page by referencing the deployed CDN files. To include the widgets in your project, use the following snippet:

```html
<link rel="modulepreload" href="https://cdn.workleap.com/movie-widgets/index.js" />
<script type="module" src="https://cdn.platform.workleap-dev.com/movie-widgets/index.js"></script>
```

> [!IMPORTANT]
> The `modulepreload` is almost enough but to get better perforamnce, add the `script` tag right after to run it immediately. This helps on faster custom element registeration. Without it, the script will run when the first usage comes up. 

> [!TIP]
> The `css` file is being loaded automatically through the above script if you haven't disabled it. 

Once this is added to the HTML page, the script can now inject the new Web Components into the page. This can be done through calling  `initialize` method.

### Vanilla Js 

An example usage of the widget in an HTML page:

```html
<html lang="en">
    <head>
        <link rel="modulepreload" href="/cdn/movie-widgets/index.js" />
        <script type="module" src="https://cdn.platform.workleap-dev.com/movie-widgets/index.js"></script>
        <script type="module">
            import { MovieWidgets } from "/cdn/movie-widgets/index.js";

            MovieWidgets.initialize({ theme: "light" });

            const movieDetails = document.getElementByTagName("movie-details")
            movieDetails.addEventListener("on-buy", function (movie, count) {
                alert(`bought ${count} tickets of ${movie.title}`);
            });        
        </script>
    </head>
    <body>
        <wl-movie-details mode="inline" show-ranking="true" />
        <wl-movie-finder />
    </body>
</html>
```

### React + Typescript

if you have defined [React helpers](#optional-define-react-helpers), you can easily import `@workleap/movie-widgets` package and then use the generated Web Components wrappers:

```jsx
import { MovieDetails, MovieFinder } from "@workleap/movie-widgets/react";

<MovieDetails data={{ mode: "modal", showRanking: true, onBuy: buyTickets }} />
<MovieDetails data={{ showRanking: false, mode: "inline" }} />
<MovieFinder style={{ fontWeight: "bold" }} />
```

> [!NOTE]
> You can use regular HTML attributes, like `style`, with these components.

#### Initial script
This part is pretty similar to VanilaJS example. As we load this package from CDN, **NOT** as a package, we have to load it separately in `index.html` file:

```html
<html lang="en">
    <head>
        <link rel="modulepreload" href="/cdn/movie-widgets/index.js" />
        <script type="module" src="https://cdn.platform.workleap-dev.com/movie-widgets/index.js"></script>
        <script type="module">
            import { MovieWidgets } from "/cdn/movie-widgets/index.js";
            MovieWidgets.initialize({ theme: "light" });
        </script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```


## Future Improvements

Even if the current POC is working, there are some improvements that we will look at in the future:

- Possibility of implementing the widget using the Shadow DOM to avoid conflicts with the host app styles.
  - [x] Having styles [loaded inside shadow elements](https://github.com/gsoft-inc/wl-framework-agnostic-widgets-template/pull/10)
  - [ ] Pushing all elements to render inside Shadow root. Currently Orbiter renders Modal and Menu at document level which causes them to get their styles from the main document, not the shadow root styles.
- Further optimizations for bundle size with improved tree-shaking
- Strategy to load some components dynamically to decrease the whole package size
- [Use SSR + Declarative Shadow Dom](https://web.dev/articles/declarative-shadow-dom) to boost performance and remove flickering at all






