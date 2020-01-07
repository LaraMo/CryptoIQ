# CryptIQ: A Dawson Project
### Authors: 
- Anh Quan Nguyen
- Lara Mo 
- Nicholas Apanian

# TODO: List on priority

# SERVER:
- [x] Fix db persistance on startup + add default storyline
- [X] Game generation
    - [X] 2 Games with page and lock (EASY) 2GLPN
    - [X] 2 Games with page and no lock (EASY) 2GPN
    - [X] 2 Games without page (EASY) 2G
    - [X] 3 Games with page and lock (MEDIUM) 3GLPN
    - [X] 3 Games with page and no lock (MEDIUM) 3GPN
    - [X] 3 Games without page (MEDIUM) 3G
    - [X] 4 Games with page and lock (HARD) 4GLPN
    - [X] 4 Games with page and no lock (HARD) 4GPN
- [x] Complete e2e flow

- [ ] Finish ins pdf for all the puzzles: [LOCK, CIPHERWHEEL, WORDSEARCH, CROSSWORD] 

- [ ] Finish game pdf for all the puzzles: [LOCK, CIPHERWHEEL, WORDSEARCH, CROSSWORD]

- [x] Point Bonus
- [x] Add search drop down to show what stories there are
- [x] Fix CSS client side
- [x] Fix Team size suggestion

- [x] Fix deployment

- [x] Add client side localstorage of previous run : FIX BUG THAT WHEN REFRESHED, STORYLINE LOADS ALL ACTION TO THE FIRST TEXTAREA... | Staus:  | Duration:
- [x] Client:Add message feedback //on the button when trying to generate | Staus: DONE | Duration: 45m

- [x] Add client-side validation -- DONE -- 
    - [x] Vocabulary: words all letter, page number all number | Status: DONE | Duration: 30m //had to fix a mini regex bug 
    - [x] General Info: N# of students < 50 | Staus: DONE | Duration: 15m
    - [x] ALL: Make sure the text fields are not empty on submission | Staus: DONE | Duration: 1h

## Deployment Note:
### For Server:

- The API has 2 endpoints which is exposed internally as port 1337 and being fed request from port 80 (setup in /etc/apache2/availlable-sites/000-default.conf) 

- Make sure the node version uses on the server and development is consistent. Use nvm utility to install/update node and npm
 ```
    nvm ls
    nvm unisntall <version>
    nvm install <version>
    nvm use <version>
 ```

- The API is hosted as a daemon through the systemd system under the name ```cryptiq```. The location for this daemon unit definition is at:

```/vim /etc/systemd/system/cryptiq.service```

- Make changes to the above file for configuration tinkering
- To interact with this service, do:

```
    sudo systemctl status cryptiq # view status, state
    sudo systemctl restart cryptiq 
    sudo systemctl stop cryptiq 
    sudo systemctl enable cryptiq # enable on system reboot
    sudo systemctl daemon-reload # reload all configuration files 

    sudo journalctl -u cryptiq -e # open log of the services, for debugging purposes
```

- To install, pull updates on the services, do the following:

```
    cd ~/CryptIQ
    cd src/server
    npm run build
    sudo systemctl restart cryptiq 
```

### For client

- For the client, the ```apache2``` server is setup to serve the webpage at port 80. 

- To update, simply pull the changes and run ```npm run deploy```

- To check server status, do:
```
    sudo systemctl status apache2
    sudo journalctl -u apache2 -e
```