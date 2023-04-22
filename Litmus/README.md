# kubesimplify-chaos-demo

This is a workshop to install LitmusChaos & execute a chaos scenario on a simple web application 

## Steps: 

1. Spin up your favourite Kubernetes cluster (ex: [killercoda](https://killercoda.com/playgrounds/scenario/kubernetes))

2.  Verify the presence of a default storage class. If there are none, set up the Rancher dynamic Local PV provisioner & storage class. And then make it the default

    ```
    kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
    kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
    ```

3. Setup the sample web-application

   ```
   kubectl apply -f https://raw.githubusercontent.com/ksatchit/kubesimplify-chaos-demo/main/podtato-head-web-app.yaml
   ```
   
   Open port access to the application and view status 
   
4. Install LitmusChaos & verify successful setup 

   ```
   kubectl apply -f https://raw.githubusercontent.com/litmuschaos/litmus/master/mkdocs/docs/2.12.0/litmus-2.12.0-without-resources.yaml
   ```
   
5. Construct the chaos scenario to kill the helloservice replica with a http probe to verify availability. Validate hypothesis & analyze results 

6. Re-run the chaos scenario with mitigation to check whether the desired resilience characteristics are achieved. 


https://www.youtube.com/watch?v=259I52_Zh3E
