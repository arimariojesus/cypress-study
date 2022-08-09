# Cypress

## Mental Map

https://whimsical.com/cypress-essencial-USARd5G1FioGkoNzT8u3pH

## Setting Up Cypress on Ubuntu WSL2

Natively, wsl does not allow us to run GUI applications like [Cypress](cypress.io). For this, we need to add some addditional settings.

For good measure, update that linux install

```bash
sudo apt update
sudo apt upgrade
```

### 1. Install the prerequisite packages

To get started, we need to open a WSL2 shell and install the prerequisite packages:

https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies

### 2. Install X-server

Download and install vcxsrv: https://sourceforge.net/projects/vcxsrv/

**Firewall Rules**

Then you need to worry about the firewall. WSL comes up as a public network, but I wouldn't recommend allowing all public network traffic to access your X server. So instead, you can go ahead and select defaults when this sort of prompt comes up:

![Firewall Rules](https://raw.githubusercontent.com/cascadium/wsl-windows-toolbar-launcher/master/assets/security_alert.png)

### 3. Add a separate inbound rule for TCP port 6000

Now, we need add a separate inbound rule for TCP port 6000 to the windows firewall in order to allow WSL access to the X server, as described by the [wsl-windows-toolbar-launcher](https://github.com/cascadium/wsl-windows-toolbar-launcher#firewall-rules) people.

### 4. Setup DISPLAY

Add the following to your ~/.bashrc (or ~/.zshrc):

```bash
# set DISPLAY variable to the IP automatically assigned to WSL2
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
export LIBGL_ALWAYS_INDIRECT=1
sudo /etc/init.d/dbus start &> /dev/null
```

### 5. Edit dbus file

```bash
sudo vi /etc/sudoers.d/dbus
```

And add:
```bash
<your username> ALL = (root) NOPASSWD: /etc/init.d/dbus
```

### 6. Source your bashrc (or zshrc)

```bash
source ~/.bashrc
echo $DISPLAY
```

This should display something like:

```bash
10.10.10.10:0.0
```

### 7. Run XLaunch

You can enable public access for your X server by disabling Access Control on the Extra Settings:

![Disable access control](https://i.stack.imgur.com/6C7AT.png)

### 8. Test It

Just run one of the x11-apps installed at the top.

```bash
xeyes
xcalc
```

You should now be able to run cypress normally on your WSL2.