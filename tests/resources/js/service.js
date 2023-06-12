import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute, DefaultData } from 'leto-modelizer-plugin-core';

const pluginData = new DefaultData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const serviceDef = pluginData.definitions.components.find(({ type }) => type === 'Service');
const serviceMetadataDef = serviceDef.definedAttributes.find(({ name }) => name === 'metadata');
const serviceSpecDef = serviceDef.definedAttributes.find(({ name }) => name === 'spec');
const serviceSelectorDef = serviceSpecDef.definedAttributes.find(({ name }) => name === 'selector');

const service = new Component({
  id: 'test-service',
  name: 'test-service',
  definition: serviceDef,
  path: './service.yaml',
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: serviceMetadataDef,
      value: [
        new ComponentAttribute({
          name: 'name',
          type: 'String',
          value: 'test-service',
        }),
      ],
    }),
    new ComponentAttribute({
      name: 'spec',
      type: 'Object',
      definition: serviceSpecDef,
      value: [
        new ComponentAttribute({
          name: 'selector',
          type: 'Object',
          definition: serviceSelectorDef,
          value: [
            new ComponentAttribute({
              name: 'app',
              type: 'String',
              value: 'test-app',
            }),
          ],
        }),
        new ComponentAttribute({
          name: 'ports',
          type: 'Array',
          definition: serviceSpecDef.definedAttributes.find(({ name }) => name === 'ports'),
          value: [
            new ComponentAttribute({
              name: '0',
              type: 'Object',
              value: [
                new ComponentAttribute({
                  name: 'protocol',
                  type: 'String',
                  value: 'TCP',
                }),
                new ComponentAttribute({
                  name: 'port',
                  type: 'Number',
                  value: 80,
                }),
                new ComponentAttribute({
                  name: 'targetPort',
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
});

export default service;
