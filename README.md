This is a Google AppEngine application that handles the subscription side of
the PubSubHubbub protocol.


In order to deploy this application, create a new application on AppEngine and
deploy like this:

```
$ appcfg.py update . -A s~your-app-id
08:01 PM Application: s~your-app-id (was: auto); version: auto
08:01 PM Host: appengine.google.com
08:01 PM
Starting update of app: s~your-app-id, version: auto
08:01 PM Getting current resource limits.
08:01 PM Scanning files on local disk.
08:01 PM Cloning 4 application files.
08:01 PM Uploading 1 files and blobs.
08:01 PM Uploaded 1 files and blobs.
08:01 PM Compilation starting.
08:02 PM Compilation completed.
08:02 PM Starting deployment.
08:02 PM Checking if deployment succeeded.
08:02 PM Deployment successful.
08:02 PM Checking if updated app version is serving.
08:02 PM Completed update of app: s~your-app-id, version: auto
```

It will serve
* a browser interface for seeing entries received from the hub at http://your-app-id.appspot.com/
* a subscription callback handler under http://your-app-id.appspot.com/subscribers

E.g. to subscribe to a feed at http://www.example.com/feed with this instance, you can send a subscription request like this:


```
curl http://pubsubhubbub.appspot.com/ -d 'hub.topic=http://www.example.com/feed&hub.callback=http://your-app-id.appspot.com/subscriber/random&hub.mode=subscribe'
```

At the Google hub, you can also use the [web
interface](https://pubsubhubbub.appspot.com/subscribe) to subscribe.

When you subsequently ping the hub about the specified topic and reload the
browser interface you should see the changed entries displayed.
