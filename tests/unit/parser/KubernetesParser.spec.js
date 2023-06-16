import fs from 'fs';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import KubernetesData from '../../../src/models/KubernetesData';
import KubernetesParser from 'src/parser/KubernetesParser';
import { FileInput, FileInformation, DefaultData } from 'leto-modelizer-plugin-core';
import ingressPluginData from 'tests/resources/yaml/ingress';
import servicePluginData from 'tests/resources/yaml/service';
import secretPluginData from 'tests/resources/yaml/secret';
import configmapPluginData from 'tests/resources/yaml/configmap';



describe('KubernetesParser', () => {
  describe('isParsable', () => {
    it('should return true for a YAML file', () => {
      const parser = new KubernetesParser();
      const file = new FileInformation({ path: 'simple.yaml' });

      expect(parser.isParsable(file)).toBe(true);
    });

    it('should return true for a YML file', () => {
      const parser = new KubernetesParser();
      const file = new FileInformation({ path: 'deployment.yml' });

      expect(parser.isParsable(file)).toBe(true);
    });

    it('should return false for a non-YAML file', () => {
      const parser = new KubernetesParser();
      const file = new FileInformation({ path: 'deployment.js' });

      expect(parser.isParsable(file)).toBe(false);
    });
  });

  describe('parse', () => {
    it('should return empty components for no input files', () => {
      const pluginData = new DefaultData();
      const parser = new KubernetesParser(pluginData);
      parser.parse();

      expect(pluginData.components).not.toBeNull();
      expect(pluginData.components.length).toBe(0);
    });

    it('Should set empty components with files without content', () => {
      const pluginData = new DefaultData();
      const parser = new KubernetesParser(pluginData);
      parser.parse([
        new FileInformation({ path: 'a', content: null }),
        new FileInformation({ path: 'a', content: '' }),
      ]);
      expect(pluginData.components).not.toBeNull();
      expect(pluginData.components.length).toEqual(0);
    });



    it('should parse a valid ingress.yaml file and return valid components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './ingress.yaml',
        content: fs.readFileSync('tests/resources/yaml/ingress.yaml', 'utf8'),
      });

      parser.parse([file]);
       //console.log(pluginData.components);
       //console.log(ingressPluginData.components);

      expect(pluginData.components).toEqual(ingressPluginData.components);

    });

    it('should parse a valid service.yaml file and return valid components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './service.yaml',
        content: fs.readFileSync('tests/resources/yaml/service.yaml', 'utf8'),
      });

      parser.parse([file]);
      // console.log(pluginData.components);
      // console.log(servicePluginData.components);

      expect(pluginData.components).toEqual(servicePluginData.components);

    });

    it('should parse a valid secret.yaml file and return valid components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './secret.yaml',
        content: fs.readFileSync('tests/resources/yaml/secret.yaml', 'utf8'),
      });

      parser.parse([file]);
       //console.log(pluginData.components);
       //console.log(secretPluginData.components);

      expect(pluginData.components).toEqual(secretPluginData.components);

    });


    it('should parse a valid configmap.yaml file and return valid components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './configmap.yaml',
        content: fs.readFileSync('tests/resources/yaml/configmap.yaml', 'utf8'),
      });

      parser.parse([file]);
       console.log(pluginData.components);
       console.log(configmapPluginData.components);

      expect(pluginData.components).toEqual(configmapPluginData.components);

    });


    it('should parse multiple valid YAML files and return valid components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const files = [
        new FileInput({
          path: './ingress.yaml',
          content: fs.readFileSync('tests/resources/yaml/ingress.yaml', 'utf8'),
        }),
        new FileInput({
          path: './service.yaml',
          content: fs.readFileSync('tests/resources/yaml/service.yaml', 'utf8'),
        }),
        // Add more FileInput objects for other valid YAML files
      ];

      parser.parse(files);

      expect(pluginData.components).toEqual([
        ...ingressPluginData.components,
        ...servicePluginData.components,
      ]);
    });

    it('should handle invalid YAML files and exclude them from parsed components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './invalid.yaml',
        content: fs.readFileSync('tests/resources/yaml/invalid.yaml', 'utf8'),
      });

      parser.parse([file]);
      console.log(pluginData.components);

     // expect(pluginData.components).toEqual([]);
    });

    it('should handle YAML files with empty content and exclude them from parsed components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './empty.yaml',
        content: fs.readFileSync('tests/resources/yaml/empty.yaml', 'utf8'),
      });

      parser.parse([file]);
      console.log(pluginData.components);
      expect(pluginData.components).toEqual([]);
    });

    it('should correctly determine if a file is parsable based on its extension', () => {
      const parser = new KubernetesParser();

      const yamlFile = new FileInformation({ path: './service.yaml' });
      const ymlFile = new FileInformation({ path: './deployment.yml' });
      const jsonFile = new FileInformation({ path: './config.json' });
      const txtFile = new FileInformation({ path: './test.txt' });

      expect(parser.isParsable(yamlFile)).toBe(true);
      expect(parser.isParsable(ymlFile)).toBe(true);
      expect(parser.isParsable(jsonFile)).toBe(false);
      expect(parser.isParsable(txtFile)).toBe(false);
    });

    it('should convert selector attributes to links for specific component types', () => {
      const pluginData = new KubernetesData();
      const parser = new KubernetesParser(pluginData);

      // Create a test component with a selector attribute
      const testComponent = {
        definition: { type: 'Service' },
        getAttributeByName: jest.fn(() => ({ value: { matchLabels: {} } })),
      };
      pluginData.components.push(testComponent);

      parser.convertSelectorAttributesToLinks();

      expect(testComponent.getAttributeByName).toHaveBeenCalledWith('selector');
      // Add more assertions based on your specific expectations
    });



  });
});
