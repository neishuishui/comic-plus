import { reactive, Plugin, App, shallowRef } from 'vue';
import { Config } from './utils';
import components from './components';
import CuMessageBox from './components/message-box';
import { preview } from './components/preview-image';
import { CuLoading, vLoading, useLoading } from './components/loading';
import { vTooltip, useTooltip } from './components/tooltip';
import { useInfiniteScroll, vInfiniteScroll } from './components/infinite-scroll';
import { CuLoadingbar } from './components/loadingbar';
import icons from './icons';

const plugin = {
  install(app: App, config: Config) {
    components.forEach((item) => app.use(item));

    app.config.globalProperties.$alert = CuMessageBox.alert;
    app.config.globalProperties.$confirm = CuMessageBox.confirm;
    app.config.globalProperties.$message = CuMessageBox.message;
    app.config.globalProperties.$notice = CuMessageBox.notice;

    app.config.globalProperties.$preview = preview;
    app.config.globalProperties.$loading = CuLoading;

    app.config.globalProperties.$loadingbar = CuLoadingbar;

    app.use(vLoading);
    app.use(vTooltip);
    app.use(vInfiniteScroll);

    useComicConfig(config);
  }
} as Plugin;

const installIcons = (app: App, prefix?: string) => {
  icons.forEach((icon) => {
    app.component(prefix ? prefix + icon.name : icon.name, icon);
  });
};

var assignConfig = reactive({}) as Config;

const useComicConfig = (config: Config): void => {
  const recordLoadingRender = config?.loadingRender || null;
  assignConfig = reactive(Object.assign(assignConfig, config));
  assignConfig.loadingRender = shallowRef(recordLoadingRender); //对象合并导致Component类型的props出问题 所以这里重新手动赋值
  window['$COMIC'] = assignConfig;
};

export default plugin;

export * from './components';
export * from './icons';

export {
  CuMessageBox,
  CuLoading,
  vLoading,
  vTooltip,
  vInfiniteScroll,
  CuLoadingbar,
  preview,
  useLoading,
  useComicConfig,
  useTooltip,
  useInfiniteScroll,
  installIcons
};
