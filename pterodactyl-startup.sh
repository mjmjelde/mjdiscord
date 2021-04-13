#!/bin/bash

if [[ ! "${RSA_DEPLOY_KEY}" == "" ]]; then
  if [ ! -d "/home/container/.ssh" ]; then
    echo -e "Creating ssh directory and adding deployment key"
    mkdir /home/container/.ssh
    chmod 700 /home/container/.ssh
    echo "${RSA_DEPLOY_KEY@E}" > /home/container/.ssh/id_rsa
    chmod 600 /home/container/.ssh/id_rsa
    ssh-keyscan github.com >> /home/container/.ssh/known_hosts
    chmod 600 /home/container/.ssh/known_hosts
  fi
fi

if [ ! -d .git ]; then
  if [ -z ${INSTALL_BRANCH} ]; then
    INSTALL_BRANCH=master
  fi
  echo -e "Cloning repository"
  git clone --single-branch --branch ${INSTALL_BRANCH} ${INSTALL_REPO}
else
  echo -e "Pulling repository changes"
  git pull
fi

echo "Installing requirements"
if [ -f package.json ]; then
  npm install --production
fi

if [ -f tsconfig.json ]; then
  tsc
fi

echo -e "Install/update complete.  Starting server"
node {{BOT_JS_FILE}}