# @workleap/r2wc

## 1.2.1

### Patch Changes

- [#20](https://github.com/gsoft-inc/wl-r2wc/pull/20) [`64baf52`](https://github.com/gsoft-inc/wl-r2wc/commit/64baf528204dcbe2454dba9c3669391b6be76cfd) Thanks [@mahmoudmoravej](https://github.com/mahmoudmoravej)! - Fix the wrong render() call when a widget is removed removed, unmount() is called, and then a new widget gets mounted all on a same thread.

## 1.2.0

### Minor Changes

- [#18](https://github.com/gsoft-inc/wl-r2wc/pull/18) [`c0df5ec`](https://github.com/gsoft-inc/wl-r2wc/commit/c0df5ec85e796f305de8835114fbf4af12373773) Thanks [@mahmoudmoravej](https://github.com/mahmoudmoravej)! - - Add `contextProviderProps` and `extends` method to `WidgetsManager` to make it more flexible and being able to expose functions outside of the Widgets.
  - Rename the `appSettings` to `settings` in `IWidgetsManager` interface.

## 1.1.1

### Patch Changes

- [#16](https://github.com/gsoft-inc/wl-r2wc/pull/16) [`1154b06`](https://github.com/gsoft-inc/wl-r2wc/commit/1154b06d52d24ab307305787d5698dff67e8d1fd) Thanks [@mahmoudmoravej](https://github.com/mahmoudmoravej)! - Fix a bug: Resolve web elements "data" properties even if they have been set sooner than the element gets defined.

## 1.1.0

### Minor Changes

- [#14](https://github.com/gsoft-inc/wl-r2wc/pull/14) [`99698b3`](https://github.com/gsoft-inc/wl-r2wc/commit/99698b38daf8d4834dc68de5d3d50aa1aafa3fa9) Thanks [@mahmoudmoravej](https://github.com/mahmoudmoravej)! - Add unmount function to unlock calling initialize again(for testing purposes)

## 1.0.0

### Major Changes

- [`db4e325`](https://github.com/gsoft-inc/wl-r2wc/commit/db4e32527c553a95d6d7a64e754e44acb8d98ceb) Thanks [@mahmoudmoravej](https://github.com/mahmoudmoravej)! - initial r2wc package
