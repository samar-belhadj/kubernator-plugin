import KubernetesMetadata from 'src/metadata/KubernetesMetadata'
import DefaultData from 'leto-modelizer-plugin-core'

describe('Test class: KubernetesMetadata', () => {
  let metadata;

  beforeEach(() => {
    metadata = new KubernetesMetadata(/* mock the pluginData */);
  });

  describe('Test validate method', () => {
    it('should return true for valid metadata', () => {
      const isValid = metadata.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Test parse method', () => {
    beforeEach(() => {
      // Mock the metadata object
      const mockMetadata = {
        apiVersions: {
          'v1': [
            { attributes: [], type: 'ComponentA' },
            { attributes: [], type: 'ComponentB' }
          ],
          'v2': [
            { attributes: [], type: 'ComponentC' }
          ]
        }
      };

      // Mock the setChildrenTypes and getComponentDefinition methods
      metadata.setChildrenTypes = jest.fn();
      metadata.getComponentDefinition = jest.fn((apiVersion, component) => {
        return new KubernetesComponentDefinition({
          apiVersion,
          ...component,
          definedAttributes: []
        });
      });

      // Assign the mock metadata object
      metadata.metadata = mockMetadata;

      // Call the parse method
      metadata.parse();
    });

    it('should call setChildrenTypes method', () => {
      expect(metadata.setChildrenTypes).toHaveBeenCalled();
    });

    it('should set the component definitions', () => {
      const componentDefs = metadata.pluginData.definitions.components;
      expect(componentDefs.length).toBe(3);

      const types = componentDefs.map(def => def.type);
      expect(types).toContain('ComponentA');
      expect(types).toContain('ComponentB');
      expect(types).toContain('ComponentC');
    });
  });

  describe('Test getComponentDefinition method', () => {
    it('should return a KubernetesComponentDefinition with definedAttributes', () => {
      const apiVersion = 'v1';
      const component = {
        type: 'ComponentA',
        attributes: [
          { name: 'attr1' },
          { name: 'attr2' }
        ]
      };

      const componentDef = metadata.getComponentDefinition(apiVersion, component);
      expect(componentDef).toBeInstanceOf(KubernetesComponentDefinition);
      expect(componentDef.apiVersion).toBe(apiVersion);
      expect(componentDef.type).toBe(component.type);
      expect(componentDef.definedAttributes).toBeInstanceOf(Array);
      expect(componentDef.definedAttributes.length).toBe(2);
      expect(componentDef.definedAttributes[0]).toBeInstanceOf(ComponentAttributeDefinition);
      expect(componentDef.definedAttributes[1]).toBeInstanceOf(ComponentAttributeDefinition);
    });

    it('should include commonAttributes if apiVersion is not "others"', () => {
      const apiVersion = 'v1';
      const component = {
        type: 'ComponentA',
        attributes: []
      };

      const componentDef = metadata.getComponentDefinition(apiVersion, component);
      expect(componentDef.definedAttributes.length).toBeGreaterThan(0);
      expect(componentDef.definedAttributes).toContain(...metadata.commonAttributes);
    });
  });

  describe('Test getAttributeDefinition method', () => {
    it('should return a ComponentAttributeDefinition', () => {
      const attribute = {
        name: 'attr1',
        attributes: []
      };

      const attributeDef = metadata.getAttributeDefinition(attribute);
      expect(attributeDef).toBeInstanceOf(ComponentAttributeDefinition);
      expect(attributeDef.name).toBe(attribute.name);
      expect(attributeDef.definedAttributes).toBeInstanceOf(Array);
    });

    it('should set the expanded property', () => {
      const attribute = {
        name: 'attr1',
        expanded: true,
        attributes: []
      };

      const attributeDef = metadata.getAttributeDefinition(attribute);
      expect(attributeDef.expanded).toBe(true);
    });

    it('should format the displayName', () => {
      const attribute = {
        name: 'attr1'
      };

      const attributeDef = metadata.getAttributeDefinition(attribute);
      expect(attributeDef.displayName).toBeDefined();
      expect(attributeDef.displayName).not.toBe(attribute.name);
    });
  });

  describe('Test setChildrenTypes method', () => {
    it('should set childrenTypes for component definitions', () => {
      const componentDefs = [
        { type: 'ComponentA', parentTypes: ['ParentA', 'ParentB'] },
        { type: 'ComponentB', parentTypes: ['ParentA'] },
        { type: 'ComponentC', parentTypes: [] }
      ];

      metadata.setChildrenTypes(componentDefs);

      expect(componentDefs[0].childrenTypes).toEqual([]);
      expect(componentDefs[1].childrenTypes).toEqual([]);
      expect(componentDefs[2].childrenTypes).toBeUndefined();
    });
  });

  describe('Test formatDisplayName method', () => {
    it('should format the display name', () => {
      const cases = [
        { name: 'spec', expected: 'Specification' },
        { name: 'displayName', expected: 'Display Name' },
        { name: 'camelCase', expected: 'Camel Case' }
      ];

      cases.forEach(({ name, expected }) => {
        const formattedName = metadata.formatDisplayName(name);
        expect(formattedName).toBe(expected);
      });
    });
  });
});
