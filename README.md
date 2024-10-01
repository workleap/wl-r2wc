# framework-agnostic widgets

The purpose of this POC is creating complex components in React and being able to use them inside React and non-React applications in same way.

To acheive this, we use the following technologies:

- [Web-components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) which allow us to create custom html elemnts. e.g `<wl-grid/>`.
- [createRoot](https://react.dev/reference/react-dom/client/createRoot) which renders the components in an isolation.
- [createPortal](https://react.dev/reference/react-dom/createPortal) which allows to render different components in different part of DOM.

# How to create?

Start with create 2 differnet packages:

- `react` to create the main logic of the widgets
- `web-components` to build the framework agnostic wrappers around the created React widgets.

## React package

It is the project for the main logic of your widgets.

### Building widgets

You are free to create any kind of React component, just there are some rules for components that are exposed as final Web-Component:

- They should not have `children`
- `JSX` props is not allowed as it cannot be translated easily to the similar HTML properties.

Note that above constraints are only for facade components. Any inner components can be implemented as usual.

For example:

```tsx
export function SearchResult({ pageSize }: SearchResultProps) {
  return <div>...</div>;
}
```

### Sharing context

widgets inside a same project could share context as regular app. We have to export this context provider as well. We can wrapp all the required context provider into one and later reuse it in `web-components` package. For example:

```tsx
export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ theme, setTheme, isResultOpen, setIsResultOpen }}
    >
      <ThemeProvider colorScheme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
```
