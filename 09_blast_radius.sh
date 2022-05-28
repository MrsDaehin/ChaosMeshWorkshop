#The experiment declares that a 10ms network delay should be injected. The delay will only be applied to the target service labeled "app": "web-show". 
#This is the blast radius. 
kubectl get deployments,pods -l app='web-show'