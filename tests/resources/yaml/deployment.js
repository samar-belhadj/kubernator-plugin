import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const deploymentDef = pluginData.definitions.components.find(({ type }) => type === 'Deployment');
const deploymentMetadataDef = deploymentDef.definedAttributes.find(({ name }) => name === 'metadata');
const deploymentSpecDef = deploymentDef.definedAttributes.find(({ name }) => name === 'spec');

export default [
  new Component({
    id: 'deployment',
    definition: deploymentDef,
    path: './deployment.yml',
    attributes: [
      new ComponentAttribute({
        name: 'metadata',
        type: 'Object',
        definition: deploymentMetadataDef,
        value: {
          name: 'nginx-deployment',
          labels: {
            'app.kubernetes.io/name': 'nginx',
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
              'app.kubernetes.io/name': 'nginx',
            },
          },
          template: {
            metadata: {
              name: 'nginx',
              labels: {
                'app.kubernetes.io/name': 'nginx',
              },
            },
            spec: {
              containers: [
                {
                  name: 'nginx-c',
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