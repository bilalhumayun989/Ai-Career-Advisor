import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class PreviousCareerChoicesScreen extends StatefulWidget {
  const PreviousCareerChoicesScreen({super.key});

  @override
  State<PreviousCareerChoicesScreen> createState() =>
      _PreviousCareerChoicesScreenState();
}

class _PreviousCareerChoicesScreenState
    extends State<PreviousCareerChoicesScreen> {
  final _api = ApiService();
  bool _loading = true;
  List<Map<String, dynamic>> _history = [];

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    try {
      final history = await _api.readCareerHistory();
      if (mounted) setState(() => _history = history);
    } catch (_) {
      // Show the empty state if this device cannot read its local history.
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Previous career choices'),
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
        child: _loading
            ? const Center(
                child: CircularProgressIndicator(color: AppTheme.accent),
              )
            : _history.isEmpty
                ? _emptyState(context)
                : _historyList(context),
      ),
    );
  }

  Widget _emptyState(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(24, 42, 24, 24),
      children: [
        Container(
          width: 62,
          height: 62,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: AppTheme.lavender,
            borderRadius: BorderRadius.circular(20),
          ),
          child: const Icon(
            Icons.history_rounded,
            color: AppTheme.accentDark,
            size: 29,
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          'No previous choices yet',
          style: TextStyle(
            color: AppTheme.ink,
            fontSize: 23,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'After you complete a career analysis, your interests and result will appear here on this device.',
          style: TextStyle(color: AppTheme.muted, height: 1.5, fontSize: 13),
        ),
        const SizedBox(height: 22),
        PrimaryButton(
          label: 'Start career analysis',
          icon: Icons.auto_awesome_rounded,
          onPressed: () => Navigator.pushNamed(context, '/career-form'),
        ),
      ],
    );
  }

  Widget _historyList(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 28),
      children: [
        const Text(
          'Your saved analyses',
          style: TextStyle(
            color: AppTheme.ink,
            fontSize: 25,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 6),
        const Text(
          'Saved privately on this device for your account.',
          style: TextStyle(color: AppTheme.muted, fontSize: 12),
        ),
        const SizedBox(height: 18),
        for (final entry in _history) ...[
          _HistoryCard(
            interest: entry['careerInterests']?.toString() ?? '',
            date: _formatDate(entry['createdAt']?.toString()),
            onTap: () {
              final result = entry['result']?.toString();
              if (result == null || result.isEmpty) return;
              Navigator.pushNamed(context, '/result', arguments: result);
            },
          ),
          const SizedBox(height: 11),
        ],
      ],
    );
  }

  String _formatDate(String? rawDate) {
    final date = DateTime.tryParse(rawDate ?? '')?.toLocal();
    if (date == null) return 'Saved analysis';
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return '${months[date.month - 1]} ${date.day}, ${date.year}';
  }
}

class _HistoryCard extends StatelessWidget {
  const _HistoryCard({
    required this.interest,
    required this.date,
    required this.onTap,
  });

  final String interest;
  final String date;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final title = interest.trim().isEmpty ? 'Career roadmap' : interest.trim();
    return Material(
      color: Colors.white.withValues(alpha: .9),
      borderRadius: BorderRadius.circular(20),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.all(15),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppTheme.border),
          ),
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: AppTheme.lavender,
                  borderRadius: BorderRadius.circular(15),
                ),
                child: const Icon(
                  Icons.route_rounded,
                  color: AppTheme.accentDark,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: AppTheme.ink,
                        fontWeight: FontWeight.w700,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      date,
                      style: const TextStyle(
                        color: AppTheme.muted,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right_rounded, color: AppTheme.muted),
            ],
          ),
        ),
      ),
    );
  }
}
