import { getKubernatorMetadata } from 'tests/resources/metadata/getKubernatorMetadata';

describe('Test KubernatorMetadata', () => {
  describe('Test methods', () => {
    describe('Test method: validate', () => {
      it('Should return true on valid metadata', () => {
        const metadata = getComposatorMetadata('validMetadata', 'tests/resources/metadata/valid.json');
        expect(metadata.validate()).toBeTruthy();
      });
      it('Should return false on invalid metadata', () => {
        const metadata = getComposatorMetadata('invalidMetadata', 'tests/resources/metadata/invalid.json');
        expect(metadata.validate()).toBeFalsy();
      });
    });
  });
});