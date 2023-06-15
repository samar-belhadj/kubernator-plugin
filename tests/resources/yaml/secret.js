import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const secretDef = pluginData.definitions.components.find(({ type }) => type === 'Secret');
const secretMetadataDef = secretDef.definedAttributes.find(({ name }) => name === 'metadata');
const secretDataDef = secretDef.definedAttributes.find(({ name }) => name === 'data');

export default [
new Component({
  id: 'test-secret',
  name: 'test-secret',
  definition: secretDef,
  path: './secret.yaml',
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: secretMetadataDef,
      value: [
        new ComponentAttribute({
          name: 'name',
          type: 'String',
          value: 'test-secret',
        }),
      ],
    }),
    new ComponentAttribute({
      name: 'type',
      type: 'String',
      definition: secretDef.definedAttributes.find(({ name }) => name === 'type'),
      value: 'Opaque',
    }),
    new ComponentAttribute({
      name: 'data',
      type: 'Object',
      definition: secretDataDef,
      value: [
        new ComponentAttribute({
          name: 'username',
          type: 'String',
          value: 'admin',
        }),
        new ComponentAttribute({
          name: 'password',
          type: 'String',
          value: 'password123',
        }),
      ],
    }),
  ],
}),
];
