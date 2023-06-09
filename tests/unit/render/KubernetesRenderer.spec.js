
import KubernetesRender from 'src/render/KubernetesRenderer';
import fs from 'fs';
import KubernetesParser from 'src/parser/KubernetesParser';
import {
    Component,
    ComponentAttribute,
    ComponentAttributeDefinition,
    DefaultData,
    FileInput,
  } from 'leto-modelizer-plugin-core';
import KubernetesComponentDefinition from 'src/models/KubernetesComponentDefinition';
import { getKubernetesMetadata } from 'tests/resources/utils';


describe('Test KubernetesRenderer', () => {
    it('Test constructor', () => {
      expect(new KubernetesRender().template).not.toBeNull();
    });