import { Kubernetes } from "k6/x/kubernetes";
import { describe, expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { load, dump } from "https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.mjs";

let yamlNamespace = `
apiVersion: v1
kind: Namespace
metadata:
  name: mock
  labels:
    k6.io/created_by: xk6-kubernetes
`


let yamlMock = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metrics-api-test-metrics-server
  namespace: mock
spec:
  replicas: 1
  selector:
    matchLabels:
      app: metrics-api-test-metrics-server
  template:
    metadata:
      labels:
        app: metrics-api-test-metrics-server
    spec:
      containers:
        - name: metrics
          image: ghcr.io/kedacore/tests-metrics-api
          ports:
            - containerPort: 8080
              protocol: TCP
`

export default function () {
    const kubernetes = new Kubernetes();
 
    describe('YAML-based namespace', () => {
        let yamlObject = load(yamlNamespace)
        const name = yamlObject.metadata.name

        describe('Create our Namespace using the YAML definition', () => {
            kubernetes.apply(yaml)
            let created = kubernetes.get("Namespace", name)
            expect(created.metadata, 'new namespace').to.have.property('uid')
        })
    })

    describe('YAML-based deployment', () => {
        let yamlObject = load(yamlMock)
        const name = yamlObject.metadata.name
        const ns = yamlObject.metadata.namespace

        describe('Create our Deployment using the YAML definition', () => {
            kubernetes.apply(yaml)
            let created = kubernetes.get("Deployment.apps", name, ns)
            expect(created.metadata, 'new deployment').to.have.property('uid')
        })

        describe('Update our Deployment with a modified YAML definition', () => {
            const newValue = 2
            yamlObject.spec.replicas = newValue
            let newYaml = dump(yamlObject)

            kubernetes.apply(newYaml)
            let updated = kubernetes.get("Deployment.apps", name, ns)
            expect(updated.spec.replicas, 'changed value').to.be.equal(newValue)
        })

    })



}
