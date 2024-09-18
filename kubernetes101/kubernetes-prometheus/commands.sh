##### create namespace

kubectl create namespace monitoring

#### set role for prometheus
kubectl create -f clusterRole.yaml

#### Create a Config Map To Externalize Prometheus Configurations
kubectl create -f config-map.yaml
#### In Prometheus terms, the config for collecting metrics from a collection of endpoints is called a job.

#### create deployment
kubectl create  -f prometheus-deployment.yaml 

kubectl get deployments --namespace=monitoring

#### Connecting To Prometheus Dashboard

kubectl get pods --namespace=monitoring

kubectl port-forward prometheus-deployment-xxxxxxxx  8080:9090 -n monitoring

###### Method 2: Exposing Prometheus as a Service [NodePort & LoadBalancer]
kubectl create -f prometheus-service.yaml --namespace=monitoring


####  create kube state metrics configs

kubectl apply -f kube-state-metrics-configs/

##### now all targets should be up 


#### deploy grafana

kubectl create -f grafana-datasource-config.yaml
kubectl create -f deployment.yaml
