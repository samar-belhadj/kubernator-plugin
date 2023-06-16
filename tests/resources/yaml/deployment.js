import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { Component, ComponentAttribute } from 'leto-modelizer-plugin-core';
import KubernetesData from '../../../src/models/KubernetesData';

const pluginData = new KubernetesData();
const metadata = new KubernetesMetadata(pluginData);
metadata.parse();

const deploymentDef = pluginData.definitions.components.find(({ type }) => type === 'Deployment');
const MetadataDef = deploymentDef.definedAttributes.find(({ name }) => name === 'metadata');
const deploymentSpecDef = deploymentDef.definedAttributes.find(({ name }) => name === 'spec');

const deploymentComponent = new Component({
    id: 'deployment',
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
                value: 'nginx',
              }),
            ],
          }),  
        ],
      }),
      new ComponentAttribute({
        name: 'spec',
        type: 'Object',
        definition: deploymentSpecDef,
        attributes: [
          new ComponentAttribute({
            name: 'replicas',
            type: 'Number',
            definition: deploymentSpecDef.definedAttributes.find(({ name }) => name === 'replicas'),
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
                    value: 'nginx',
                  }),
                ],
              }),  
            ],
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