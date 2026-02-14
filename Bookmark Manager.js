  function handleCredentialResponse(response) {
     console.log("Encoded JWT ID token: " + response.credential);
     // Send this token to your server to verify and log the user in
  }