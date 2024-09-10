import { Kubernetes } from 'k6/x/kubernetes';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { load, dump } from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.mjs';


let yamlNamespace = `
apiVersion: v1
kind: Namespace
metadata:
  name: mock
  labels:
    k6.io/created_by: xk6-kubernetes
`

export default function () {
    const kubernetes = new Kubernetes();

    describe('YAML-based resources', () => {
        let yamlObject = load(yaml)
        const name = yamlObject.metadata.name

        describe('Create our Namespace using the YAML definition', () => {
            kubernetes.apply(yaml)
            let created = kubernetes.get("Namespace", name)
            expect(created.metadata, 'new namespace').to.have.property('uid')
        })
    })

}
