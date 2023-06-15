import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const serviceDef = pluginData.definitions.components.find(({ type }) => type === 'Service');
const serviceMetadataDef = serviceDef.definedAttributes.find(({ name }) => name === 'metadata');
const serviceSpecDef = serviceDef.definedAttributes.find(({ name }) => name === 'spec');
const serviceSelectorDef = serviceSpecDef.definedAttributes.find(({ name }) => name === 'selector');

const serviceComponent = new Component({
  id: 'test-service',
  definition: {
    apiVersion: 'v1',
    kind: 'Service',
  },
  path: './service.yaml',
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: serviceMetadataDef,
      value: new ComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'test-service',
      }),
      attributes: [
        new ComponentAttribute({
          name: 'labels',
          type: 'Object',
          value: new ComponentAttribute({
            name: 'app.kubernetes.io/name',
            type: 'String',
            value: 'test-service',
          }),
        }),
      ],
    }),
    new ComponentAttribute({
      name: 'spec',
      type: 'Object',
      definition: serviceSpecDef,
      value: new ComponentAttribute({
        name: 'selector',
        type: 'Object',
        definition: serviceSelectorDef,
        value: new ComponentAttribute({
          name: 'app',
          type: 'String',
          value: 'test-app',
        }),
      }),
      attributes: [
        new ComponentAttribute({
          name: 'type',
          type: 'String',
          value: 'NodePort',
        }),
        new ComponentAttribute({
          name: 'ports',
          type: 'Array',
          value: [
            new ComponentAttribute({
              name: '',
              type: 'Object',
              attributes: [
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
                  type: 'String',
                  value: '80',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

export default serviceComponent;
