import axios from 'axios';

export function login(id, pw) {
    return axios.post('https://kakaoplus.ml/dip/userCheck.php',{"email":id,"password":pw});
}
