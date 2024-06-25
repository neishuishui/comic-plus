import { defineComponent, reactive, h, Transition } from "vue";
const TransitionCollapse = defineComponent({
  name: "CuTransitionCollapse",
  setup(_, { slots }) {
    const oldStyle = reactive({
      overflow: "",
      paddingTop: "",
      paddingBottom: ""
    });
    function reast(el) {
      el.style.overflow = oldStyle.overflow;
      el.style.maxHeight = "";
      el.style.paddingTop = oldStyle.paddingTop;
      el.style.paddingBottom = oldStyle.paddingBottom;
    }
    function beforeEnter(el) {
      oldStyle.overflow = el.style.overflow;
      oldStyle.paddingTop = el.style.paddingTop;
      oldStyle.paddingBottom = el.style.paddingBottom;
      el.style.maxHeight = "0PX";
      el.style.paddingTop = "0PX";
      el.style.paddingBottom = "0PX";
    }
    function enter(el) {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = "0PX";
      }
      el.style.paddingTop = oldStyle.paddingTop;
      el.style.paddingBottom = oldStyle.paddingBottom;
      el.style.overflow = "hidden";
    }
    function beforeLeave(el) {
      oldStyle.overflow = el.style.overflow;
      oldStyle.paddingTop = el.style.paddingTop;
      oldStyle.paddingBottom = el.style.paddingBottom;
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    }
    function leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = "0PX";
        el.style.paddingTop = "0PX";
        el.style.paddingBottom = "0PX";
      }
    }
    function afterEnter(el) {
      reast(el);
    }
    function afterLeave(el) {
      reast(el);
    }
    return () => {
      return h(
        Transition,
        {
          name: "cu-transition-collapse",
          onBeforeEnter: beforeEnter,
          onBeforeLeave: beforeLeave,
          onEnter: enter,
          onLeave: leave,
          onAfterEnter: afterEnter,
          onAfterLeave: afterLeave
        },
        slots
      );
    };
  }
});
export {
  TransitionCollapse as default
};
