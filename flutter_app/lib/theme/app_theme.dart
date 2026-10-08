import 'package:flutter/material.dart';

class AppTheme {
  static const background = Color(0xFFF8F5FF);
  static const surface = Color(0xFFFFFFFF);
  static const lavender = Color(0xFFEAE2FF);
  static const accent = Color(0xFF8A62E8);
  static const accentDark = Color(0xFF7047D2);
  static const ink = Color(0xFF242033);
  static const muted = Color(0xFF817C91);
  static const border = Color(0xFFECE8F3);
  static const mint = Color(0xFF6BBDAD);

  static ThemeData get light => ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: background,
        colorScheme: const ColorScheme.light(
          primary: accent,
          secondary: mint,
          surface: surface,
          error: Color(0xFFD95570),
          onSurface: ink,
        ),
        useMaterial3: true,
        fontFamily: 'Roboto',
        appBarTheme: const AppBarTheme(
          backgroundColor: background,
          foregroundColor: ink,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: TextStyle(color: ink, fontSize: 17, fontWeight: FontWeight.w700),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: const Color(0xFFFBFAFD),
          hintStyle: const TextStyle(color: muted),
          labelStyle: const TextStyle(color: muted),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 17),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(17),
            borderSide: const BorderSide(color: border),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(17),
            borderSide: const BorderSide(color: border),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(17),
            borderSide: const BorderSide(color: accent, width: 1.4),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(17),
            borderSide: const BorderSide(color: Color(0xFFD95570)),
          ),
        ),
      );
}
