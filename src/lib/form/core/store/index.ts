import { register, createReduxStore } from "@wordpress/data";

import type { DispatchFromMap, SelectFromMap } from "../../types";

import * as actions from "./actions";
import { STORE_KEY } from "./constants";
import reducer from "./reducer";
import type { State } from "./reducer";
import * as selectors from "./selectors";

const store = createReduxStore<State>(STORE_KEY, {
  actions,
  selectors,
  reducer,
});
export default store;
register(store);
declare module "@wordpress/data" {
  function dispatch(key: typeof STORE_KEY): DispatchFromMap<typeof actions>;
  function select(key: typeof STORE_KEY): SelectFromMap<typeof selectors>;
}
