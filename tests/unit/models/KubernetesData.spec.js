import KubernetesData from 'src/models/KubernetesData';
import {
  DefaultData,
  ComponentDefinition,
} from 'leto-modelizer-plugin-core';

describe('Test class: KubernetesData', () => {
  describe('Test addComponent method', () => {
    it('Should add a component with default values', () => {
      const data = new KubernetesData();
      const definition = new ComponentDefinition();
      const componentId = data.addComponent(definition);

      expect(data.components.length).toEqual(1);
      expect(data.components[0].id).toEqual(componentId);
      expect(data.components[0].definition).toEqual(definition);
      expect(data.components[0].path).toEqual(`${componentId}.yaml`);
      expect(data.components[0].attributes.length).toEqual(0);
    });

    it('Should add a component with custom values', () => {
      const data = new KubernetesData();
      const definition = new ComponentDefinition();
      const folder = 'yaml/';
      const fileName = 'myComponent';
      const componentId = data.addComponent(definition, folder, fileName);

      expect(data.components.length).toEqual(1);
      expect(data.components[0].id).toEqual(componentId);
      expect(data.components[0].definition).toEqual(definition);
      expect(data.components[0].path).toEqual(`${folder}${componentId}.yaml`);
      expect(data.components[0].attributes.length).toEqual(0);
    });

    it('Should add a component with additional attributes', () => {
      const data = new KubernetesData();
      const attributeDefinition = {
        name: 'isInitContainer', 
        type: 'boolean'
      };
      const definition = new ComponentDefinition({ type: 'Container', definedAttributes: [attributeDefinition] });
      const componentId = data.addComponent(definition);
    
      expect(data.components.length).toEqual(1);
      expect(data.components[0].id).toEqual(componentId);
      expect(data.components[0].definition).toEqual(definition);
      expect(data.components[0].path).toEqual(`${componentId}.yaml`);
      expect(data.components[0].attributes.length).toEqual(1);
      expect(data.components[0].attributes[0].name).toEqual('isInitContainer');
      expect(data.components[0].attributes[0].value).toEqual(false);
      expect(data.components[0].attributes[0].type).toEqual(definition.definedAttributes[0].type);
      expect(data.components[0].attributes[0].definition).toEqual(definition.definedAttributes[0]);
    });
    

    it('Should add a component with unsupported type', () => {
      const data = new KubernetesData();
      const definition = new ComponentDefinition({ type: 'Unsupported' });
      const componentId = data.addComponent(definition);

      expect(data.components.length).toEqual(1);
      expect(data.components[0].id).toEqual(componentId);
      expect(data.components[0].definition).toEqual(definition);
      expect(data.components[0].path).toEqual(`${componentId}.yaml`);
      expect(data.components[0].attributes.length).toEqual(0);
    });
  });

  describe('Test __createAttribute method', () => {
    it('Should create a component attribute', () => {
      const data = new KubernetesData();
      const definition = new ComponentDefinition();
      const attributeDefinition = {
        name: 'attributeName',
        type: 'attributeType',
      };
      definition.definedAttributes.push(attributeDefinition);

      const attribute = data.__createAttribute(
        'attributeName',
        'attributeValue',
        definition
      );

      expect(attribute.name).toEqual('attributeName');
      expect(attribute.value).toEqual('attributeValue');
      expect(attribute.type).toEqual('attributeType');
      expect(attribute.definition).toEqual(attributeDefinition);
    });

    it('Should return null if attribute name is not found', () => {
      const data = new KubernetesData();
      const definition = new ComponentDefinition();

      const attribute = data.__createAttribute(
        'nonExistingAttribute',
        'attributeValue',
        definition
      );
      expect(attribute).toBeNull();
    });
  });

  describe('Test class inheritance', () => {
    it('Should inherit from DefaultData', () => {
      const data = new KubernetesData();
      expect(data instanceof DefaultData).toBe(true);
    });
  });
});
