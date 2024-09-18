import { Kubernetes } from 'k6/x/kubernetes';
import { readTextFile, writeTextFile } from 'k6/fs';
import * as YAML from "k6/x/yaml";


export default function () {
  const filePath = '/home/osboxes/Documents/ChaosMeshWorkshop/mock.yaml';
  const modifiedFilePath = '/home/osboxes/Documents/ChaosMeshWorkshop/mock1.yaml';

  // Read the contents of the input file
  const fileContent = readTextFile(filePath);

  // Modify the file content (e.g., convert to uppercase)
  const modifiedContent = fileContent.toUpperCase();

  // Write the modified content to a new file
  writeTextFile(modifiedFilePath, modifiedContent);

  // Check if the modified file exists and contains the expected content
  const modifiedFileExists = check(() => {
    return readTextFile(modifiedFilePath) === modifiedContent;
  }, { tag: 'Modified File Exists' });

  // Sleep for a while before executing the next iteration
  sleep(1);
}




const podSpec = {
    apiVersion: "v1",
    kind:       "Pod",
    metadata: {
        name:      "busybox",
        namespace: "testns"
    },
    spec: {
        containers: [
            {
                name:    "busybox",
                image:   "busybox",
                command: ["sh", "-c", "sleep 30"]
            }
        ]
    }
}

export default function () {
  const kubernetes = new Kubernetes();

  kubernetes.create(podSpec)

  const pods = kubernetes.list("Pod", "testns");

  console.log(`${pods.length} Pods found:`);
  pods.map(function(pod) {
    console.log(`  ${pod.metadata.name}`)
  });
}