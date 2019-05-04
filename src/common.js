
function LoadPublicMessages() {
  let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages";
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

function LoadUserMessages(id) {
  let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/" + id + "/messages";
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
  }).then(messages => {return messages;})
}

function GetUserById(id) {
  let url = "http://messenger.westeurope.cloudapp.azure.com/api/users/" + id ;
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

function GetConversations() {
  let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations";
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

function GetUserByName(name) {
  let url = "http://messenger.westeurope.cloudapp.azure.com/api/users?query=" + name;
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

    let model = {
      "content": message
    };

    return fetch(url,
    {
      "method": "POST",
      "headers": {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'},
      "body": JSON.stringify(model)
    });
}

function SendPrivateMessage(message, chatId) {
  let url = "http://messenger.westeurope.cloudapp.azure.com/api/conversations/" + chatId + "/messages";
    let token = localStorage.getItem("token");

    let model = {
      "content": message
    };

    return fetch(url,
    {
      "method": "POST",
      "headers": {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'},
      "body": JSON.stringify(model)
    });
}

export {LoadPublicMessages, LoadUserMessages, GetUserById, GetConversations, GetUserByName, SendPublicMessage, SendPrivateMessage};
