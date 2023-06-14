import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const serviceDef = pluginData.definitions.components.find(({ type }) => type === 'Service');
const serviceMetadataDef = serviceDef.definedAttributes.find(({ name }) => name === 'metadata');
const serviceSpecDef = serviceDef.definedAttributes.find(({ name }) => name === 'spec');
const serviceSelectorDef = serviceSpecDef.definedAttributes.find(({ name }) => name === 'selector');

const serviceComponent = new Component({
  id: 'test-service',
  definition: serviceDef,
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
    }),
  ],
});

export default serviceComponent;