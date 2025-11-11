import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let serverProcess = null;
let restartCount = 0;
let consecutiveCrashes = 0;
const MAX_RESTARTS = 50;
const RESTART_DELAY = 3000;
const SUCCESS_RESET_TIME = 60000;

let serverStartTime = null;

function startServer() {
  restartCount++;
  serverStartTime = Date.now();
  console.log(`Starting server... (Restart attempt ${restartCount})`);
  
  serverProcess = spawn('node', ['src/index.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('exit', (code, signal) => {
    const runTime = Date.now() - serverStartTime;
    console.log(`Server exited with code ${code} and signal ${signal} after ${Math.round(runTime / 1000)}s`);
    
    if (code !== 0 && code !== null) {
      consecutiveCrashes++;
      
      if (runTime > SUCCESS_RESET_TIME) {
        consecutiveCrashes = 0;
        console.log('Server ran successfully. Resetting crash counter.');
      }
      
      if (consecutiveCrashes < MAX_RESTARTS) {
        console.log(`Server crashed. Restarting in ${RESTART_DELAY / 1000} seconds... (Consecutive crashes: ${consecutiveCrashes})`);
        setTimeout(() => {
          startServer();
        }, RESTART_DELAY);
      } else {
        console.error(`Server has crashed ${MAX_RESTARTS} times consecutively. Stopping auto-restart.`);
        process.exit(1);
      }
    } else {
      console.log('Server stopped normally.');
      process.exit(0);
    }
  });

  serverProcess.on('error', (error) => {
    console.error('Failed to start server:', error);
    consecutiveCrashes++;
    
    if (consecutiveCrashes < MAX_RESTARTS) {
      console.log(`Restarting in ${RESTART_DELAY / 1000} seconds...`);
      setTimeout(() => {
        startServer();
      }, RESTART_DELAY);
    } else {
      console.error(`Failed to start server ${MAX_RESTARTS} times consecutively. Stopping.`);
      process.exit(1);
    }
  });
}

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Shutting down gracefully...');
  if (serverProcess) {
    serverProcess.kill('SIGINT');
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM. Shutting down gracefully...');
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
  process.exit(0);
});

startServer();

