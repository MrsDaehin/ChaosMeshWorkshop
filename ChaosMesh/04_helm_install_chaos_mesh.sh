VERSION=2.5.2 && helm install chaos-mesh chaos-mesh/chaos-mesh \
  --version $VERSION \
  --namespace chaos-testing \
  --create-namespace \
  --set chaosDaemon.env.DOCKER_API_VERSION="1.40" \
  --set dashboard.securityMode=false \
  --set dashboard.service.nodePort=31111