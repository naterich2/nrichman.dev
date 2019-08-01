# New Display, New Issues

### Background
On my computer at home I run a dual-boot Windows and arch linux with systemd-boot bootloader.  At boot I get a menu asking if I want to boot to arch linux or Windows, and it defaults to arch after 10 seconds.

Well, the other I got a refurbished 1080p HP monitor.  I connected it up to Displayport 2 on  my graphics card ( AMD rx480) while I had linux up, then I set it up to extend my display to the right: `xrandr --output DP-2 --auto --right-of DP-1 && i3-msg restart`.  Everything looked great.  Then I run my sleep script: `i3lock && systemctl suspend`, and a while later my PC won't wake up from sleep.

### The Troubles Begin
I reboot the computer and there is no output (not even my MOBO) logo to either screen.  So I unplug the new screen and reboot.  Again, no output.  So now I'm flashing back to building this PC when I accidentally set the initially display output to the wrong PCI slot and had to move my graphics card to bring it back.  Luckily though, the next time I boot without the new screen, the MOBO logo shows up, however my normal systemd-boot dialog doesn't come up, it boots directly to Windows.  That's odd.  Then I reboot and hold F12 for option boot.  The crazy part is that I have a BIOS password set and it DIDN'T ask me for it.  Somehow I had a BIOS password before I plugged in this display and now I don't.  I boot to Windows again since the linux bootloader was not detected.

 Now I've had this happen before when I tried to install Hannah Montana Linux alongside Arch on my OS and it changed the  vmlinuz-linuz image.  So I needed to make a bootable arch drive from my Windows side.  NOW this time I boot and hold F12, and it ASKS FOR MY BIOS PASSWORD.  Of course the one I had set works, and now it magically detects my linux bootloader.  But sadly this was short lived, I have not been able to get the BIOS to ask me for a password, or detect my linux bootloader since.

### What Now?
I call Gigabyte and ask a rep how it could be possible that simply plugging in an extra display could cause the BIOS to not ask me for my BIOS password MOST of the time, and they had no idea, and neither did I.  At this point I'm fairly certain the display is causing these issues somehow since I hadn't changed anything else, and the not outputting to any display resolves when I remove this new display from my setup.  So I exchange the refurbished monitor for a fairly cheap new one.  Again, no one at the computer store believed that a monitor could temporarily remove my bios password and cause my bootloader to no longer be recognized.  And I'm not even sure I believe that, but what else can I believe.

So I get this new monitor, plug it in turn on the computer and sure enough, both displays light up with my MOBO logo, but only boots to windows.

### Recovering
At this point I think the issues with the display output have been resolved, now I have to fix my linux bootloader.  So I boot into the live image I created and run `efibootmgr` and see what I expect

```bash
BootCurrent: 0004
Timeout: 1 seconds
BootOrder: 0000,0004,0005,0003
Boot0000* Windows Boot Manager
Boot0003* Hard Drive
Boot0004* UEFI: SMI USB DISK 1100
Boot0004* UEFI: SMI USB DISK 1100, Partition 1
```
Instead of trying to mess around with manually creating an efi boot entry, I just used `bootctl install --esp-path=/mnt/boot`, then I verified that it was there by running `efibootmgr` again.

So my computer happily boots up and asks whether I want to continue to linux or go to Windows and I thought all was good.  But I can't connect wifi.  I run wpa_supplicant and had `wpa_supplicant@wlp10s0` set to run at boot.  What I didn't realize was that reinstalling the boot manager meant that these devices could be renamed.  So I had to find what it was renamed to.  There's probably an easier way to do this, but `ip addr` didn't show my wireless interface, i don't have `ifconfig` installed, and for some reason I didn't have `iw` installed.  Instead I ran `lspci -k` to find what driver the Network controller was using.  In my case it was 'ath9k', then I ran `dmesg | grep ath9k` and I find:

```
[    3.081559] ath9k 0000:0e:00.0: enabling device (0000 -> 0002)
[    3.194225] ath9k 0000:0e:00.0 wlp14s0: renamed from wlan0
```

So now I just copy my config for wlps10 to wlps14: `mv /etc/wpa_supplicant/wpa_supplicant-wlp10s0.conf /etc/wpa_supplicant/wpa_supplicant-wlp14s0.conf` and enable and start the service: `systemctl enable wpa_supplicant@wlp14s0 && systemctl start wpa_supplicant@wlp14s0`

The final issue I have run into was with a script I use to set my graphics cards fan:

```bash
#!/bin/bash
echo "1" | sudo tee /sys/class/drm/card0/device/hwmon/hwmon3/pwm1_enable
echo $1 | sudo tee /sys/class/drm/card0/device/hwmon/hwmon3/pwm1
```

In this case I just listed the contents of /sys/class/drm/card0/device/hwmon and saw that it changed from hwmon3 to hwmon2.  This was an easy enough fix:  `sed -Ei 's/hwmon3/hwmon2/` ~/.config/graphics.sh` 

## Conclusion
Never underestimate how something seemingly harmless can mess up an entire system.