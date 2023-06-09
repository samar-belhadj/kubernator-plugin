import KubernetesComponentDefinition from 'src/models/KubernetesComponentDefinition';

describe('Test class: KubernetesComponentDefinition', () => {
  describe('Test constructor', () => {
    it('Check variable instantiation without any parameters in constructor', () => {
      const component = new KubernetesComponentDefinition();

      expect(component.apiVersion).toEqual(null);
    });

    it('Check passing empty object to constructor', () => {
      const component = new KubernetesComponentDefinition({});

      expect(component.apiVersion).toEqual(null);
    });

    it('Check passing props to constructor', () => {
      const component = new KubernetesComponentDefinition({
        apiVersion: 'v1',
      });

      expect(component.apiVersion).toEqual('v1');
    });
  });
});
