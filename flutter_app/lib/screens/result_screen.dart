import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key});

  List<_ResultSection> _parse(String text) {
    const headings = <(String, List<String>)>[
      ('Career direction', ['summary', 'career direction', 'suitable career']),
      ('Why this fits you', ['why this path', 'why this is suitable', 'explanation', 'suitable because']),
      ('Roles to explore', ['job roles', 'recommended roles', 'roles', 'positions']),
      ('Next steps', ['advice', 'next steps', 'helpful', 'tips', 'steps']),
    ];
    final sections = <_ResultSection>[];
    String? currentTitle;
    final lines = <String>[];
    for (final rawLine in text.split('\n')) {
      final line = rawLine.trim();
      if (line.isEmpty) continue;
      final normalized = line.toLowerCase().replaceAll(RegExp(r'[*#\-:]'), '').trim();
      String? matched;
      if (line.length < 85) {
        for (final heading in headings) {
          if (heading.$2.any(normalized.contains)) { matched = heading.$1; break; }
        }
      }
      if (matched != null) {
        if (currentTitle != null && lines.isNotEmpty) sections.add(_ResultSection(currentTitle, List.of(lines)));
        currentTitle = matched;
        lines.clear();
      } else {
        lines.add(line);
      }
    }
    if (currentTitle != null && lines.isNotEmpty) sections.add(_ResultSection(currentTitle, List.of(lines)));
    if (sections.isEmpty) sections.add(_ResultSection('Your career analysis', text.split('\n').where((line) => line.trim().isNotEmpty).toList()));
    return sections;
  }

  @override
  Widget build(BuildContext context) {
    final routeResult = ModalRoute.of(context)?.settings.arguments;
    final result = routeResult is String ? routeResult : null;
    final sections = result == null ? <_ResultSection>[] : _parse(result);
    return Scaffold(
      appBar: AppBar(title: const Text('Your roadmap'), leading: IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.arrow_back_rounded))),
      body: SafeArea(child: ListView(padding: const EdgeInsets.fromLTRB(22, 8, 22, 28), children: [
        Container(width: 54, height: 54, decoration: BoxDecoration(color: AppTheme.lavender, borderRadius: BorderRadius.circular(18)), child: const Icon(Icons.auto_awesome_rounded, color: AppTheme.accent, size: 26)),
        const SizedBox(height: 18),
        const Text('Your next chapter', style: TextStyle(color: AppTheme.ink, fontSize: 29, fontWeight: FontWeight.w800, letterSpacing: -.8)),
        const SizedBox(height: 6),
        const Text('A personal direction to help you move forward.', style: TextStyle(color: AppTheme.muted, fontSize: 13)),
        const SizedBox(height: 20),
        if (result == null)
          const _ResultCard(title: 'No analysis yet', icon: Icons.info_outline_rounded, lines: ['Complete the career profile to get your personalized recommendations.'])
        else
          for (var i = 0; i < sections.length; i++) ...[
            _ResultCard(title: sections[i].title, icon: _iconFor(i), lines: sections[i].lines),
            const SizedBox(height: 12),
          ],
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: PrimaryButton(
                label: 'New analysis',
                icon: Icons.refresh_rounded,
                onPressed: () => Navigator.pushNamedAndRemoveUntil(
                  context,
                  '/career-form',
                  (_) => false,
                ),
              ),
            ),
            const SizedBox(width: 10),
            OutlinedButton.icon(
              onPressed: () => Navigator.pushNamedAndRemoveUntil(
                context,
                '/',
                (_) => false,
              ),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppTheme.accentDark,
                minimumSize: const Size(0, 56),
                side: const BorderSide(color: AppTheme.border),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 14),
              ),
              icon: const Icon(Icons.home_rounded, size: 18),
              label: const Text('Home'),
            ),
          ],
        ),
      ])),
    );
  }

  IconData _iconFor(int index) => switch (index) {
        0 => Icons.explore_outlined,
        1 => Icons.lightbulb_outline_rounded,
        2 => Icons.work_outline_rounded,
        _ => Icons.check_circle_outline_rounded,
      };
}

class _ResultSection {
  const _ResultSection(this.title, this.lines);
  final String title;
  final List<String> lines;
}

class _ResultCard extends StatelessWidget {
  const _ResultCard({required this.title, required this.icon, required this.lines});
  final String title;
  final IconData icon;
  final List<String> lines;

  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(17),
        decoration: BoxDecoration(color: Colors.white.withValues(alpha: .88), borderRadius: BorderRadius.circular(21), border: Border.all(color: AppTheme.border), boxShadow: [BoxShadow(color: const Color(0xFF44306F).withValues(alpha: .035), blurRadius: 18, offset: const Offset(0, 7))]),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [Container(width: 36, height: 36, decoration: BoxDecoration(color: AppTheme.lavender, borderRadius: BorderRadius.circular(12)), child: Icon(icon, color: AppTheme.accentDark, size: 19)), const SizedBox(width: 10), Expanded(child: Text(title, style: const TextStyle(color: AppTheme.ink, fontSize: 15, fontWeight: FontWeight.w700)))]),
          const SizedBox(height: 13),
          for (final raw in lines) ...[
            if (RegExp(r'^[-•*]|^\d+[.)]\s').hasMatch(raw.trim()))
              Padding(padding: const EdgeInsets.only(bottom: 8), child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [const Padding(padding: EdgeInsets.only(top: 1), child: Icon(Icons.chevron_right_rounded, color: AppTheme.accent, size: 18)), const SizedBox(width: 4), Expanded(child: Text(raw.replaceFirst(RegExp(r'^[-•*\d.)\s]+'), ''), style: const TextStyle(color: AppTheme.muted, height: 1.5, fontSize: 13)))]))
            else
              Padding(padding: const EdgeInsets.only(bottom: 7), child: Text(raw, style: const TextStyle(color: AppTheme.muted, height: 1.55, fontSize: 13))),
          ],
        ]),
      );
}
