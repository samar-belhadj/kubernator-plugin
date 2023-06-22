import fs from 'fs';
import KubernetesMetadata from 'src/metadata/KubernetesMetadata';
import KubernetesData from 'src/models/KubernetesData';

/**
 * Convert a JSON component definition object to a KubernetesComponentDefinition.
 * @param {string} metadataName - metadata name.
 * @param {string} metadataUrl - path to metadata JSON file.
 * @returns {KubernetesMetadata} KubernetesMetadata instance containing metadata
 * from specified url.
 */
export function getKubernetorMetadata(metadataName, metadataUrl) {
  const metadata = JSON.parse(fs.readFileSync(metadataUrl, 'utf8'));
  const kubernetesMetadata = new KubernetesMetadata(new KubernetesData());
  kubernetesMetadata.jsonComponents = metadata;
  return kubernetesMetadata;
}