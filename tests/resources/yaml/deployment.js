import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const podDef = pluginData.definitions.components.find(({ type }) => type === 'Pod');
const podMetadataDef = podDef.definedAttributes.find(({ name }) => name === 'metadata');
const podSpecDef = podDef.definedAttributes.find(({ name }) => name === 'parentDeployment');

const deploymentDef = pluginData.definitions.components.find(({ type }) => type === 'Deployment');
const MetadataDef = deploymentDef.definedAttributes.find(({ name }) => name === 'metadata');
const deploymentSpecDef = deploymentDef.definedAttributes.find(({ name }) => name === 'spec');

const podComponent = new Component({
  id: 'pod',
  path: null,
  definition: podDef,
  attributes: [
    new ComponentAttribute({
      name: 'metadata',
      type: 'Object',
      definition: podMetadataDef,
      value: [
        new ComponentAttribute({
          name: 'labels',
          type: 'Object',
          definition: podMetadataDef.definedAttributes.find(({ name }) => name === 'labels'), 
          value: [
            new ComponentAttribute({
              name: 'app.kubernetes.io/name',
              type: 'String',
              definition: podMetadataDef.definedAttributes.find(
                ({ name }) => name === 'labels',
              ).definedAttributes.find(
                ({ name }) => name === 'app.kubernetes.io/name',
              ),
              value: 'pod',
            }),
          ],
        }),  
      ],
    }),
    new ComponentAttribute({
      name: 'parentDeployment',
      type: 'String',
      definition: podSpecDef,
      value : 'nginx-deployment',
    }),
  ],
});


const deploymentComponent = new Component({
    id: 'nginx-deployment',
    path: './deployment.yml',
    definition: deploymentDef,
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
                value: 'nginx-deployment',
              }),
            ],
          }),  
        ],
      }),
      new ComponentAttribute({
      name: 'spec',
      type: 'Object',
      containerRef: 'Deployment',
      definition: deploymentSpecDef,
      value: [],
    }),  
    ],
});
pluginData.components.push(podComponent);
pluginData.components.push(deploymentComponent);

export default pluginData;
