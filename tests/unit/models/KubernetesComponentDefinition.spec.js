import KubernetesComponentDefinition from 'src/models/KubernetesComponentDefinition';

describe('Test class: KubernetesComponentDefinition', () => {
  describe('Test constructor', () => {
    it('Check variable instantiation without any parameters in constructor', () => {
      const component = new KubernetesComponentDefinition();

      expect(component.apiVersion).toEqual(false);
    });

    it('Check passing empty object to constructor', () => {
      const component = new KubernetesComponentDefinition({});

      expect(component.apiVersion).toEqual(false);
    });

    it('Check passing props to constructor', () => {
      const component = new KubernetesComponentDefinition({
        apiVersion: true,
      });

      expect(component.apiVersion).toEqual(true);
    });
  });
});
