#!/bin/bash
# Vars
XCPATH='/var/www/html/xc'
XCDATA='/var/www/data/xc'
HTUSER='www-data'
HTGROUP='www-data'
ROOTUSER='root'
SUDOUSER='sysmaster'
SUDOGROUP='sysmaster'

# Create the shares folder for samba shares
mkdir -p /mnt/shares
mkdir -p /mnt/shares/scanbox
mkdir -p /mnt/shares/scanbox/department_1
mkdir -p /mnt/shares/scanbox/department_2
mkdir -p /mnt/shares/scanbox/department_3
mkdir -p /mnt/shares/scanbox/department_4
mkdir -p /mnt/shares/scanbox/department_5
mkdir -p /mnt/shares/scanbox/department_6
mkdir -p /mnt/shares/scanbox/department_7
mkdir -p /mnt/shares/scanbox/department_8
mkdir -p /mnt/shares/scanbox/department_9
mkdir -p /mnt/shares/windows

# Set mod 777 for root scanbox and windows folder
chmod -R 777 /mnt/shares/scanbox
chmod -R 777 /mnt/shares/windows


# Install samba server and samba commons
apt-get install -y samba-common samba tdb-tools

# Adding the scanbox user
echo "add user scanbox (Please type in the name \"Scanbox\" without quotes. Simply hit enter on all other fields"
/bin/bash -c "echo" | adduser --no-create-home --disabled-login --shell /bin/false scanbox

