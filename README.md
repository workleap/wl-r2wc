# Framework Agnostic Widgets

The purpose of this template is:

- Creating complex components in React and using them inside React and non-React applications.
- Release once, available everywhere. So, all the consumer apps get updated automatically.

To do that, we use [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to define custom html elements, e.g `<wl-movie-details/>`, and we use [createRoot](https://react.dev/reference/react-dom/client/createRoot) and [createPortal](https://react.dev/reference/react-dom/createPortal) to fully separate widgets rendering from the hosted app rendering. Then we deploy the scripts on a CDN to allow all consumers to get the same version.

For example a simple HTML app can use the following `MovieDetails` React component inside their pages as regular HTML tags:

```tsx
function MovieDetails({ pageSize, theme }: MovieDetailsProps) {
    return <Content>...</Content>;
}
```

```html
<head>
    <script type="module" src="https://cdn.platform.workleap-dev.com/movie-widgets/index.js"></script>
    <link rel="stylesheet" href="https://cdn.platform.workleap-dev.com/movie-widgets/index.css" />
    <script>
        window.MovieWidgets.initialize();
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
> Whenever you make a change inside the `widgets` you need only to run `pnpm build` and then refresh your running apps.

You can follow the next steps to see how you can change and see the result.

## How to create a framework-agnostic widget?

### Main logic in React

Just build your regular React components and put them in the `react` folder.

You are free to create any kind of React component, just there are some rules for **exposed** components:

- They should **NOT** have `children`. e.g.:

  ```tsx
  function NotAllowedComponent({ children }: { children: ReactNode }) {
      return <div>{children}</div>;
  }
  ```

- `JSX` props are **NOT** not allowed as they cannot be translated easily to the similar HTML properties. e.g.:
  ```tsx
  function NotAllowedComponent({ header }: { header: ReactNode }) {
      return <div>{header}</div>;
  }
  ```

> [!NOTE]
> The above constraints are ONLY for components that are getting exposed as web components. Any inner components can be implemented as usual.

Here is a valid component which we can later make a web component based on it. Note that `<Layout/>`, `<Header/>`, `<Content/>` are inner components.

```tsx
// src/react/MovieDetails.tsx
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
// src/react/AppContextProvider.tsx
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
- Passing api URL, app name, app logo, etc.

If you have only one widget, it is ok to pass them through it as widget props, but if you have multiple widgets, it is not perfect to do the same for all widgets. To do that, add these settings to `AppSettings` and modify previously created `AppContextProvider` to handle them.

```tsx
// src/react/AppContextProvider.tsx
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

To make life easier, we moved the generic codes to the `r2wc` folder (React to Web Component). This folder contains:

- `WebComponentHTMLElement.tsx`: The base class for defining and creating custom elements.
- `WidgetsManager.tsx`: The main scripts to create and render custom elements in the browser.
- `PropsProvider.tsx`: It brings a mechanism to keep custom element properties sync with React component properties.

#### Define custom elements

To create a custom element, inherit from the `WebComponentHTMLElement<Props, ObservedAttributesType>` class where:
- (optional) `Props` is the React component `Props` type. 
- (optional) `ObservedAttributesType` is the union type for new observed HTML attributes. This helps to keep type safety for them. You will see the usage in the following example. 

It is required to define four properties in the inherited class:
- `tagName`: (required) To set the HTML attribute name.
- `observedAttributes`: (optional) to set the newly added HTML attributes if there is any. 
- `reactComponent`: to set the related React component,
- `map`: to define a map for HTML attributes to React props, and HTML events to React callback props.

It is also required to define a `ObservedAttributesType`  union type based on the `observedAttributes` values.

```tsx
// src/web-components/MovieDetailsElement.tsx
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

Put the created file inside the `src/web-components` folder.


#### Define WidgetsManager

The host app needs an API to register and initialize the widgets. `WidgetsManager` class does this for you. To do that, create the [widgets.ts](/widgets/src/web-components/widgets.ts) file and create the `WidgetsManager` class to: 

- Register defined widget. Without having them registered, you cannot use them in the host app.
- [optional] Pass `AppContextProvider`.

Then set the result to `window.MovieWidgets` global variable.

```tsx
// src/web-components/widgets.ts
declare global {
    interface Window {
        MovieWidgets?: WidgetsManager<AppSettings>;
    }
}

window.MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement],
    contextProvider: AppContextProvider
});
```

If you don't have `contextProvider`, simply ignore it:
```tsx
// src/web-components/widgets.ts
declare global {
    interface Window {
        MovieWidgets?: WidgetsManager;
    }
}

window.MovieWidgets = new WidgetsManager({
    elements: [MovieDetailsElement, MoviePopUpElement]
});
```

`WidgetsManager` class exposes the following API which is being used inside the host apps.
- `initialize(config: AppSettings)` : To initiate the widgets and pass the initial state of `AppSettings`.
- `update(config: Partial<AppSettings>)`: To change the state of `AppSettings`. You only need to pass the changed settings.
- `appSettings: AppSettings`: To get the current app settings.

#### Build the output

Everything is ready! Just make sure you have setup the `tsup.build.ts` correctly:

- Include both `minify: true` and `treeshake: true`
- Include the required css file and `widget.ts` inside the `src/index.ts` file.

After running the `pnpm build` inside the `widgets` folder, you will get `index.ts` and `index.css` files inside the `dist` folder. You need them in consumer apps to load and render widgets.

> [!IMPORTANT]
> This output is not for packaging. It is expected to be downloaded by the consumers apps from a CDN.

## Deployment

This widgets project generates two files that need to be made available to our widgets consumers: `index.js` and `index.css`.

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
**How to consume framework-agnostic widget?**

The framework-agnostic widget can be consumed directly in any HTML page by referencing the deployed CDN files. To include the widget in your project, use the following snippet:

```html
<script
  src="https://cdn.workleap.com/movie-widgets/index.js"
></script>
<link
  rel="stylesheet"
  href="https://cdn.workleap.com/movie-widgets/index.css"
/>
```

Once this is added to the HTML page, the script can now inject the new Web Components into the page. This can be done through calling  `initialize` method.

### Vanilla Js 

An example usage of the widget in an React page:

```html
<!DOCTYPE html>
<html lang="en">
<head>

    <script src="/cdn/movie-widgets/index.js"></script>
    <link rel="stylesheet" href="/cdn/movie-widgets/index.css" />
    <script type="module" src="index.js"></script>
    <script>
        window.MovieWidgets.initialize({ theme: "light" });

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
```

### React + Typescript

In order to use your generated Web Components inside a React+Typescript app, we need to: 
- Provide type definitions for the widget props.
- Build a wrapper component for each web component to easily interact with them.

> [!CAUTION]
> Although it is possible, we **STRONGLY** recommend not using custom HTML attributes and events. Instead, only use the provided `data` and the following utility functions. With this, you will have a unified pattern across your codebase.


### Declare types

Create type definitions inside [web-components.d.ts](/apps/react/widgets/web-components.d.ts) like this:

```typescript
// apps/react/widgets/web-components.d.ts
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "wl-movie-finder": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
            >;

            "wl-movie-details": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
            >;
        }
    }
}
```

For the API available through the `window.MovieWidgets` object, you should create a type definition [widgets-manager.d.ts](/apps/react/widgets/widgets-manager.d.ts) like this:

```typescript
// apps/react/widgets/widgets-manager.d.ts
interface AppSettings {
    theme: "light" | "dark" | "system";
}

interface IWidgetsManager<T> {
    initialize: (settings?: T) => void;
    update: (settings: Partial<T>) => void;
    appSettings?: T | null;
}

export declare global {
    interface Window {
        MovieWidgets?: IWidgetsManager<AppSettings>;
    }
}
```

### Wrapper components
Although you can use basic HTML web components, but it is encouraged to use the following helper functions to have full and straightforward access to the underlying React component props, mostly like how it is defined.

To do that, first you need put the components props declartions inside the [widgets-props.d.ts](/apps/react/widgets/widgets-props.d.ts)

```ts
// apps/react/widgets/widgets-props.d.t
export declare interface MovieData {
    key: string;
    title: string;
}

export declare interface MovieDetailsProps {
    showRanking: boolean;
    onBuy?: (movie : MovieData, count: number) => void;
    mode: "modal" | "inline";
}
```

Then inside the [Widgets.tsx](/apps/react/widgets/Widgets.tsx) we create the React version of web components that get their props through the `data` property. 

```tsx
// apps/react/widgets/Widgets.tsx
import { createElement, type HTMLAttributes, useEffect, useRef } from "react";
import type { MovieDetailsProps, MoviePopupProps, TicketProps } from "./widgets-props.js";

declare class WebComponentHTMLElement<Props= unknown> extends HTMLElement {
    get data(): Props | null| undefined;
    set data(value: Props | null | undefined);
}

function createWebComponent<Props = unknown, CustomAttributes= unknown>(tagName: keyof JSX.IntrinsicElements) {
    return function WebComponent(props: { data?: Props | null } & HTMLAttributes<HTMLElement> & CustomAttributes) {
        const { data, ...rest } = props;
        const ref = useRef <WebComponentHTMLElement<Props>>(null);

        useEffect(() => {
            if (data !== undefined && ref.current) {
                ref.current.data = data;
            }
        }, [data]);

        return createElement(tagName, { ref, ...rest });
    };
}

export const MovieDetails = createWebComponent<MovieDetailsProps>("wl-movie-details");
export const MovieFinder = createWebComponent("wl-movie-finder");

```

Now you can easily use them as regular React components like this:

```jsx
<MovieDetails data={{ mode: "modal", showRanking: true, onBuy: buyTickets }} />
<MovieDetails data={{ showRanking: false, mode: "inline" }} />
<MovieFinder style={{ fontWeight: "bold" }} />
```

> [!NOTE]
> You can use regular HTML attributes, like `style` with these components.



## Future Improvements

Even if the current POC is working, there are some improvements that we will look at in the future:

- Possibility of implementing the widget using the Shadow DOM to avoid conflicts with the host app styles.
- Further optimizations for bundle size with improved tree-shaking
- Using preload scripts and styles to avoid page flickering for mission critical widgets like the Navbar
- Extract the r2wc folder into a library package






