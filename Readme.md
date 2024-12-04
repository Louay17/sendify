# Sendify app

[**Android: Preview the app (apk)**](<https://expo.dev/artifacts/eas/isy9wwoZTNUNfoZuWMP6Qh.apk>)

## Installation

To get started, clone the repository and install dependencies using `bun` (preferred). If you don't have `bun` installed, feel free to use any other package manager like `yarn` or `npm`.

### Installing dependencies

```sh
bun install
```

Or with other package managers:

```sh
yarn install
# or
npm install
```

## Setup for Android and iOS

For both platforms, you need to install the custom dev client or create one. To save time, I've created custom dev clients for both platforms, and you can download them directly from the links below:

- [Download Android APK](<https://expo.dev/artifacts/eas/2sm3pxobBR1ub4rUnSeaBa.apk>)
- [Download iOS IPA (for Simulators)](<https://expo.dev/artifacts/eas/7oaZHU1NYtGxXxAtDa1SyK.tar.gz>)

### Running the App

- **If you’ve downloaded the APK or IPA from the links above**, simply run:

  ```sh
  bun start
  ```

  This will start the development server and allow you to run the app on your device or simulator/emulator.

- **If you're building the app yourself** (or didn’t use the APK/IPA), follow these steps:

  1. **Prebuild the native project** for the respective platform:

     #### Android

     ```sh
     npx expo prebuild -p android
     ```

     #### iOS

     Ensure you have the latest version of Xcode installed. You can check and update Xcode from the Mac App Store.

     ```sh
     npx expo prebuild -p ios
     ```

  2. **Once the prebuild step is complete**, run the app using the following commands:

     #### Android

     ```sh
     bun android
     ```

     #### iOS

     ```sh
     bun ios
     ```

## Helpful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)