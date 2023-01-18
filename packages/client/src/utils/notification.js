export function notifyMe(message) {

  if ("Notification" in window) {
  
  if (Notification.permission === "granted") {

      let text = "";
      if(message.to === "Global")
          text = "There is new message in global chat";
      else
          text = "You have new message from "+message.from;
      var options = {
          body: message.message,
          dir : "ltr"
      };
      var notification = new Notification(text,options);

  } else if (Notification.permission !== "denied") {

      Notification.requestPermission(function (permission) {

        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }

        if (permission === "granted") {
            let text = "";
            if(message.to === "Global")
                text = "There is new message in global chat";
            else
                text = "You have new message from "+message.from;
            var options = {
                body: message.message,
                dir : "ltr"
            };
            var notification = new Notification(text,options);
        }
      });
    }
    
  }
}