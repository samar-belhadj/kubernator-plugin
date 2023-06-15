import fs from 'fs';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import KubernetesData from '../../../src/models/KubernetesData';
import KubernetesParser from 'src/parser/KubernetesParser';
import { FileInput, FileInformation, DefaultData } from 'leto-modelizer-plugin-core';
import serviceComponent from 'tests/resources/yaml/service';


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



    it('should parse a valid YAML file and return valid components', () => {
      const pluginData = new KubernetesData();
      const metadata = new KubernetesMetadata(pluginData);
      metadata.parse();

      const parser = new KubernetesParser(pluginData);
      const file = new FileInput({
        path: './service.yaml',
        content: fs.readFileSync('tests/resources/yaml/service.yaml', 'utf8'),
      });

      parser.parse([file]);

      console.log(serviceComponent.attributes);

      expect(parser.pluginData.components[0].attributes).toEqual(serviceComponent.attributes);
    });
  });
});
