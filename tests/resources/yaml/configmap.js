import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();


const configMapDef = pluginData.definitions.components.find(({ type }) => type === 'ConfigMap');
const configMapMetadataDef = configMapDef.definedAttributes.find(({ name }) => name === 'metadata');
const configMapDataDef = configMapDef.definedAttributes.find(({ name }) => name === 'data');

export default [
new Component({
  id: 'test-configmap',
  name: 'test-configmap',
  definition: configMapDef,
  path: './configmap.yaml',
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: configMapMetadataDef,
      value: [
        new ComponentAttribute({
          name: 'name',
          type: 'String',
          value: 'test-configmap',
        }),
      ],
    }),
    new ComponentAttribute({
      name: 'data',
      type: 'Object',
      definition: configMapDataDef,
      value: [
        new ComponentAttribute({
          name: 'config.properties',
          type: 'String',
          value: 'key1=value1\nkey2=value2',
        }),
      ],
    }),
  ],
}),
];
