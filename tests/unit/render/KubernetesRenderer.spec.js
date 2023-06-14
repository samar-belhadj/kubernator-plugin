import KubernetesRenderer from 'src/render/KubernetesRenderer';
import { DefaultData, FileInput } from 'leto-modelizer-plugin-core';
import fs from 'fs';
import KubernetesParser from 'src/parser/KubernetesParser';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';

describe('Test KubernetesMetadata', () => {
    describe('Test method: render', () => {
      it('Should render service', () => {
        const pluginData = new DefaultData();
        const metadata = new KubernetesMetadata(pluginData);
        const parser = new KubernetesParser(pluginData);
        const render = new KubernetesRenderer(pluginData);
        const fileToParse = new FileInput({
          path: './service.yaml',
          content: fs.readFileSync('tests/resources/yaml/service.yaml', 'utf8'),
        });
  
        metadata.parse();
        parser.parse([fileToParse]);
  
        const [file] = render.render([]);
  
        expect(file).toEqual(fileToParse);
      });
    });
  });
  