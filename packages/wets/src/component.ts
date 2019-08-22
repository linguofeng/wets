/// <reference types="wets-types/wx/component" />
import { PageConfig } from './page';

/**
 * @desc 基本上组件不需要配置这些东西，但是我们是可以使用component去配置生成对应的page的
 */
export interface ComponentConfig extends PageConfig {
  component: boolean;
}

export class Component<TypeProps = any, TypeData = any>
  implements ComponentInstance<TypeProps, TypeData> {
  /**
   * @desc 基本上就是配置是否是组件
   */
  static Conf(config?: ComponentConfig) {
    return (target: { new (arg: any): Component }) => {};
  }

  public initialData: { [key: string]: any };

  public props: TypeProps;

  public context: any;

  data: TypeData;

  setData: (
    data: { [key in keyof TypeData]?: TypeData[key] },
    callback?: () => void,
  ) => void;

  public render?(): JSX.Element;
}
