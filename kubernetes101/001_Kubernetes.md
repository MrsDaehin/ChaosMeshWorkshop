## Get nodes
```
kubectl get nodes --help
```
## Deploy an app
```
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
kubectl get deployments
```

### Open a second terminal to run the proxy
```
kubectl proxy
```
## curl to the deployed app
```
curl http://localhost:8001/version
```

## Show the app in the terminal
```
kubectl proxy
```
## get the Pod name and query that pod directly through the proxy
```
export POD_NAME="$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')"
echo Name of the Pod: $POD_NAME
curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/    # The URL is the route to the API of the Pod.
```
## View Container logs
```
kubectl logs "$POD_NAME"
```

## Executing command on the container 
```
kubectl exec -ti $POD_NAME -- bash     # kubectl exec "$POD_NAME" -- env
cat server.js  # inside the pod
curl http://localhost:8080
```

## Create a new services
```
kubectl get pods
kubectl get services
kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
kubectl describe services/kubernetes-bootcamp
```

## Create an environment variable NODE_PORT 
```
export NODE_PORT="$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')"
echo "NODE_PORT=$NODE_PORT"
curl http://"$(minikube ip):$NODE_PORT"
```

## Using Labels
```
kubectl describe deployment
kubectl get pods -l app=kubernetes-bootcamp
kubectl get services -l app=kubernetes-bootcamp
```
## relabel
```
kubectl label pods "$POD_NAME" version=v1
```

## Delete services
```
kubectl delete service -l app=kubernetes-bootcamp  # to prove the app is still running in the container kubectl exec -ti $POD_NAME -- curl http://localhost:8080
```
## Scale your app
```
kubectl get deployments  # to get the name, status, availability and age of the deployment
kubectl get rs           # get replicaset  desired, current, ready, age
kubectl scale deployments/kubernetes-bootcamp --replicas=4
kubectl describe deployments/kubernetes-bootcamp
```
## Load Balancing
```
kubectl describe services/kubernetes-bootcamp   # it doesnt' exist --> kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
export NODE_PORT="$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')"
echo NODE_PORT=$NODE_PORT
curl http://"$(minikube ip):$NODE_PORT"      # we hit a different pod with every curl
```
## Scale Down
```
kubectl scale deployments/kubernetes-bootcamp --replicas=2
kubectl get deployments
kubectl get pods -o wide
```
## Rolling Update 
```
kubectl get pods
kubectl describe pods
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2 # update to version v2
kubectl get pods
```
## Verify Update
```
kubectl describe services/kubernetes-bootcamp
export NODE_PORT="$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')"
echo "NODE_PORT=$NODE_PORT"
curl http://"$(minikube ip):$NODE_PORT"

kubectl rollout status deployments/kubernetes-bootcamp
```
## ROLLBACK
```
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10
kubectl get deployments
kubectl get pods

kubectl rollout undo deployments/kubernetes-bootcamp
```

## Clean your local Cluster 
```
kubectl delete deployments/kubernetes-bootcamp services/kubernetes-bootcamp
```











