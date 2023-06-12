import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute, DefaultData } from 'leto-modelizer-plugin-core';

const pluginData = new DefaultData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const configMapDef = pluginData.definitions.components.find(({ type }) => type === 'ConfigMap');
const configMapMetadataDef = configMapDef.definedAttributes.find(({ name }) => name === 'metadata');
const configMapDataDef = configMapDef.definedAttributes.find(({ name }) => name === 'data');

const configMap = new Component({
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
});

export default configMap;
