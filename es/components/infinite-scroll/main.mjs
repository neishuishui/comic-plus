import { useEventListener } from "@vueuse/core";
import "vue";
import { isFunction } from "../../utils/typescript.mjs";
import "../../utils/config.mjs";
import { throttle } from "../../utils/tools.mjs";
const SCOPE = "__INFINTE_SCROLL__";
const DEFAULT_DELAY = 200;
const DEFAULT_DISTANCE = 0;
const attributes = {
  delay: {
    type: Number,
    default: DEFAULT_DELAY
  },
  distance: {
    type: Number,
    default: DEFAULT_DISTANCE
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
};
function getInfiniteScrollOption(el, instance) {
  return Object.entries(attributes).reduce((attrobj, [name, option]) => {
    const { type, default: defaultValue } = option;
    const attrVal = el.getAttribute(`infinite-scroll-${name}`);
    let value = attrVal ?? (instance == null ? void 0 : instance[name]) ?? defaultValue;
    value = value === "false" ? false : value;
    value = type(value);
    attrobj[name] = Number.isNaN(value) ? defaultValue : value;
    return attrobj;
  }, {});
}
function handleScroll(el, cb) {
  const { distance, disabled } = el[SCOPE];
  let isBitBottom = el.scrollTop + el.offsetHeight + distance >= el.scrollHeight;
  if (isBitBottom) {
    !disabled && cb();
  }
}
const useInfiniteScroll = function() {
  return {
    mounted(el, binding) {
      const instance = getInfiniteScrollOption(el, el[SCOPE]);
      el[SCOPE] = instance;
      const cb = binding.value;
      if (!isFunction(cb)) {
        throw new Error("The parameter of the InfiniteScroll instruction must be a function");
      }
      const throttledFn = throttle(handleScroll.bind(null, el, cb), instance.delay);
      useEventListener(el, "scroll", throttledFn);
      if (instance.immediate) {
        cb();
      }
    },
    updated(el) {
      const options = getInfiniteScrollOption(el, el[SCOPE]);
      el[SCOPE] = options;
    },
    unmounted(el) {
      el[SCOPE] && delete el[SCOPE];
    }
  };
};
const vInfiniteScroll = {
  install: function(app) {
    app.directive("infinite-scroll", useInfiniteScroll());
  }
};
export {
  useInfiniteScroll,
  vInfiniteScroll
};
