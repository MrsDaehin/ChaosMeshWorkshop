TARGET_IP=$(kubectl get pod -n kube-system -o wide| grep kube-controller | head -n 1 | awk '{print $6}') && \
kubectl create configmap web-show-context --from-literal=target.ip=${TARGET_IP}