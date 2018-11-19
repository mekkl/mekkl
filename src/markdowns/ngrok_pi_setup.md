# ngrok + supervisor setup on rasp pi
## Forudsætninger
- Raspberry Pi
- [SSH forbindelse til raspberry pi'en](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)

## ngrok
[ngrok](https://ngrok.com/) is a fantastic tool which allows you to create secure tunnels to localhost. So you can do things like expose a local server behind a NAT or firewall to the internet. See the ngrok homepage for more information.

## supervisor
[Supervisor](http://supervisord.org/) is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. It is meant to be used to control processes related to a project or a customer, and is meant to start like any other program at boot time.

## Step 1 | Setup ngrok på rasp-pi
- ref.: https://dashboard.ngrok.com/get-started
- ref.: https://ngrok.com/docs#config

Gå ind på https://ngrok.com/download og find download linket som downloader den rette zip fil (alt efter hvilken OS serveren har). 

Derefter download zip filen (husk zip filen bliver downloadet til hvor du står i konsollen):
```
$ wget <download link>
```

Udpak zip filen:
```
$ unzip /path/to/ngrok.zip
```

Filen du har unzippet er en binary fil. Det vil sige, at du kan kører ngrok ved at skrive:
```
$ ./ngrok
```

Når du har udpakket ngrok, gå ind på https://dashboard.ngrok.com/user/login og login, eller lav en ny profil hvis du ikke allerede har en. 

Derefter gå til https://dashboard.ngrok.com/auth hvor du skal genererer en authtoken. Når den er genereret skriv følgende i server konsollen:
```
$ ./ngrok authtoken <YOUR_AUTH_TOKEN>
```

Når kommandoen er kørt vil der samtidigt blive oprettet en ngrok configuration fil på følgende lokationer, alt efter hvilke OS du er på:
- OSX: `/Users/example/.ngrok2/ngrok.yml`
- Windows: `C:\Users\example\.ngrok2\ngrok.yml`
- Linux: `/home/example/.ngrok2/ngrok.yml`

Nu er ngrok klar på serveren. Du vil nu kunne oprette en tunnel til din lokale raspberry pi server udefra vha. SSH. Det eneste man skal skrive er:
```
$ ./ngrok tcp 22
```

Denne kommando vil generer følgende:
```
Session Status                online
Account                       <acc name>  (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4041
Forwarding                    tcp://0.tcp.ngrok.io:13375 -> localhost:2222

Connections 
ttl     opn     rt1     rt5     p50     p90
0       0       0.00    0.00    0.00    0.00
```

`Web Interface` specificere en GUI hvori samme oplysninger som overstående ouput også viser. Man skal altså bare gå til `http://<RASPBERRY-PI IP-ADDRESS>:4041` i din webbrowser (fra samme netværk som din raspberry-pi)

`Forwarding` viser den adresse som du kan tilgå til din raspberry pi igennem, når du benytter SSH. Ud fra overstående ouput skal følgende skrives for, at skabe en SSH forbindelse udefra pi'en netværk:
```
$ ssh <pi-username>@0.tcp.ngrok.io -p 13375
```

Problemet ved denne metode er, at ngrok ikke kører i baggrunden, men vil derfor altid være aktiv i konsol vinduet. Vi vil derfor gerne kører ngrok som en process i baggrunden. Dette vil vi benytte supervisor til.

## Step 2 | setup supervisor på rasp-pi
Før supervisor downloades/installeres skal der sørges for, at rasp-pi'en er [updated og upgradet](https://www.raspberrypi.org/documentation/raspbian/updating.md).

Når det er gjort, download og installer supervisor:
```
$ apt-get install supervisor
```

Når supervisor er installeret burde supervisor daemon'en allerede været startet, da den kommer med et script der sørger for, at supervisor startet efter et system reboot. 

## Step 3 | opret en ngrok process hos supervisor
- ref.: https://www.digitalocean.com/community/tutorials/how-to-install-and-manage-supervisor-on-ubuntu-and-debian-vps
- ref.: https://sonnguyen.ws/using-ngrok-publish-website/

For at supervisor kan kører ngrok, så skal vi tilføje en configuration fil til supervisor, der giver alle de oplysninger omkring hvordan processen skal køres.

Stien, hvori supervisor skal have conf filen omkring de processer den skal håndtere, lokaliseres i `/etc/supervisor/conf.d/`. 

Kør følgende for, at oprette og redigerer en conf fil,der giver supervisor oplysninger om hvordan den skal håndterer ngrok:
```
$ sudo nano /etc/supervisor/conf.d/ngrok.conf
```

Og tilføj følgende i filen:
```
[program:ngrok]
command=sudo /path/to/ngrok start ssh -region=eu -config=/opt/ngrok/ngrok.yml -log stdout --authtoken <YOUR_AUTH_TOKEN>
autostart=true
autorestart=true
stdout_logfile=/var/log/ngrok.out.log
stderr_logfile=/var/log/ngrok.err.log
```

Læg mærke til, at supervisor får defineret hvortil der skal skrives log omkring kørslen af ngrok til. Derefter rediger ngrok's configuration fil:
```
$ sudo nano /opt/ngrok/ngrok.yml
```

Og tilføj følgende:
```
web_addr: 0.0.0.0:4040
tunnels:
    ssh:
        proto: tcp
        addr: 0.0.0.0:22
```

`web_addr: 0.0.0.0:4040` angiver igen bare hvor du kan få vist ngrok's web interface (ddressen du skal bruge for at få oprette en SSH forbindelse).

Når vores supervisor konfigurationsfil er lavet og gemt, så kan vi informerer supervisor om, at vores nye program gennem supervisorctl kommando. Først fortæller vi supervisor at kigge efter nye eller ændringede program konfigurationer i `/etc/supervisor/conf.d` mappen med:

```
$ sudo supervisorctl reread
```

Efterfulgt af at den skal benytte sig af ændringerne med:
```
$ sudo supervisorctl update
```

For at tjekke om supervisor kører, kør følgende kommando:
```
$ sudo supervisorctl
```

Det burde give følgende:
```
$ sudo supervisorctl
ngrok           RUNNING   pid 2942, uptime 1:47:05
supervisor>
```

Hver gang du laver ændringer, eller tilføjer en ny konfirgurationsfil, kør de to forrige kommandoer for at supervisor kører ændringerne.

## Step 4 | quality of life tilføjelse
Husk at hvis din raspberry pi, ngrok eller supervisor genstarter, af en eller anden årsag, så kan både ngrok adressen og/eller port nummeret, man får givet af ngrok, ændre sig. Derfor tjek op på den inden du forsøger at oprette forbindelse, via. SSH, til din rasp-pi. 

ssh conf