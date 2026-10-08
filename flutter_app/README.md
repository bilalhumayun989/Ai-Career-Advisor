# CareerAI Flutter app

Flutter client for the existing CareerAI Express API. This folder contains a Flutter source scaffold and mobile UI; it does not change the web app or backend.

## Requirements

- Install Flutter and verify with `flutter doctor`.
- From this directory run `flutter create . --project-name career_ai_app --platforms android,ios` to generate the platform runner folders and package metadata. This preserves the Dart files here. Then run `flutter pub get` and `flutter run`.
- Start the existing backend from `server/` with `npm run dev`.

## API address

The app defaults to `http://localhost:5000` in Chrome/web and `http://10.0.2.2:5000` on an Android emulator. For a physical phone, use your computer's LAN IP, for example `--dart-define=API_BASE_URL=http://192.168.1.20:5000`. For iOS simulator, use `--dart-define=API_BASE_URL=http://localhost:5000`.

Start the backend in a separate terminal with `cd server` followed by `npm run dev`. Then start Flutter from this `flutter_app` directory with `flutter run -d chrome` or `flutter run` for an attached mobile device/emulator.

Current API endpoints used:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/career`

Career analysis currently does not require the login token, matching the existing server behavior.

The Flutter app keeps up to 10 previous analysis results in secure local storage, separated by signed-in email. This history is available on that device and is not synced to MongoDB or other devices.
