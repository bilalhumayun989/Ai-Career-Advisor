import 'dart:ui';

import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class CareerFormScreen extends StatefulWidget {
  const CareerFormScreen({super.key});

  @override
  State<CareerFormScreen> createState() => _CareerFormScreenState();
}

class _CareerFormScreenState extends State<CareerFormScreen> {
  final _api = ApiService();
  int _step = 0;
  bool _loading = false;
  String? _error;
  final Map<String, TextEditingController> _fields = {for (final key in _fieldLabels.keys) key: TextEditingController()};

  static const _steps = [
    ('About you', 'Let’s start with the essentials.', Icons.person_outline_rounded, ['fullName', 'age', 'email', 'location']),
    ('Education & skills', 'Your background and experience.', Icons.school_outlined, ['qualification', 'institute', 'field', 'gradYear', 'jobStatus', 'skills']),
    ('Your direction', 'What would you love to work toward?', Icons.explore_outlined, ['careerInterests', 'bio']),
  ];

  static const _fieldLabels = <String, String>{
    'fullName': 'Full name', 'age': 'Age', 'email': 'Email address', 'location': 'Location',
    'qualification': 'Highest qualification', 'institute': 'Institute or university', 'field': 'Field of study',
    'gradYear': 'Graduation year', 'jobStatus': 'Current job or status', 'skills': 'Skills and technologies',
    'careerInterests': 'Career interests and passions', 'bio': 'Your bio and career goals',
  };

  @override
  void dispose() {
    for (final field in _fields.values) { field.dispose(); }
    super.dispose();
  }

  bool _validateStep() {
    final keys = _steps[_step].$4;
    for (final key in keys) {
      if (_fields[key]!.text.trim().isEmpty) {
        setState(() => _error = 'Please complete all fields to continue.');
        return false;
      }
    }
    setState(() => _error = null);
    return true;
  }

  void _next() {
    if (_validateStep() && _step < _steps.length - 1) setState(() => _step++);
  }

  Future<void> _generate() async {
    if (!_validateStep()) return;
    setState(() { _loading = true; _error = null; });
    try {
      final profile = {for (final entry in _fields.entries) entry.key: entry.value.text.trim()};
      final result = await _api.analyzeCareer(profile);
      if (!mounted) return;
      Navigator.pushNamed(context, '/result', arguments: result);
    } on ApiException catch (error) {
      if (mounted) setState(() => _error = error.message);
    } catch (_) {
      if (mounted) setState(() => _error = 'Could not reach the server. Check your API address and try again.');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final step = _steps[_step];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Career profile'),
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
      body: SafeArea(child: Column(children: [
        Padding(padding: const EdgeInsets.fromLTRB(22, 8, 22, 10), child: Row(children: [
          for (var i = 0; i < _steps.length; i++) ...[
            Expanded(child: AnimatedContainer(duration: const Duration(milliseconds: 230), height: 5, decoration: BoxDecoration(color: i <= _step ? AppTheme.accent : const Color(0xFFE6E0F0), borderRadius: BorderRadius.circular(8)))),
            if (i < _steps.length - 1) const SizedBox(width: 7),
          ],
        ])),
        Expanded(child: ListView(padding: const EdgeInsets.fromLTRB(22, 14, 22, 20), children: [
          Row(children: [
            Container(width: 48, height: 48, decoration: BoxDecoration(color: AppTheme.lavender, borderRadius: BorderRadius.circular(16)), child: Icon(step.$3, color: AppTheme.accentDark)),
            const SizedBox(width: 12),
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('STEP ${_step + 1} OF ${_steps.length}', style: const TextStyle(color: AppTheme.accentDark, fontSize: 10, letterSpacing: 1.2, fontWeight: FontWeight.w800)), const SizedBox(height: 4), Text(step.$1, style: const TextStyle(color: AppTheme.ink, fontSize: 23, fontWeight: FontWeight.w800))]),
          ]),
          const SizedBox(height: 8),
          Text(step.$2, style: const TextStyle(color: AppTheme.muted, fontSize: 13)),
          const SizedBox(height: 23),
          for (final key in step.$4) ...[
            TextField(controller: _fields[key], keyboardType: key == 'age' || key == 'gradYear' ? TextInputType.number : TextInputType.text, maxLines: key == 'bio' ? 4 : 1, textCapitalization: TextCapitalization.sentences, decoration: InputDecoration(labelText: _fieldLabels[key], alignLabelWithHint: key == 'bio')),
            const SizedBox(height: 13),
          ],
          const SizedBox(height: 6),
          ClipRRect(borderRadius: BorderRadius.circular(18), child: BackdropFilter(filter: ImageFilter.blur(sigmaX: 7, sigmaY: 7), child: Container(padding: const EdgeInsets.all(14), decoration: BoxDecoration(color: Colors.white.withValues(alpha: .72), border: Border.all(color: Colors.white), borderRadius: BorderRadius.circular(18)), child: const Row(children: [Icon(Icons.auto_awesome_rounded, color: AppTheme.accent, size: 18), SizedBox(width: 10), Expanded(child: Text('Your answers help generate a personalized career direction.', style: TextStyle(color: AppTheme.muted, fontSize: 11, height: 1.4)))])))),
        ])),
        Padding(padding: const EdgeInsets.fromLTRB(22, 8, 22, 18), child: Column(children: [
          if (_error != null) ...[Text(_error!, style: const TextStyle(color: Color(0xFFD95570), fontSize: 12)), const SizedBox(height: 9)],
          Row(children: [
            if (_step > 0) ...[
              OutlinedButton(onPressed: _loading ? null : () => setState(() { _step--; _error = null; }), style: OutlinedButton.styleFrom(foregroundColor: AppTheme.accentDark, minimumSize: const Size(54, 56), side: const BorderSide(color: AppTheme.border), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18))), child: const Icon(Icons.arrow_back_rounded)),
              const SizedBox(width: 10),
            ],
            Expanded(child: PrimaryButton(label: _step == _steps.length - 1 ? 'Generate my roadmap' : 'Continue', icon: _step == _steps.length - 1 ? Icons.auto_awesome_rounded : Icons.arrow_forward_rounded, loading: _loading, onPressed: _step == _steps.length - 1 ? _generate : _next)),
          ]),
        ])),
      ])),
    );
  }
}
