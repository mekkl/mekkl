import React, { Component } from 'react';


export default class NgrokSupervisor extends Component {
        constructor(props) {
                super(props)
                this.state = {}
        }

        render() {
                return (
                        <div className='flex-item-markdown'>
                                <h1 id="ngroksupervisorsetuponrasppi">ngrok + supervisor setup on rasp pi</h1>

                                <h2 id="forudstninger">Forudsætninger</h2>

                                <ul>
                                        <li>Raspberry Pi</li>

                                        <li><a href="https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md">SSH forbindelse til raspberry pi'en</a></li>
                                </ul>

                                <h2 id="ngrok">ngrok</h2>

                                <p><a href="https://ngrok.com/">ngrok</a> is a fantastic tool which allows you to create secure tunnels to localhost. So you can do things like expose a local server behind a NAT or firewall to the internet. See the ngrok homepage for more information.</p>

                                <h2 id="supervisor">supervisor</h2>

                                <p><a href="http://supervisord.org/">Supervisor</a> is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. It is meant to be used to control processes related to a project or a customer, and is meant to start like any other program at boot time.</p>

                                <h2 id="step1setupngrokprasppi">Step 1 | Setup ngrok på rasp-pi</h2>

                                <ul>
                                        <li>ref.: https://dashboard.ngrok.com/get-started</li>

                                        <li>ref.: https://ngrok.com/docs#config</li>
                                </ul>

                                <p>Gå ind på https://ngrok.com/download og find download linket som downloader den rette zip fil (alt efter hvilken OS serveren har). </p>

                                <p>Derefter download zip filen (husk zip filen bliver downloadet til hvor du står i konsollen):</p>

                                <pre><code>$ wget &lt;download link&gt;
</code></pre>

                                <p>Udpak zip filen:</p>

                                <pre><code>$ unzip /path/to/ngrok.zip
</code></pre>

                                <p>Filen du har unzippet er en binary fil. Det vil sige, at du kan kører ngrok ved at skrive:</p>

                                <pre><code>$ ./ngrok
</code></pre>

                                <p>Når du har udpakket ngrok, gå ind på https://dashboard.ngrok.com/user/login og login, eller lav en ny profil hvis du ikke allerede har en. </p>

                                <p>Derefter gå til https://dashboard.ngrok.com/auth hvor du skal genererer en authtoken. Når den er genereret skriv følgende i server konsollen:</p>

                                <pre><code>$ ./ngrok authtoken &lt;YOUR_AUTH_TOKEN&gt;
</code></pre>

                                <p>Når kommandoen er kørt vil der samtidigt blive oprettet en ngrok configuration fil på følgende lokationer, alt efter hvilke OS du er på:</p>

                                <ul>
                                        <li>OSX: <code>/Users/example/.ngrok2/ngrok.yml</code></li>

                                        <li>Windows: <code>C:\Users\example\.ngrok2\ngrok.yml</code></li>

                                        <li>Linux: <code>/home/example/.ngrok2/ngrok.yml</code></li>
                                </ul>

                                <p>Nu er ngrok klar på serveren. Du vil nu kunne oprette en tunnel til din lokale raspberry pi server udefra vha. SSH. Det eneste man skal skrive er:</p>

                                <pre><code>$ ./ngrok tcp 22
</code></pre>

                                <p>Denne kommando vil generer følgende:</p>

                                <pre><code>Session Status                online<br></br>
                                        Account                       &lt;acc name&gt;  (Plan: Free)<br></br>
                                        Version                       2.2.8<br></br>
                                        Region                        United States (us)<br></br>
                                        Web Interface                 http://127.0.0.1:4041<br></br>
                                        Forwarding                    tcp://0.tcp.ngrok.io:13375 -&gt; localhost:2222<br></br>
                                        <br></br>
                                        Connections<br></br>
                                        ttl     opn     rt1     rt5     p50     p90<br></br>
                                        0       0       0.00    0.00    0.00    0.00<br></br>
                                </code></pre>

                                <p><code>Web Interface</code> specificere en GUI hvori samme oplysninger som overstående ouput også viser. Man skal altså bare gå til <code>http://&lt;RASPBERRY-PI IP-ADDRESS&gt;:4041</code> i din webbrowser (fra samme netværk som din raspberry-pi)</p>

                                <p><code>Forwarding</code> viser den adresse som du kan tilgå til din raspberry pi igennem, når du benytter SSH. Ud fra overstående ouput skal følgende skrives for, at skabe en SSH forbindelse udefra pi'en netværk:</p>

                                <pre><code>$ ssh &lt;pi-username&gt;@0.tcp.ngrok.io -p 13375
</code></pre>

                                <p>Problemet ved denne metode er, at ngrok ikke kører i baggrunden, men vil derfor altid være aktiv i konsol vinduet. Vi vil derfor gerne kører ngrok som en process i baggrunden. Dette vil vi benytte supervisor til.</p>

                                <h2 id="step2setupsupervisorprasppi">Step 2 | setup supervisor på rasp-pi</h2>

                                <p>Før supervisor downloades/installeres skal der sørges for, at rasp-pi'en er <a href="https://www.raspberrypi.org/documentation/raspbian/updating.md">updated og upgradet</a>.</p>

                                <p>Når det er gjort, download og installer supervisor:</p>

                                <pre><code>$ apt-get install supervisor
</code></pre>

                                <p>Når supervisor er installeret burde supervisor daemon'en allerede været startet, da den kommer med et script der sørger for, at supervisor startet efter et system reboot. </p>

                                <h2 id="step3opretenngrokprocesshossupervisor">Step 3 | opret en ngrok process hos supervisor</h2>

                                <ul>
                                        <li>ref.: https://www.digitalocean.com/community/tutorials/how-to-install-and-manage-supervisor-on-ubuntu-and-debian-vps</li>

                                        <li>ref.: https://sonnguyen.ws/using-ngrok-publish-website/</li>
                                </ul>

                                <p>For at supervisor kan kører ngrok, så skal vi tilføje en configuration fil til supervisor, der giver alle de oplysninger omkring hvordan processen skal køres.</p>

                                <p>Stien, hvori supervisor skal have conf filen omkring de processer den skal håndtere, lokaliseres i <code>/etc/supervisor/conf.d/</code>. </p>

                                <p>Kør følgende for, at oprette og redigerer en conf fil,der giver supervisor oplysninger om hvordan den skal håndterer ngrok:</p>

                                <pre><code>$ sudo nano /etc/supervisor/conf.d/ngrok.conf
</code></pre>

                                <p>Og tilføj følgende i filen:</p>

                                <pre><code>[program:ngrok]
        command=sudo /path/to/ngrok start ssh -region=eu -config=/opt/ngrok/ngrok.yml -log stdout --authtoken &lt;YOUR_AUTH_TOKEN&gt;<br></br>
                                        autostart=true<br></br>
                                        autorestart=true<br></br>
                                        stdout_logfile=/var/log/ngrok.out.log<br></br>
                                        stderr_logfile=/var/log/ngrok.err.log<br></br>
                                </code></pre>

                                <p>Læg mærke til, at supervisor får defineret hvortil der skal skrives log omkring kørslen af ngrok til. Derefter rediger ngrok's configuration fil:</p>

                                <pre><code>$ sudo nano /opt/ngrok/ngrok.yml
</code></pre>

                                <p>Og tilføj følgende:</p>

                                <pre><code>web_addr: 0.0.0.0:4040<br></br>
                                        tunnels:<br></br>
                                        &ensp;&ensp;&ensp;ssh:<br></br>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;proto: tcp<br></br>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;addr: 0.0.0.0:22<br></br>
                                </code></pre>

                                <p><code>web_addr: 0.0.0.0:4040</code> angiver igen bare hvor du kan få vist ngrok's web interface (ddressen du skal bruge for at få oprette en SSH forbindelse).</p>

                                <p>Når vores supervisor konfigurationsfil er lavet og gemt, så kan vi informerer supervisor om, at vores nye program gennem supervisorctl kommando. Først fortæller vi supervisor at kigge efter nye eller ændringede program konfigurationer i <code>/etc/supervisor/conf.d</code> mappen med:</p>

                                <pre><code>$ sudo supervisorctl reread
</code></pre>

                                <p>Efterfulgt af at den skal benytte sig af ændringerne med:</p>

                                <pre><code>$ sudo supervisorctl update
</code></pre>

                                <p>For at tjekke om supervisor kører, kør følgende kommando:</p>

                                <pre><code>$ sudo supervisorctl
</code></pre>

                                <p>Det burde give følgende:</p>

                                <pre><code>$ sudo supervisorctl <br></br>
                                        ngrok           RUNNING   pid 2942, uptime 1:47:05 <br></br>
                                        supervisor&gt;
</code></pre>

                                <p>Hver gang du laver ændringer, eller tilføjer en ny konfirgurationsfil, kør de to forrige kommandoer for at supervisor kører ændringerne.</p>

                                <h2 id="step4qualityoflifetilfjelse">Step 4 | quality of life tilføjelse</h2>

                                <p>Husk at hvis din raspberry pi, ngrok eller supervisor genstarter, af en eller anden årsag, så kan både ngrok adressen og/eller port nummeret, man får givet af ngrok, ændre sig. Derfor tjek op på den inden du forsøger at oprette forbindelse, via. SSH, til din rasp-pi. </p>

                                <p>ssh conf</p>
                        </div>
                )
        }
};