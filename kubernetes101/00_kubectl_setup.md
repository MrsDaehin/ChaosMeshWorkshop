# Quality of life

## set up autocomplete in bash into the current shell, bash-completion package should be installed first.

```
source <(kubectl completion bash)
echo "source <(kubectl completion bash)" >> ~/.bashrc
```

- add autocomplete permanently to your bash shell.

## create alias to make it easier

```
alias k=kubectl
complete -o default -F __start_kubectl k
```

## Kubectl context and configuration

```
kubectl config current-context
kubectl config get-contexts
kubectl config use-context <context-name>
kubectl config delete-context <context-name>
```

## Get commands with basic output

```
kubectl get services                          # List all services in the namespace
kubectl get pods --all-namespaces             # List all pods in all namespaces
kubectl get pods -o wide                      # List all pods in the current namespace, with more details
kubectl get deployment my-dep                 # List a particular deployment
kubectl get pods                              # List all pods in the namespace
kubectl get pod my-pod -o yaml                # Get a pod's YAML
```
