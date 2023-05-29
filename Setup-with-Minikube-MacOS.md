# Setup with MacOS

`brew list`

### Installing a Hypervisor
  
Install a Hypervisor. If you do not already have a hypervisor installed, install one of these now:. 

`brew install hyperkit`

### Installing minikube

`brew install minikube`

`minikube version`

### Installing kubectl

`kubectl` is the command line tool we'll be using to interact with our local cluster - and in fact, any Kubernetes cluster in general.


`brew install kubectl`
`kubectl version`

### Starting minikube

To start minikube, simply type the following in your terminal or command line:

```
minikube start
```

This will setup the virtual machines required to run a minimal Kubernetes cluster. Once `minikube start` is finished, you can specify the `minikube` context from your command line:

```
kubectl config use-context minikube
```

To verify that you're connected to the cluster, you can run the following command:

```
kubectl cluster-info
```

Huzzah! You're ready!
