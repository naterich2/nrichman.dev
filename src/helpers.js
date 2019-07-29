export function checkAuth(auth, noauth){
  fetch('/resources/verifyToken')
    .then(resp => {
      if(resp.status == 200){
        return resp.json();
      } else {
        noauth("Please log in");
      }
    })
    .then(myjson => {
      auth(myjson);
    });
}
