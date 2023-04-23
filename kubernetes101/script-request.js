import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';


export const requests = new Counter('http_reqs');


export const options = {
  stages: [
    { target: 1, duration: '1m' },
    { target: 5, duration: '1m' },
    { target: 0, duration: '1m' },
  ],
  thresholds: {
    http_reqs: ['count < 100'],
  },
};

export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const port = "30231";
  const minikube_ip = "192.168.49.2"
  const res = http.get('http://'+ minikube_ip+':'+ port);

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200
  });
}
