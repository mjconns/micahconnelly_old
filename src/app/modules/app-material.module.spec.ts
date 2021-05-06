import { AppMaterialModule } from './app-material.module';

describe('', () => {
  let appMaterialModule: AppMaterialModule;

  beforeEach(() => {
    appMaterialModule = new AppMaterialModule();
  });

  it('should create an instance', () => {
    expect(appMaterialModule).toBeTruthy();
  });
});
