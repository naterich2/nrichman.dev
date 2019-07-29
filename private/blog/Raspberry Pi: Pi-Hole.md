# Raspberry Pi: Pi-Hole

The first thing I wanted to do once I bought my first raspberry pi was set up pi-hole, and learn how raspbian was different from the other linux distros I had used.  After playing around with it for a while, I figured out a way to set up my pi from scratch mostly headless and then install raspberry pi.

## Setup pi image.

First thing I did was head over to [the raspbian download page](https://www.raspberrypi.org/downloads/raspbian/) and downloaded the latest raspbian lite image.  Then I wanted to modify the image so that I could ssh into it without needing to use a screen to set it up first:

1.  Download image: `wget https://downloads.raspberrypi.org/raspbian_lite_latest`
2.  Set up a loop device for the image: `losetup -P /dev/loop0 2019-07-10-raspbian-buster-lite.iso`
3. Make directories to mount the image: `mkdir /mnt && mkdir /mnt/boot`
4. Mount the image: `mount /dev/loop0p1 /mnt/boot; mount /dev/loop0p2 /mnt`

Now we can make the changes to be able to set up the pi:

1. `sudo touch /mnt/boot/ssh`.  This allows ssh to be enabled on initial boot
2. `sudo echo "auto eth0" >> /mnt/etc/network/interfaces; sudo echo "iface eth0 inet dhcp" >> /mnt/etc/network/interfaces`.  This sets up the interface 'eth0' to use dhcp to automatically grab an ip from the router on bootup, but the default naming scheme for ethernet ports is not eth0 anymore on a pi so we need to change that.
3.

```bash
echo 'IMPORT{cmdline}="net.ifnames"
ENV{net.ifnames}=="0", GOTO="usb_net_by_mac_end"

action=="add", SUBSYSTEM=="net", SUBSYSTEMS=="usb", NAME=="", \
    ATTR{address}=="?[014589cd]:*", \
    TEST!="/etc/udev/rules.d/80-net-setup-link.rules", \
    TEST!="/etc/systemd/network/99-default.link", \
    IMPORT{builtin}="net_id", NAME="eth0"

LABEL="usb_net_by_mac_end"' | tee -a /etc/udev/rules.d/73-usb-net-by-mac.rules
```

This skips the rename by udev and just names the ethernet port eth0.

That is all we need to do to be able to plug the pi in somewhere and have it boot.  So once we've done that, we can find its address through our router, and ssh into it: `ssh pi@192.168.0.34`

Then the pi-hole install is really [easy](https://pi-hole.net/).  The simplest way to install is `curl -sSL https://install.pi-hole.net | bash`, but in general its not a good idea to pipe into bash because you can't read the code.  There are some other options on their website for downloading in a better practice.