import 'package:flutter/material.dart';

import 'screens/auth_screen.dart';
import 'screens/career_choices_screen.dart';
import 'screens/career_form_screen.dart';
import 'screens/home_screen.dart';
import 'screens/previous_career_choices_screen.dart';
import 'screens/result_screen.dart';
import 'theme/app_theme.dart';

class CareerAiApp extends StatelessWidget {
  const CareerAiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CareerAI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      initialRoute: '/',
      routes: {
        '/': (_) => const HomeScreen(),
        '/auth': (_) => const AuthScreen(),
        '/career-form': (_) => const CareerFormScreen(),
        '/career-choices': (_) => const CareerChoicesScreen(),
        '/previous-career-choices':
            (_) => const PreviousCareerChoicesScreen(),
        '/result': (_) => const ResultScreen(),
      },
    );
  }
}
