import fs from 'fs';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import { DefaultData } from 'leto-modelizer-plugin-core';

export function getKubernetesMetadata(metadataName, metadataUrl) {
  const metadata = JSON.parse(fs.readFileSync(metadataUrl, 'utf8'));
  const terraformMetadata = new KubernetesMetadata(new DefaultData());
  terraformMetadata.providers = {};
  terraformMetadata.providers[metadataName] = metadata;
  return terraformMetadata;
}
