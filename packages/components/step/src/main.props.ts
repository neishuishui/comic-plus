import type { ExtractPropTypes, PropType } from 'vue';
import type { ComicDir } from '../../../utils';

export const stepProps = {
  direction: {
    type: String as PropType<ComicDir>,
    default: 'horizontal'
  },
  active: Number,
  center: Boolean,
  activeColor: String
} as const;

export type StepProps = ExtractPropTypes<typeof stepProps>;
