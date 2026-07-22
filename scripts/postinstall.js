const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Copiar archivo de entorno si no existe
const envPath = path.join(__dirname, '../src/environments/environment.ts');
const envExamplePath = path.join(__dirname, '../src/environments/environment.example.ts');
if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✓ Se copió el archivo de entorno por defecto.');
  } catch (err) {
    console.warn('Advertencia al copiar el archivo de entorno:', err);
  }
}

// 2. Copiar configuración de Firebase si no existe
const firebasePath = path.join(__dirname, '../src/firebase-config.json');
const firebaseExamplePath = path.join(__dirname, '../src/firebase-config.example.json');
if (!fs.existsSync(firebasePath) && fs.existsSync(firebaseExamplePath)) {
  try {
    fs.copyFileSync(firebaseExamplePath, firebasePath);
    console.log('✓ Se copió el archivo de configuración de Firebase por defecto.');
  } catch (err) {
    console.warn('Advertencia al copiar la configuración de Firebase:', err);
  }
}

// 3. Ejecutar npm install en la carpeta de Firebase Functions si no es entorno de CI y existe el directorio
const functionsDir = path.join(__dirname, '../functions');
if (!process.env.CI && fs.existsSync(functionsDir)) {
  try {
    console.log('Instalando dependencias de Functions...');
    execSync('npm install --legacy-peer-deps', { cwd: functionsDir, stdio: 'inherit' });
  } catch (err) {
    console.error('Error al instalar dependencias de Functions:', err);
  }
}
