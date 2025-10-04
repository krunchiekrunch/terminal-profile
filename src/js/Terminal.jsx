import { useState, useEffect } from 'react';
import '../css/terminal.css';
import HackerSimulator from './HackSimulator';
const artStyle = {
  color: '#33FF57',
  whiteSpace: 'pre',
  fontFamily: 'monospace',
};
const terminalStyle = {
  color: '#FFFFFF',
  backgroundColor: '#2E2E2E',
  padding: '20px',
  borderRadius: '5px',
  whiteSpace: 'pre',
  fontFamily: 'monospace',
};
const Typewriter = (text, delay, func, Spinner, spinTime) => {
  const startTime = new Date();
  let Output = '';
  let index = 0;
  text = Spinner ? "⠋⠙⠹⠸⠼⠴⠦⠧⠇" : text;



  const intervalId = setInterval(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        return clearInterval(intervalId);
      }
    });

    const endTime = new Date();
    if (index < text.length) {
      Output += text[index];
      index += 1;

      if (Spinner) {
        func(text[index]);
        setTimeout(function () {
          func(text[index + 1]);
        }, 700);
        if (index === 8) {
          if (endTime.getTime() - startTime.getTime() < spinTime) {
            index = 0;
          } else {
            clearInterval(intervalId);
          }
        }
      } else {
        func(Output);
      }
    } else {
      return clearInterval(intervalId);
    }
  }, delay);
};

