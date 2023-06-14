import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute, DefaultData } from 'leto-modelizer-plugin-core';

const pluginData = new DefaultData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const deploymentDef = pluginData.definitions.components.find(({ type }) => type === 'Deployment');
const deploymentMetadataDef = deploymentDef.definedAttributes.find(({ name }) => name === 'metadata');
const deploymentSpecDef = deploymentDef.definedAttributes.find(({ name }) => name === 'spec');
const deploymentSelectorDef = deploymentSpecDef.definedAttributes.find(({ name }) => name === 'selector');

export default [
  new Component({
    id: 'deployment_1',
    name: 'deployment',
    definition: deploymentDef,
    path: './deployment.yml',
    attributes: [
      new ComponentAttribute({
        name: 'metadata',
        type: 'Object',
        definition: deploymentMetadataDef,
        value: {
          labels: {
            app: 'nginx',
          },
        },
      }),
      new ComponentAttribute({
        name: 'spec',
        type: 'Object',
        definition: deploymentSpecDef,
        value: {
          replicas: 3,
          selector: {
            matchLabels: {
              app: 'nginx',
            },
          },
          template: {
            metadata: {
              labels: {
                app: 'nginx',
              },
            },
            spec: {
              containers: [
                {
                  name: 'nginx',
                  image: 'nginx:1.14.2',
                  ports: [
                    {
                      containerPort: 80,
                    },
                  ],
                },
              ],
            },
          },
        },
      }),
    ],
  }),
];
