import { DefaultConfiguration, Tag } from 'leto-modelizer-plugin-core';
import syntax from 'src/configuration/syntax';
/**
 * Kubernetes configuration.
 */
class KubernetesConfiguration extends DefaultConfiguration {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   */
  constructor(props) {
    super({
      ...props,
      editor: {
        ...props.editor,
        syntax,
      },
      tags: [
        new Tag({ type: 'language', value: 'Kubernetes' }),
        new Tag({ type: 'category', value: 'Infrastructure' }),
        new Tag({ type: 'category', value: 'Containers' }),
      ],
    });
  }
}

export default KubernetesConfiguration;
