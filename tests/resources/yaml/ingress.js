import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute, DefaultData } from 'leto-modelizer-plugin-core';

const pluginData = new DefaultData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const ingressDef = pluginData.definitions.components.find(({ type }) => type === 'Ingress');
const ingressMetadataDef = ingressDef.definedAttributes.find(({ name }) => name === 'metadata');
const ingressSpecDef = ingressDef.definedAttributes.find(({ name }) => name === 'spec');


export default [

new Component({
  id: 'test-ingress',
  name: 'test-ingress',
  definition: ingressDef,
  path: './ingress.yaml',
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: ingressMetadataDef,
      value: [
        new ComponentAttribute({
          name: 'name',
          type: 'String',
          value: 'test-ingress',
        }),
      ],
    }),
    new ComponentAttribute({
      name: 'spec',
      type: 'Object',
      definition: ingressSpecDef,
      value: [
        new ComponentAttribute({
          name: 'rules',
          type: 'Array',
          definition: ingressSpecDef.definedAttributes.find(({ name }) => name === 'rules'),
          value: [
            new ComponentAttribute({
              name: '0',
              type: 'Object',
              value: [
                new ComponentAttribute({
                  name: 'host',
                  type: 'String',
                  value: 'example.com',
                }),
                new ComponentAttribute({
                  name: 'http',
                  type: 'Object',
                  value: [
                    new ComponentAttribute({
                      name: 'paths',
                      type: 'Array',
                      value: [
                        new ComponentAttribute({
                          name: '0',
                          type: 'Object',
                          value: [
                            new ComponentAttribute({
                              name: 'path',
                              type: 'String',
                              value: '/',
                            }),
                            new ComponentAttribute({
                              name: 'backend',
                              type: 'Object',
                              value: [
                                new ComponentAttribute({
                                  name: 'serviceName',
                                  type: 'String',
                                  value: 'test-service',
                                }),
                                new ComponentAttribute({
                                  name: 'servicePort',
                                  type: 'Number',
                                  value: 80,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
}),
];
