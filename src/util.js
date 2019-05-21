function LoadPublicMessages() {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages";
    let token = localStorage.getItem("token");

    return fetch(url, {
            'headers': {
                'Authorization':'Bearer ' + token
            }
        }).then(response=>{
            if (response.ok) {
                return response.json();
            }
        })
}

function GetMe() {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/users/me";
    let token = localStorage.getItem("token");
    return fetch(url,
      {
        'headers': {
          'Authorization': 'Bearer ' + token
        }
      }
      ).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      else {
        console.log(response);
      }
    })
  }

  function SendPublicMessage(message) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages";
    let token = localStorage.getItem("token");
  
      let msg = {
        "content": message
      };
  
      return fetch(url,
      {
        "method": "POST",
        "headers": {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'},
        "body": JSON.stringify(msg)
      });
  }

  function GetUserById(id) {
    let url = "http://messenger.westeurope.cloudapp.azure.com/api/users/" + id;
    let token = localStorage.getItem("token");
    return fetch(url,
      {
        'headers': {
          'Authorization': 'Bearer ' + token
        }
      }
      ).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      else {
        alert(JSON.stringify(response));
      }
    })
  }
  export {LoadPublicMessages, SendPublicMessage, GetMe, GetUserById};