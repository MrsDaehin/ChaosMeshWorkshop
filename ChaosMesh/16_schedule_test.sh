#blast radius and apply test
kubectl get deployments,pods -l app='web-show' && kubectl apply -f scheduled-network-delay-experiment.yaml && kubectl get Schedule