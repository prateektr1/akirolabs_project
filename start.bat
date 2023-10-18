start cmd.exe /k "java -jar Generator-0.0.1-SNAPSHOT.jar" pause
start cmd.exe /k "java -jar Validator-0.0.1-SNAPSHOT.jar" pause
start cmd.exe /k
cd frontend/src
call npm install
call npm start