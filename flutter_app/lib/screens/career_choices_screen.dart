import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

class CareerChoicesScreen extends StatelessWidget {
  const CareerChoicesScreen({super.key});

  static const _careers = <_CareerChoice>[
    _CareerChoice(
      'Software Engineering',
      'Build and maintain software, websites, and digital products.',
      Icons.code_rounded,
      Color(0xFFE7DEFF),
    ),
    _CareerChoice(
      'Data Science',
      'Use data, statistics, and programming to find useful patterns.',
      Icons.query_stats_rounded,
      Color(0xFFE0F3EF),
    ),
    _CareerChoice(
      'AI & Machine Learning',
      'Create systems that learn from data and help solve complex tasks.',
      Icons.auto_awesome_rounded,
      Color(0xFFFFE9D9),
    ),
    _CareerChoice(
      'Product Management',
      'Connect user needs, business goals, and product development.',
      Icons.track_changes_rounded,
      Color(0xFFE8EAFE),
    ),
    _CareerChoice(
      'UX / UI Design',
      'Plan and design clear, useful experiences for digital products.',
      Icons.palette_outlined,
      Color(0xFFFFE6F0),
    ),
    _CareerChoice(
      'Cloud Architecture',
      'Design and operate reliable systems using cloud technologies.',
      Icons.cloud_outlined,
      Color(0xFFE0F1FF),
    ),
    _CareerChoice(
      'Cybersecurity',
      'Help protect applications, networks, and information from threats.',
      Icons.shield_outlined,
      Color(0xFFE8EDF2),
    ),
    _CareerChoice(
      'Mobile Development',
      'Build apps and experiences for phones and tablets.',
      Icons.phone_iphone_rounded,
      Color(0xFFE5E4FF),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Career choices'),
        leading: IconButton(
          tooltip: 'Go home',
          onPressed: () => Navigator.pushNamedAndRemoveUntil(
            context,
            '/',
            (_) => false,
          ),
          icon: const Icon(Icons.home_rounded),
        ),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(22, 12, 22, 28),
          children: [
            const Text(
              'Explore what’s possible',
              style: TextStyle(
                color: AppTheme.ink,
                fontSize: 27,
                fontWeight: FontWeight.w800,
                letterSpacing: -.6,
              ),
            ),
            const SizedBox(height: 7),
            const Text(
              'Browse a few popular paths. Your personalized analysis can help you decide which direction fits your background and interests.',
              style: TextStyle(color: AppTheme.muted, height: 1.5, fontSize: 13),
            ),
            const SizedBox(height: 20),
            for (final career in _careers) ...[
              _CareerCard(career: career),
              const SizedBox(height: 10),
            ],
          ],
        ),
      ),
    );
  }
}

class _CareerChoice {
  const _CareerChoice(this.title, this.description, this.icon, this.tint);

  final String title;
  final String description;
  final IconData icon;
  final Color tint;
}

class _CareerCard extends StatelessWidget {
  const _CareerCard({required this.career});

  final _CareerChoice career;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: .88),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        children: [
          Container(
            width: 46,
            height: 46,
            decoration: BoxDecoration(
              color: career.tint,
              borderRadius: BorderRadius.circular(15),
            ),
            child: Icon(career.icon, color: AppTheme.accentDark, size: 22),
          ),
          const SizedBox(width: 13),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  career.title,
                  style: const TextStyle(
                    color: AppTheme.ink,
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  career.description,
                  style: const TextStyle(
                    color: AppTheme.muted,
                    fontSize: 11,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
