# Prerequisites

* Node JS
* NPM

# Install

Install node dependencies:

    npm install

Install bower dependencies:

    bower install

Install gulp globally

    npm install --global gulp

# Run

## In local environment - for developers

    gulp
    
    [...]
    Rapidocteur client - express server listening on port 8082

Your server is now running and any changed will be automatically reloaded (less, js, html..) and you Web page will be automatically reloaded.

## In integration / pre-production environment - dev.rapidocteur.fr


### run in the current console (to debug)

    NODE_ENV=production PORT=9003 node app.js
        
    [...]
    Rapidocteur client - express server listening on port 9003

    
### run in forever mode (with logs files)

To run the application with forever (in order to auto-restart it in case of crash):

Create the logs dir:

    mkdir /usr/share/nginx/rapidocteur_dev/logs

Then run forever:
    
    NODE_ENV=production PORT=9003 forever start /usr/share/nginx/rapidocteur_dev/app.js -l /usr/share/nginx/rapidocteur_dev/logs/server.log -o /usr/share/nginx/rapidocteur_dev/logs/out.log -e /usr/share/nginx/rapidocteur_dev/logs/err.log 
    
## In production environment - rapidocteur.fr 
    
### run in the current console (to debug)

    NODE_ENV=production PORT=9002 node app.js
        
    [...]
    Rapidocteur client - express server listening on port 9002

    
### run in forever mode (with logs files)

To run the application with forever (in order to auto-restart it in case of crash):

Create the logs dir:

    mkdir /usr/share/nginx/rapidocteur/logs

Then run forever:
    
    NODE_ENV=production PORT=9003 forever start /usr/share/nginx/rapidocteur/app.js -l /usr/share/nginx/rapidocteur/logs/server.log -o /usr/share/nginx/rapidocteur/logs/out.log -e /usr/share/nginx/rapidocteur/logs/err.log 
    
    
# Proxy configuration


## In local environment - for developers

Configure your server name in the host file ([How do I modify my hosts file?](http://www.rackspace.com/knowledge_center/article/how-do-i-modify-my-hosts-file)).

    127.0.0.1   rapidocteur.local

Then configure and enable your nginx virtual host:

    server {
        listen 80;

        root /home/toub/dev/rapidocteur.fr/rapidocteur_web;
        index index.html index.htm;

        server_name rapidocteur.local;

        location /pro {
                    alias /home/toub/dev/rapidocteur.fr/rapidocteur_pro;
            }

        location /api/ {
            proxy_pass http://127.0.0.1:8080/;
        }

        location / {
            proxy_pass http://127.0.0.1:8082/;
        }

    }

Run the node app and access to the applications here: 

* web: (http://rapidocteur.local)
* pro:  (http://rapidocteur.local/pro)
* api: (http://rapidocteur.local/api)

## In integration / pre-production environment - dev.rapidocteur.fr

    server {
        listen 80;

        root /usr/share/nginx/rapidocteur_dev
        index index.html index.htm;

        server_name dev.rapidocteur.fr;

        location /api/ {
            proxy_pass http://127.0.0.1:9001/;
        }

        location / {
            proxy_pass http://127.0.0.1:9003/;
        }

    }



## In production environment - rapidocteur.fr 

    server {
        listen 80;

        root /usr/share/nginx/rapidocteur
        index index.html index.htm;

        server_name www.rapidocteur.fr;

        location /api/ {
            proxy_pass http://127.0.0.1:9000/;
        }

        location / {
            proxy_pass http://127.0.0.1:9002/;
        }

    }


## Notes

Web Appointments : 
http://www.rapidocteur.fr:9000/web/appointments/count

    
