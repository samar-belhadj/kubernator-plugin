import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';


const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const statefulSetDef = pluginData.definitions.components.find(({ type }) => type === 'StatefulSet');
const MetadataDef = statefulSetDef.definedAttributes.find(({ name }) => name === 'metadata');
const statefulSetSpecDef = statefulSetDef.definedAttributes.find(({ name }) => name === 'spec');

const statefulsetComponent = new Component({
  id: 'stateful-set',
  path: './statefulset.yaml',
  definition: statefulSetDef,
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: MetadataDef,
      value: [
        new ComponentAttribute({
          name: 'labels',
          type: 'Object',
          definition: MetadataDef.definedAttributes.find(({ name }) => name === 'labels'), 
          value: [
            new ComponentAttribute({
              name: 'app.kubernetes.io/name',
              type: 'String',
              definition: MetadataDef.definedAttributes.find(
                ({ name }) => name === 'labels',
              ).definedAttributes.find(
                ({ name }) => name === 'app.kubernetes.io/name',
              ),
              value: 'stateful-set',
            }),
          ],
        }),  
      ],
    }),
    new ComponentAttribute({
      name: 'spec',
      type: 'Object',
      definition: statefulSetSpecDef,
      value:[],
      
        }),
    
  ],
});

pluginData.components.push(statefulsetComponent);

export default pluginData;