// Move Terminal outside of Typewriter
function Terminal() {
  const [Text1, setText1] = useState('');
  const [Text2, setText2] = useState('');
  const [Text3, setText3] = useState('');
  const [Text4, setText4] = useState('');
  const cursor = '▮';
  let previousCommand;
  const [prevusedCommand, setprevusedCommand] = useState([]);

  function SkipIntro() {
    let id = setTimeout(() => { }, 0);
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => { }, 0);
    while (id--) {
      clearInterval(id);
    }
    setText1("ssh guest@krunch.local");
    setText3("Access Granted!");
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (!Text3.includes("Access")) {
          let id = setTimeout(() => { }, 0);
          while (id--) {
            clearTimeout(id);
          }

          id = setInterval(() => { }, 0);
          while (id--) {
            clearInterval(id);
          }
          setText1("ssh guest@krunch.local");
          setText2("guest@krunch.local's password:");
          setText3("Access Granted!");
        }
        const CommandArea = document.getElementById("command");
        if (CommandArea) {
          previousCommand = CommandArea.value;
          setprevusedCommand((prevArray) => [...prevArray, "guest@krunch.local:~$ " + previousCommand]);
          if (CommandArea.value === "github") {
            window.open("https://github.com/krunchiekrunch", '_blank');
          } else if (CommandArea.value === "source") {
            window.open("https://github.com/krunchiekrunch/terminal-profile", '_blank');
          } else if (CommandArea.value === "discord") {
            window.open("https://discordapp.com/users/1166013268008120340", '_blank');
          }
          CommandArea.value = "";
        }
      }
    });

    Typewriter("ssh guest@krunch.local", 100, setText1);

    setTimeout(() => {
      setText2("guest@krunch.local's password:▮");
    }, 3000);

    setTimeout(() => {
      Typewriter("", 100, setText4, true, 2500);
    }, 4300);

    setTimeout(() => {
      setText3("Connecting to guest@krunch.local...");
    }, 4300);

    setTimeout(() => {
      setText2("guest@krunch.local's password:");
      setText3("> Access granted.");
    }, 7300);
  }, []);

  return (
    <div className="terminal">
      <div className='console'>
        <span className='userPrefix'>user@raspberrypi:~$
          <span style={{ color: "white", marginLeft: "8px" }}>{Text1}{Text1.length === 20 ? "" : cursor}</span>
        </span>

        {Text3.includes("Access") ? "" : <span id='skipButton' onClick={SkipIntro}>Press Enter or Click Here to Skip</span>}
        {Text2}
        <span> {Text4} <span style={{ color: Text3.includes("Access") ? ("yellow") : "" }} >{Text3}</span></span>
        <br />
        {Text3.includes("Access") ? (
<pre>
{`

██╗░░██╗██████╗░██╗░░░██╗███╗░░██╗░█████╗░██╗░░██╗
██║░██╔╝██╔══██╗██║░░░██║████╗░██║██╔══██╗██║░░██║
█████═╝░██████╔╝██║░░░██║██╔██╗██║██║░░╚═╝███████║
██╔═██╗░██╔══██╗██║░░░██║██║╚████║██║░░██╗██╔══██║
██║░╚██╗██║░░██║╚██████╔╝██║░╚███║╚█████╔╝██║░░██║
╚═╝░░╚═╝╚═╝░░╚═╝░╚═════╝░╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝
`}
</pre>

) : null}

        {Text3.includes("Access") ? <span>Welcome!</span> : ""}
        {Text3.includes("Access") ? <span></span> : ""}<br />
        {Text3.includes("Access") ? <span><span style={{ color: "skyblue" }}>Available Commands:</span></span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>General: </span> about, hacksim, neofetch, clear</span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>Links:</span> github, source, discord</span> : ""}

        <br></br>
        {Text3.includes("Access") ? <span>Thank you for visiting!◝(ᵔᵕᵔ)◜</span> : ""}
        <br></br>
        <ul className='previousCommands' id='console23'>
          {prevusedCommand.map((item, index) => {
            if (item.match(new RegExp(`\\b${"github"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened the URL to my GitHub in a new tab: https://github.com/krunchiekrunch</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"source"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened the source code of this site in a new tab: https://github.com/krunchiekrunch/terminal-profile</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"discord"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened the URL to my Discord in a new tab: https://discordapp.com/users/1166013268008120340</span><br></br><br></br></li>;
            }

            else if (item.match(new RegExp(`\\b${"hacksim"}\\b`, 'g'))) {
              return <div><HackerSimulator></HackerSimulator><br></br>
                To abort, use aborthack
              </div>
            }
            else if (item.match(new RegExp(`\\b${"aborthack"}\\b`, 'g'))) {
              return <div key={index}><li>{item}</li>
                bash: {item.replace("guest@hacker.me:~$", '')}: ERROR - Script terminated by the user</div>;
            }
            else if (item.match(new RegExp(`\\b${"clear"}\\b`, 'g'))) {
              return setprevusedCommand([]);
            }
            else if (item.match(new RegExp(`\\b${"about"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <div className='about'><br></br>
                Welcome to my website!<br></br><br></br>
                </div></div>
            }
             else if (item.match(new RegExp(`\\b${"neofetch"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <div className='neofetch'><br></br>
                <div style={{ display: 'flex' }}>
                {/* ASCII Art on the left */}
                <div style={artStyle}>{`
        _,met$$$$$gg.     
      ,g$$$$$$$$$$$$$$$P.     
    ,g$$P""       """Y$$.".     
  ,$$P'              \`$$$.       
',$$P       ,ggs.     \`$$b:     
\`d$$'     ,$P"'   .    $$$     
  $$P      d$'     ,    $$P
  $$:      $$.   -    ,d$$'
  $$;      Y$b._   _,d$P'
  Y$$.    \`.\`"Y$$$$P"' 
  \`$$b      "-.__
  \`Y$$b
    \`Y$$.
      \`$$b.
        \`Y$$b.
          \`"Y$b._
              \`""""
             `}</div>

                {/* Terminal text on the right */}
                <div style={terminalStyle}>
                  <span style={{ color: "#33FF57" }}>guest@krunch.local</span><br />
                  -------------------------<br />
                  <span style={{ color: "#33FF57" }}>OS:</span>  Debian GNU/Linux 12 (bookworm) aarch64<br />
                  <span style={{ color: "#33FF57" }}>Host:</span> Raspberry Pi 3 Model B Rev 1.2<br />
                  <span style={{ color: "#33FF57" }}>Kernel:</span> Linux 6.6.74+rpt-rpi-v8<br />
                  <span style={{ color: "#33FF57" }}>Uptime:</span> 1 day, 18 hours, 24 mins<br />
                  <span style={{ color: "#33FF57" }}>Resolution:</span> 1920x1080<br />
                  <span style={{ color: "#33FF57" }}>DE:</span> LXDE<br />
                  <span style={{ color: "#33FF57" }}>WM:</span> Openbox (X11)<br />
                  <span style={{ color: "#33FF57" }}>Theme:</span> Clearlooks<br />
                  <span style={{ color: "#33FF57" }}>Terminal:</span> /dev/pts/0<br />
                  <span style={{ color: "#33FF57" }}>CPU:</span> BCM2837 (4) @ 1.20 GHz<br />
                  <span style={{ color: "#33FF57" }}>GPU:</span> Broadcom bcm2835-vc4 [Integrated]<br />
                  
                  <span style={{color: "#FFFF00"}}>Message of the Day:</span> Hello World!<br /><br />
                </div>
                </div>
                </div>
                </div>
            } else {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@hacker.me:~$", '')}: command not found</div>;
            }
          })}
        </ul>
        {Text3.includes("Access") ? <span className='commands'><span className='userPrefix'>guest@krunch.local:~$</span> <input type="text" id="command" name="command" autoFocus></input></span> : ""}
      </div>
    </div>
  );
}


export default Terminal;
