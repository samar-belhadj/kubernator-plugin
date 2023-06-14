import { ComponentDefinition } from 'leto-modelizer-plugin-core';

/**
 * Kubernetes component definition.
 */
class KubernetesComponentDefinition extends ComponentDefinition {
  /**
   * Default constructor.
   * @param {Object} [props] - Object that contains all properties to set.
   * @param {String} [props.apiVersion] - Kubernetes apiVersion (<apiGroup>/<version>).
   * @see ComponentDefinition
  */
  constructor(props = { apiVersion: "v1"}) {
    super(props);
    /**
     * Kubernetes apiVersion (<apiGroup>/<version>)
     * @type {String}
     * 
     */
    this.apiVersion = props.apiVersion;

  }
}

export default KubernetesComponentDefinition;
