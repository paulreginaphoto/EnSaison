import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const isWindows = process.platform === "win32";

const androidStudioJbr = "C:\\Program Files\\Android\\Android Studio\\jbr";
const localAndroidSdk = process.env.LOCALAPPDATA
  ? join(process.env.LOCALAPPDATA, "Android", "Sdk")
  : "";

const env = {
  ...process.env,
  JAVA_HOME:
    process.env.JAVA_HOME ||
    (isWindows && existsSync(androidStudioJbr) ? androidStudioJbr : ""),
  ANDROID_HOME:
    process.env.ANDROID_HOME ||
    (localAndroidSdk && existsSync(localAndroidSdk) ? localAndroidSdk : ""),
};

env.ANDROID_SDK_ROOT = env.ANDROID_SDK_ROOT || env.ANDROID_HOME;
const pathKey =
  Object.keys(env).find((key) => key.toLowerCase() === "path") || "PATH";

if (env.JAVA_HOME) {
  env[pathKey] = `${join(env.JAVA_HOME, "bin")}${isWindows ? ";" : ":"}${env[pathKey]}`;
}

if (env.ANDROID_HOME) {
  env[pathKey] = `${join(env.ANDROID_HOME, "platform-tools")}${isWindows ? ";" : ":"}${env[pathKey]}`;
}

const run = (command, args, cwd = root) => {
  const actualCommand = isWindows ? "cmd.exe" : command;
  const actualArgs = isWindows ? ["/c", command, ...args] : args;
  const result = spawnSync(actualCommand, actualArgs, {
    cwd,
    env,
    shell: false,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    if (result.error) {
      console.error(result.error.message);
    }
    process.exit(result.status ?? 1);
  }
};

run(isWindows ? "npm" : "npm", ["run", "android:sync"]);
run(isWindows ? "gradlew.bat" : "./gradlew", ["assembleDebug"], join(root, "android"));
