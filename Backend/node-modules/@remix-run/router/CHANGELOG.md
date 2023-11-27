# `@remix-run/router`

## 1.13.0

### Minor Changes

- Export the `PathParam` type from the public API ([#10719](https://github.com/remix-run/react-router/pull/10719))

### Patch Changes

- Fix bug with `resolveTo` in splat routes ([#11045](https://github.com/remix-run/react-router/pull/11045))
  - This is a follow up to [#10983](https://github.com/remix-run/react-router/pull/10983) to handle the few other code paths using `getPathContributingMatches`
  - This removes the `UNSAFE_getPathContributingMatches` export from `@remix-run/router` since we no longer need this in the `react-router`/`react-router-dom` layers
- Do not revalidate unmounted fetchers when `v7_fetcherPersist` is enabled ([#11044](https://github.com/remix-run/react-router/pull/11044))

## 1.12.0

### Minor Changes

- Add `unstable_flushSync` option to `router.navigate` and `router.fetch` to tell the React Router layer to opt-out of `React.startTransition` and into `ReactDOM.flushSync` for state updates ([#11005](https://github.com/remix-run/react-router/pull/11005))

### Patch Changes

- Fix `relative="path"` bug where relative path calculations started from the full location pathname, instead of from the current contextual route pathname. ([#11006](https://github.com/remix-run/react-router/pull/11006))

  ```jsx
  <Route path="/a">
    <Route path="/b" element={<Component />}>
      <Route path="/c" />
    </Route>
  </Route>;

  function Component() {
    return (
      <>
        {/* This is now correctly relative to /a/b, not /a/b/c */}
        <Link to=".." relative="path" />
        <Outlet />
      </>
    );
  }
  ```

## 1.11.0

### Minor Changes

- Add a new `future.v7_fetcherPersist` flag to the `@remix-run/router` to change the persistence behavior of fetchers when `router.deleteFetcher` is called. Instead of being immediately cleaned up, fetchers will persist until they return to an `idle` state ([RFC](https://github.com/remix-run/remix/discussions/7698)) ([#10962](https://github.com/remix-run/react-router/pull/10962))

  - This is sort of a long-standing bug fix as the `useFetchers()` API was always supposed to only reflect **in-flight** fetcher information for pending/optimistic UI -- it was not intended to reflect fetcher data or hang onto fetchers after they returned to an `idle` state
  - Keep an eye out for the following specific behavioral changes when opting into this flag and check your app for compatibility:
    - Fetchers that complete _while still mounted_ will no longer appear in `useFetchers()`. They served effectively no purpose in there since you can access the data via `useFetcher().data`).
    - Fetchers that previously unmounted _while in-flight_ will not be immediately aborted and will instead be cleaned up once they return to an `idle` state. They will remain exposed via `useFetchers` while in-flight so you can still access pending/optimistic data after unmount.

- When `v7_fetcherPersist` is enabled, the router now performs ref-counting on fetcher keys via `getFetcher`/`deleteFetcher` so it knows when a given fetcher is totally unmounted from the UI ([#10977](https://github.com/remix-run/react-router/pull/10977))

  - Once a fetcher has been totally unmounted, we can ignore post-processing of a persisted fetcher result such as a redirect or an error
  - The router will also pass a new `deletedFetchers` array to the subscriber callbacks so that the UI layer can remove associated fetcher data

- Add support for optional path segments in `matchPath` ([#10768](https://github.com/remix-run/react-router/pull/10768))

### Patch Changes

- Fix `router.getFetcher`/`router.deleteFetcher` type definitions which incorrectly specified `key` as an optional parameter ([#10960](https://github.com/remix-run/react-router/pull/10960))

## 1.10.0

### Minor Changes

- Add experimental support for the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition) by allowing users to opt-into view transitions on navigations via the new `unstable_viewTransition` option to `router.navigate` ([#10916](https://github.com/remix-run/react-router/pull/10916))

### Patch Changes

- Allow 404 detection to leverage root route error boundary if path contains a URL segment ([#10852](https://github.com/remix-run/react-router/pull/10852))
- Fix `ErrorResponse` type to avoid leaking internal field ([#10876](https://github.com/remix-run/react-router/pull/10876))

## 1.9.0

### Minor Changes

- In order to move towards stricter TypeScript support in the future, we're aiming to replace current usages of `any` with `unknown` on exposed typings for user-provided data. To do this in Remix v2 without introducing breaking changes in React Router v6, we have added generics to a number of shared types. These continue to default to `any` in React Router and are overridden with `unknown` in Remix. In React Router v7 we plan to move these to `unknown` as a breaking change. ([#10843](https://github.com/remix-run/react-router/pull/10843))
  - `Location` now accepts a generic for the `location.state` value
  - `ActionFunctionArgs`/`ActionFunction`/`LoaderFunctionArgs`/`LoaderFunction` now accept a generic for the `context` parameter (only used in SSR usages via `createStaticHandler`)
  - The return type of `useMatches` (now exported as `UIMatch`) accepts generics for `match.data` and `match.handle` - both of which were already set to `unknown`
- Move the `@private` class export `ErrorResponse` to an `UNSAFE_ErrorResponseImpl` export since it is an implementation detail and there should be no construction of `ErrorResponse` instances in userland. This frees us up to export a `type ErrorResponse` which correlates to an instance of the class via `InstanceType`. Userland code should only ever be using `ErrorResponse` as a type and should be type-narrowing via `isRouteErrorResponse`. ([#10811](https://github.com/remix-run/react-router/pull/10811))
- Export `ShouldRevalidateFunctionArgs` interface ([#10797](https://github.com/remix-run/react-router/pull/10797))
- Removed private/internal APIs only required for the Remix v1 backwards compatibility layer and no longer needed in Remix v2 (`_isFetchActionRedirect`, `_hasFetcherDoneAnything`) ([#10715](https://github.com/remix-run/react-router/pull/10715))

### Patch Changes

- Add method/url to error message on aborted `query`/`queryRoute` calls ([#10793](https://github.com/remix-run/react-router/pull/10793))
- Fix a race-condition with loader/action-thrown errors on `route.lazy` routes ([#10778](https://github.com/remix-run/react-router/pull/10778))
- Fix type for `actionResult` on the arguments object passed to `shouldRevalidate` ([#10779](https://github.com/remix-run/react-router/pull/10779))

## 1.8.0

### Minor Changes

- Add's a new `redirectDocument()` function which allows users to specify that a redirect from a `loader`/`action` should trigger a document reload (via `window.location`) instead of attempting to navigate to the redirected location via React Router ([#10705](https://github.com/remix-run/react-router/pull/10705))

### Patch Changes

- Fix an issue in `queryRoute` that was not always identifying thrown `Response` instances ([#10717](https://github.com/remix-run/react-router/pull/10717))
- Ensure hash history always includes a leading slash on hash pathnames ([#10753](https://github.com/remix-run/react-router/pull/10753))

## 1.7.2

### Patch Changes

- Trigger an error if a `defer` promise resolves/rejects with `undefined` in order to match the behavior of loaders and actions which must return a value or `null` ([#10690](https://github.com/remix-run/react-router/pull/10690))
- Properly handle fetcher redirects interrupted by normal navigations ([#10674](https://github.com/remix-run/react-router/pull/10674), [#10709](https://github.com/remix-run/react-router/pull/10709))
- Initial-load fetchers should not automatically revalidate on GET navigations ([#10688](https://github.com/remix-run/react-router/pull/10688))
- Enhance the return type of `Route.lazy` to prohibit returning an empty object ([#10634](https://github.com/remix-run/react-router/pull/10634))

## 1.7.1

### Patch Changes

- Fix issues with reused blockers on subsequent navigations ([#10656](https://github.com/remix-run/react-router/pull/10656))

## 1.7.0

### Minor Changes

- Add support for `application/json` and `text/plain` encodings for `router.navigate`/`router.fetch` submissions. To leverage these encodings, pass your data in a `body` parameter and specify the desired `formEncType`: ([#10413](https://github.com/remix-run/react-router/pull/10413))

  ```js
  // By default, the encoding is "application/x-www-form-urlencoded"
  router.navigate("/", {
    formMethod: "post",
    body: { key: "value" },
  });

  async function action({ request }) {
    // await request.formData() => FormData instance with entry [key=value]
  }
  ```

  ```js
  // Pass `formEncType` to opt-into a different encoding (json)
  router.navigate("/", {
    formMethod: "post",
    formEncType: "application/json",
    body: { key: "value" },
  });

  async function action({ request }) {
    // await request.json() => { key: "value" }
  }
  ```

  ```js
  // Pass `formEncType` to opt-into a different encoding (text)
  router.navigate("/", {
    formMethod: "post",
    formEncType: "text/plain",
    body: "Text submission",
  });

  async function action({ request }) {
    // await request.text() => "Text submission"
  }
  ```

### Patch Changes

- Call `window.history.pushState/replaceState` before updating React Router state (instead of after) so that `window.location` matches `useLocation` during synchronous React 17 rendering ([#10448](https://github.com/remix-run/react-router/pull/10448))
  - ⚠️ However, generally apps should not be relying on `window.location` and should always reference `useLocation` when possible, as `window.location` will not be in sync 100% of the time (due to `popstate` events, concurrent mode, etc.)
- Strip `basename` from the `location` provided to `<ScrollRestoration getKey>` to match the `useLocation` behavior ([#10550](https://github.com/remix-run/react-router/pull/10550))
- Avoid calling `shouldRevalidate` for fetchers that have not yet completed a data load ([#10623](https://github.com/remix-run/react-router/pull/10623))
- Fix `unstable_useBlocker` key issues in `StrictMode` ([#10573](https://github.com/remix-run/react-router/pull/10573))
- Upgrade `typescript` to 5.1 ([#10581](https://github.com/remix-run/react-router/pull/10581))

## 1.6.3

### Patch Changes

- Allow fetcher revalidations to complete if submitting fetcher is deleted ([#10535](https://github.com/remix-run/react-router/pull/10535))
- Re-throw `DOMException` (`DataCloneError`) when attempting to perform a `PUSH` navigation with non-serializable state. ([#10427](https://github.com/remix-run/react-router/pull/10427))
- Ensure revalidations happen when hash is present ([#10516](https://github.com/remix-run/react-router/pull/10516))
- upgrade jest and jsdom ([#10453](https://github.com/remix-run/react-router/pull/10453))

## 1.6.2

### Patch Changes

- Fix HMR-driven error boundaries by properly reconstructing new routes and `manifest` in `\_internalSetRoutes` ([#10437](https://github.com/remix-run/react-router/pull/10437))
- Fix bug where initial data load would not kick off when hash is present ([#10493](https://github.com/remix-run/react-router/pull/10493))

## 1.6.1

### Patch Changes

- Fix `basename` handling when navigating without a path ([#10433](https://github.com/remix-run/react-router/pull/10433))
- "Same hash" navigations no longer re-run loaders to match browser behavior (i.e. `/path#hash -> /path#hash`) ([#10408](https://github.com/remix-run/react-router/pull/10408))

## 1.6.0

### Minor Changes

- Enable relative routing in the `@remix-run/router` when providing a source route ID from which the path is relative to: ([#10336](https://github.com/remix-run/react-router/pull/10336))

  - Example: `router.navigate("../path", { fromRouteId: "some-route" })`.
  - This also applies to `router.fetch` which already receives a source route ID

- Introduce a new `@remix-run/router` `future.v7_prependBasename` flag to enable `basename` prefixing to all paths coming into `router.navigate` and `router.fetch`.

  - Previously the `basename` was prepended in the React Router layer, but now that relative routing is being handled by the router we need prepend the `basename` _after_ resolving any relative paths
  - This also enables `basename` support in `useFetcher` as well

### Patch Changes

- Enhance `LoaderFunction`/`ActionFunction` return type to prevent `undefined` from being a valid return value ([#10267](https://github.com/remix-run/react-router/pull/10267))
- Ensure proper 404 error on `fetcher.load` call to a route without a `loader` ([#10345](https://github.com/remix-run/react-router/pull/10345))
- Deprecate the `createRouter` `detectErrorBoundary` option in favor of the new `mapRouteProperties` option for converting a framework-agnostic route to a framework-aware route. This allows us to set more than just the `hasErrorBoundary` property during route pre-processing, and is now used for mapping `Component -> element` and `ErrorBoundary -> errorElement` in `react-router`. ([#10287](https://github.com/remix-run/react-router/pull/10287))
- Fixed a bug where fetchers were incorrectly attempting to revalidate on search params changes or routing to the same URL (using the same logic for route `loader` revalidations). However, since fetchers have a static href, they should only revalidate on `action` submissions or `router.revalidate` calls. ([#10344](https://github.com/remix-run/react-router/pull/10344))
- Decouple `AbortController` usage between revalidating fetchers and the thing that triggered them such that the unmount/deletion of a revalidating fetcher doesn't impact the ongoing triggering navigation/revalidation ([#10271](https://github.com/remix-run/react-router/pull/10271))

## 1.5.0

### Minor Changes

- Added support for [**Future Flags**](https://reactrouter.com/en/main/guides/api-development-strategy) in React Router. The first flag being introduced is `future.v7_normalizeFormMethod` which will normalize the exposed `useNavigation()/useFetcher()` `formMethod` fields as uppercase HTTP methods to align with the `fetch()` behavior. ([#10207](https://github.com/remix-run/react-router/pull/10207))

  - When `future.v7_normalizeFormMethod === false` (default v6 behavior),
    - `useNavigation().formMethod` is lowercase
    - `useFetcher().formMethod` is lowercase
  - When `future.v7_normalizeFormMethod === true`:
    - `useNavigation().formMethod` is uppercase
    - `useFetcher().formMethod` is uppercase

### Patch Changes

- Provide fetcher submission to `shouldRevalidate` if the fetcher action redirects ([#10208](https://github.com/remix-run/react-router/pull/10208))
- Properly handle `lazy()` errors during router initialization ([#10201](https://github.com/remix-run/react-router/pull/10201))
- Remove `instanceof` check for `DeferredData` to be resilient to ESM/CJS boundaries in SSR bundling scenarios ([#10247](https://github.com/remix-run/react-router/pull/10247))
- Update to latest `@remix-run/web-fetch@4.3.3` ([#10216](https://github.com/remix-run/react-router/pull/10216))

## 1.4.0

### Minor Changes

- **Introducing Lazy Route Modules!** ([#10045](https://github.com/remix-run/react-router/pull/10045))

  In order to keep your application bundles small and support code-splitting of your routes, we've introduced a new `lazy()` route property. This is an async function that resolves the non-route-matching portions of your route definition (`loader`, `action`, `element`/`Component`, `errorElement`/`ErrorBoundary`, `shouldRevalidate`, `handle`).

  Lazy routes are resolved on initial load and during the `loading` or `submitting` phase of a navigation or fetcher call. You cannot lazily define route-matching properties (`path`, `index`, `children`) since we only execute your lazy route functions after we've matched known routes.

  Your `lazy` functions will typically return the result of a dynamic import.

  ```jsx
  // In this example, we assume most folks land on the homepage so we include that
  // in our critical-path bundle, but then we lazily load modules for /a and /b so
  // they don't load until the user navigates to those routes
  let routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="a" lazy={() => import("./a")} />
      <Route path="b" lazy={() => import("./b")} />
    </Route>
  );
  ```

  Then in your lazy route modules, export the properties you want defined for the route:

  ```jsx
  export async function loader({ request }) {
    let data = await fetchData(request);
    return json(data);
  }

  // Export a `Component` directly instead of needing to create a React Element from it
  export function Component() {
    let data = useLoaderData();

    return (
      <>
        <h1>You made it!</h1>
        <p>{data}</p>
      </>
    );
  }

  // Export an `ErrorBoundary` directly instead of needing to create a React Element from it
  export function ErrorBoundary() {
    let error = useRouteError();
    return isRouteErrorResponse(error) ? (
      <h1>
        {error.status} {error.statusText}
      </h1>
    ) : (
      <h1>{error.message || error}</h1>
    );
  }
  ```

  An example of this in action can be found in the [`examples/lazy-loading-router-provider`](https://github.com/remix-run/react-router/tree/main/examples/lazy-loading-router-provider) directory of the repository.

  🙌 Huge thanks to @rossipedia for the [Initial Proposal](https://github.com/remix-run/react-router/discussions/9826) and [POC Implementation](https://github.com/remix-run/react-router/pull/9830).

### Patch Changes

- Fix `generatePath` incorrectly applying parameters in some cases ([#10078](https://github.com/remix-run/react-router/pull/10078))

## 1.3.3

### Patch Changes

- Correctly perform a hard redirect for same-origin absolute URLs outside of the router `basename` ([#10076](https://github.com/remix-run/react-router/pull/10076))
- Ensure status code and headers are maintained for `defer` loader responses in `createStaticHandler`'s `query()` method ([#10077](https://github.com/remix-run/react-router/pull/10077))
- Change `invariant` to an `UNSAFE_invariant` export since it's only intended for internal use ([#10066](https://github.com/remix-run/react-router/pull/10066))
- Add internal API for custom HMR implementations ([#9996](https://github.com/remix-run/react-router/pull/9996))

## 1.3.2

### Patch Changes

- Remove inaccurate console warning for POP navigations and update active blocker logic ([#10030](https://github.com/remix-run/react-router/pull/10030))
- Only check for differing origin on absolute URL redirects ([#10033](https://github.com/remix-run/react-router/pull/10033))

## 1.3.1

### Patch Changes

- Fixes 2 separate issues for revalidating fetcher `shouldRevalidate` calls ([#9948](https://github.com/remix-run/react-router/pull/9948))
  - The `shouldRevalidate` function was only being called for _explicit_ revalidation scenarios (after a mutation, manual `useRevalidator` call, or an `X-Remix-Revalidate` header used for cookie setting in Remix). It was not properly being called on _implicit_ revalidation scenarios that also apply to navigation `loader` revalidation, such as a change in search params or clicking a link for the page we're already on. It's now correctly called in those additional scenarios.
  - The parameters being passed were incorrect and inconsistent with one another since the `current*`/`next*` parameters reflected the static `fetcher.load` URL (and thus were identical). Instead, they should have reflected the the navigation that triggered the revalidation (as the `form*` parameters did). These parameters now correctly reflect the triggering navigation.
- Respect `preventScrollReset` on `<fetcher.Form>` ([#9963](https://github.com/remix-run/react-router/pull/9963))
- Do not short circuit on hash change only mutation submissions ([#9944](https://github.com/remix-run/react-router/pull/9944))
- Remove `instanceof` check from `isRouteErrorResponse` to avoid bundling issues on the server ([#9930](https://github.com/remix-run/react-router/pull/9930))
- Fix navigation for hash routers on manual URL changes ([#9980](https://github.com/remix-run/react-router/pull/9980))
- Detect when a `defer` call only contains critical data and remove the `AbortController` ([#9965](https://github.com/remix-run/react-router/pull/9965))
- Send the name as the value when url-encoding `File` `FormData` entries ([#9867](https://github.com/remix-run/react-router/pull/9867))

## 1.3.0

### Minor Changes

- Added support for navigation blocking APIs ([#9709](https://github.com/remix-run/react-router/pull/9709))
- Expose deferred information from `createStaticHandler` ([#9760](https://github.com/remix-run/react-router/pull/9760))

### Patch Changes

- Improved absolute redirect url detection in actions/loaders ([#9829](https://github.com/remix-run/react-router/pull/9829))
- Fix URL creation with memory histories ([#9814](https://github.com/remix-run/react-router/pull/9814))
- Fix `generatePath` when optional params are present ([#9764](https://github.com/remix-run/react-router/pull/9764))
- Fix scroll reset if a submission redirects ([#9886](https://github.com/remix-run/react-router/pull/9886))
- Fix 404 bug with same-origin absolute redirects ([#9913](https://github.com/remix-run/react-router/pull/9913))
- Support `OPTIONS` requests in `staticHandler.queryRoute` ([#9914](https://github.com/remix-run/react-router/pull/9914))

## 1.2.1

### Patch Changes

- Include submission info in `shouldRevalidate` on action redirects ([#9777](https://github.com/remix-run/react-router/pull/9777), [#9782](https://github.com/remix-run/react-router/pull/9782))
- Reset `actionData` on action redirect to current location ([#9772](https://github.com/remix-run/react-router/pull/9772))

## 1.2.0

### Minor Changes

- Remove `unstable_` prefix from `createStaticHandler`/`createStaticRouter`/`StaticRouterProvider` ([#9738](https://github.com/remix-run/react-router/pull/9738))

### Patch Changes

- Fix explicit `replace` on submissions and `PUSH` on submission to new paths ([#9734](https://github.com/remix-run/react-router/pull/9734))
- Fix a few bugs where loader/action data wasn't properly cleared on errors ([#9735](https://github.com/remix-run/react-router/pull/9735))
- Prevent `useLoaderData` usage in `errorElement` ([#9735](https://github.com/remix-run/react-router/pull/9735))
- Skip initial scroll restoration for SSR apps with `hydrationData` ([#9664](https://github.com/remix-run/react-router/pull/9664))

## 1.1.0

This release introduces support for [Optional Route Segments](https://github.com/remix-run/react-router/issues/9546). Now, adding a `?` to the end of any path segment will make that entire segment optional. This works for both static segments and dynamic parameters.

**Optional Params Examples**

- Path `lang?/about` will match:
  - `/:lang/about`
  - `/about`
- Path `/multistep/:widget1?/widget2?/widget3?` will match:
  - `/multistep`
  - `/multistep/:widget1`
  - `/multistep/:widget1/:widget2`
  - `/multistep/:widget1/:widget2/:widget3`

**Optional Static Segment Example**

- Path `/home?` will match:
  - `/`
  - `/home`
- Path `/fr?/about` will match:
  - `/about`
  - `/fr/about`

### Minor Changes

- Allows optional routes and optional static segments ([#9650](https://github.com/remix-run/react-router/pull/9650))

### Patch Changes

- Stop incorrectly matching on partial named parameters, i.e. `<Route path="prefix-:param">`, to align with how splat parameters work. If you were previously relying on this behavior then it's recommended to extract the static portion of the path at the `useParams` call site: ([#9506](https://github.com/remix-run/react-router/pull/9506))

```jsx
// Old behavior at URL /prefix-123
<Route path="prefix-:id" element={<Comp /> }>

function Comp() {
  let params = useParams(); // { id: '123' }
  let id = params.id; // "123"
  ...
}

// New behavior at URL /prefix-123
<Route path=":id" element={<Comp /> }>

function Comp() {
  let params = useParams(); // { id: 'prefix-123' }
  let id = params.id.replace(/^prefix-/, ''); // "123"
  ...
}
```

- Persist `headers` on `loader` `request`'s after SSR document `action` request ([#9721](https://github.com/remix-run/react-router/pull/9721))
- Fix requests sent to revalidating loaders so they reflect a GET request ([#9660](https://github.com/remix-run/react-router/pull/9660))
- Fix issue with deeply nested optional segments ([#9727](https://github.com/remix-run/react-router/pull/9727))
- GET forms now expose a submission on the loading navigation ([#9695](https://github.com/remix-run/react-router/pull/9695))
- Fix error boundary tracking for multiple errors bubbling to the same boundary ([#9702](https://github.com/remix-run/react-router/pull/9702))

## 1.0.5

### Patch Changes

- Fix requests sent to revalidating loaders so they reflect a `GET` request ([#9680](https://github.com/remix-run/react-router/pull/9680))
- Remove `instanceof Response` checks in favor of `isResponse` ([#9690](https://github.com/remix-run/react-router/pull/9690))
- Fix `URL` creation in Cloudflare Pages or other non-browser-environments ([#9682](https://github.com/remix-run/react-router/pull/9682), [#9689](https://github.com/remix-run/react-router/pull/9689))
- Add `requestContext` support to static handler `query`/`queryRoute` ([#9696](https://github.com/remix-run/react-router/pull/9696))
  - Note that the unstable API of `queryRoute(path, routeId)` has been changed to `queryRoute(path, { routeId, requestContext })`

## 1.0.4

### Patch Changes

- Throw an error if an `action`/`loader` function returns `undefined` as revalidations need to know whether the loader has previously been executed. `undefined` also causes issues during SSR stringification for hydration. You should always ensure you `loader`/`action` returns a value, and you may return `null` if you don't wish to return anything. ([#9511](https://github.com/remix-run/react-router/pull/9511))
- Properly handle redirects to external domains ([#9590](https://github.com/remix-run/react-router/pull/9590), [#9654](https://github.com/remix-run/react-router/pull/9654))
- Preserve the HTTP method on 307/308 redirects ([#9597](https://github.com/remix-run/react-router/pull/9597))
- Support `basename` in static data routers ([#9591](https://github.com/remix-run/react-router/pull/9591))
- Enhanced `ErrorResponse` bodies to contain more descriptive text in internal 403/404/405 scenarios

## 1.0.3

### Patch Changes

- Fix hrefs generated when using `createHashRouter` ([#9409](https://github.com/remix-run/react-router/pull/9409))
- fix encoding/matching issues with special chars ([#9477](https://github.com/remix-run/react-router/pull/9477), [#9496](https://github.com/remix-run/react-router/pull/9496))
- Support `basename` and relative routing in `loader`/`action` redirects ([#9447](https://github.com/remix-run/react-router/pull/9447))
- Ignore pathless layout routes when looking for proper submission `action` function ([#9455](https://github.com/remix-run/react-router/pull/9455))
- properly support `index` routes with a `path` in `useResolvedPath` ([#9486](https://github.com/remix-run/react-router/pull/9486))
- Add UMD build for `@remix-run/router` ([#9446](https://github.com/remix-run/react-router/pull/9446))
- fix `createURL` in local file execution in Firefox ([#9464](https://github.com/remix-run/react-router/pull/9464))
- Updates to `unstable_createStaticHandler` for incorporating into Remix ([#9482](https://github.com/remix-run/react-router/pull/9482), [#9465](https://github.com/remix-run/react-router/pull/9465))

## 1.0.2

### Patch Changes

- Reset `actionData` after a successful action redirect ([#9334](https://github.com/remix-run/react-router/pull/9334))
- Update `matchPath` to avoid false positives on dash-separated segments ([#9300](https://github.com/remix-run/react-router/pull/9300))
- If an index route has children, it will result in a runtime error. We have strengthened our `RouteObject`/`RouteProps` types to surface the error in TypeScript. ([#9366](https://github.com/remix-run/react-router/pull/9366))

## 1.0.1

### Patch Changes

- Preserve state from `initialEntries` ([#9288](https://github.com/remix-run/react-router/pull/9288))
- Preserve `?index` for fetcher get submissions to index routes ([#9312](https://github.com/remix-run/react-router/pull/9312))

## 1.0.0

This is the first stable release of `@remix-run/router`, which provides all the underlying routing and data loading/mutation logic for `react-router`. You should _not_ be using this package directly unless you are authoring a routing library similar to `react-router`.

For an overview of the features provided by `react-router`, we recommend you go check out the [docs][rr-docs], especially the [feature overview][rr-feature-overview] and the [tutorial][rr-tutorial].

For an overview of the features provided by `@remix-run/router`, please check out the [`README`][remix-router-readme].

[rr-docs]: https://reactrouter.com
[rr-feature-overview]: https://reactrouter.com/start/overview
[rr-tutorial]: https://reactrouter.com/start/tutorial
[remix-router-readme]: https://github.com/remix-run/react-router/blob/main/packages/router/README.md