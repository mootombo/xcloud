#!/bin/bash
# Vars
SCRIPTDIR="$(dirname $0)"

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

# Copy the xcloud smb.conf version
cp $SCRIPTDIR/smb.conf /etc/samba

# Restart the smbd service
service smbd restart

echo "Shares are accessable with the following credentials"
echo "Scanboxes (Mostly used for scanners): \\<IP-address>\scanbox"
echo "Windows (Mostly used for shared windows apps): \\<IP-address>\windows"
