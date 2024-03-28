import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, 
  duration: '30s',
};

export default function () {
  let res = http.get('http://localhost:3001/link-lists/uploaded-file/file_model.csv'); 

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(Math.random() * 2 + 1);
}
