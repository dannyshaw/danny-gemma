#!/usr/bin/env bash

# Get root up in here
sudo su

# Just a simple way of checking if we need to install everything
if [ ! -d "/var/www" ]
then
    # Add MongoDB to apt
    apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

    # Update and begin installing some utility tools
    apt-get -y update
    apt-get install -y python-software-properties
    apt-get install -y vim git subversion curl
    apt-get install -y memcached build-essential

    # Add nodejs repo (runs update)
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

    # Install nodejs
    apt-get install -y nodejs

    # Install latest stable version of MongoDB
    apt-get install -y mongodb-10gen

    # Symlink our host www to the guest /var/www folder
    ln -s /vagrant/www /var/www

    # Install Heroku toolbelt
    wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh


    # Huzzah!
    echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    echo "If all went well, you can get started with Our School Liberia!"
    echo ""
    echo "Login to this VM with:"
    echo "   vagrant ssh"
    echo ""
    echo "The IP for this VM is: 192.168.192.168"
    echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"

fi
