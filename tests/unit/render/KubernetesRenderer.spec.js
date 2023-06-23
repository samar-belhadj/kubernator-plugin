import KubernetesRenderer from 'src/render/KubernetesRenderer';
import configMap from 'tests/resources/yaml/configmap';
import deploy from 'tests/resources/yaml/deployment_test';
import service from 'tests/resources/yaml/service';
import pod from 'tests/resources/yaml/pod';
import cronjob from 'tests/resources/yaml/cronjob';
import pvc from 'tests/resources/yaml/pvc';
import secret from 'tests/resources/yaml/secret';




describe('KubernetesRenderer', () => {
  let rendererDep;
  let rendrerService;
  let renderPod;
  let renderCronJob ;
  let renderconfigMap ;
  let renderpvc ;
  let rendersecret ;


  beforeEach(() => {
    rendererDep = new KubernetesRenderer(deploy);
    rendrerService = new KubernetesRenderer(service);
    renderPod = new KubernetesRenderer(pod);
    renderCronJob = new KubernetesRenderer(cronjob);
    renderconfigMap = new KubernetesRenderer(configMap);
    renderpvc = new KubernetesRenderer(pvc);
    rendersecret = new KubernetesRenderer(secret);



  });


  it('should render deployment files correctly', () => {
    const files = rendererDep.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./deployment_test.yaml');
    // Add more assertions for the file content if needed
  });

  it('should render service files correctly', () => {
    const files = rendrerService.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./service.yaml');
    // Add more assertions for the file content if needed
  });

  it('should render pod files correctly', () => {
    const files = renderPod.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./pod.yaml');
    // Add more assertions for the file content if needed
  });
  it('should render cronJob files correctly', () => {
    const files = renderCronJob.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./cronjob.yaml');
    // Add more assertions for the file content if needed
  });

  it('should render configMap files correctly', () => {
    const files = renderconfigMap.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./configmap.yaml');
    // Add more assertions for the file content if needed
  });

  it('should render pvc files correctly', () => {
    const files = renderpvc.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./pvc.yaml');
    // Add more assertions for the file content if needed
  });
  it('should render secret files correctly', () => {
    const files = rendersecret.renderFiles();
    // Assert the number of rendered files
    expect(files.length).toBe(1);
    // Assert the file properties
    const [file] = files;
    expect(file.path).toBe('./secret.yaml');
    // Add more assertions for the file content if needed
  });

  it('should format a deployment kubernetes component correctly', () => {
    const component = deploy.components.find(
      (comp) => comp.id === 'nginx',
    );

    const formattedComponent = rendererDep.formatComponent(component);
    // Add assertions to validate the formatted k8s component
   expect(formattedComponent.apiVersion).toBe('apps/v1');

  });

  it('should format a pod kubernetes component correctly', () => {
    const component = pod.components.find(
      (comp) => comp.id === 'pod',
    );

    const formattedComponent = renderPod.formatComponent(component);

    // Add assertions to validate the formatted k8s component

   expect(formattedComponent.apiVersion).toBe('v1');

  });

  it('should format a service kubernetes component correctly', () => {
    const component = service.components.find(
      (comp) => comp.id === 'nginx',
    );

    const formattedComponent = rendrerService.formatComponent(component);

    // Add assertions to validate the formatted k8s component

   expect(formattedComponent.apiVersion).toBe('v1');

  });

    // it('should format a Service component correctly', () => {
    //   const component = service.components.find(
    //     (comp) => comp.id === 'nginx',
    //   );
  
    //   const formattedComponent = rendrerService.formatComponent(component);
  
    //   // Add assertions to validate the formatted Service component
    //   // Example assertions:
    //   expect(formattedComponent).toBeDefined();
    //   expect(formattedComponent.metadata.labels).toEqual({"app.kubernetes.io/name": 'nginx'});
    //   //expect(formattedComponent.spec).toEqual({selector:['app']},{type:'NodePort'},{protocol:'TCP',port:80,targetPort:80});
    //  //expect(formattedComponent.spec).toEqual({type:'NodePort'});
    //   //expect(formattedComponent.spec.ports[0]).toEqual({"port": 80, "protocol": "TCP", "targetPort": 80});
    //   expect(formattedComponent.spec).toEqual({
    //     selector: {},
    //     type: 'NodePort',
    //     ports: [
    //       {
    //         protocol: 'TCP',
    //         port: 80,
    //         targetPort: '80'
    //       }
    //     ]
    //   });
    //   // Add more assertions as needed
   /* describe('__formatSelectorLinkAttribute', () => {
      it('should return an array of matching component IDs', () => {
        const pluginData = new KubernetesData();
        const metadata = new KubernetesMetadata(pluginData);
        metadata.parse();
  
        const parser = new KubernetesParser(pluginData);
        const files = [
          new FileInput({
            path: './pod.yaml',
            content: fs.readFileSync('tests/resources/yaml/pod.yaml', 'utf8'),
          }),
          new FileInput({
            path: './service.yaml',
            content: fs.readFileSync('tests/resources/yaml/service.yaml', 'utf8'),
          }),
        ];
  
        parser.parse(files);
  
        const matchLabelsAttribute = {  value: 'not an array'  }; 
        const targetComponentType = 'Pod';
  
        const result = parser.__convertSelectorToLinkAttribute(matchLabelsAttribute, targetComponentType);
        
    
  
        expect(result).not.toBeDefined();
  
        
      });
    });*/
  
  
 
    });
  
    



