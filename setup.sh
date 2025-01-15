#!/usr/bin/env bash

#######################################
##### Sets up the virtual server ######
#######################################

###################################
# Update and upgrade APT packages #
###################################
apt-get update
apt-get upgrade -y

#################################
# Install Redis and Redis Stack #
#################################
sudo apt-get install lsb-release

apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
apt-get update
apt install redis-stack-server

echo -e "\033[32mScript exited with status code: 0\033[0m"
exit 0

############################################
# 1. Installing all dependencies           #
############################################
pip3 install -r requirements.txt

## 2. Starting up the Redis Database Server #

### 
