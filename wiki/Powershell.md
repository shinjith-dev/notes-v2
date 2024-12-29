- Powershell can run encoded commands using:
```ps1
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -EncodedCommand encoded-command
```
Command used is encoded with **Base64** + **UTF-16LE (1200)**(text encoding)