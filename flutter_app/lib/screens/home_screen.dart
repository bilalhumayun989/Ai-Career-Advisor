import 'dart:ui';

import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _api = ApiService();
  bool _loading = true;
  bool _accountBusy = false;
  bool _signedIn = false;
  int _tab = 0;
  String? _name;
  String? _email;
  List<Map<String, dynamic>> _careerHistory = [];

  @override
  void initState() {
    super.initState();
    _loadSession();
  }

  Future<void> _loadSession() async {
    String? token;
    Map<String, String?> user = {};
    List<Map<String, dynamic>> history = [];
    try {
      token = await _api.readToken();
      if (token != null) {
        user = await _api.readUserInfo();
        history = await _api.readCareerHistory();
      }
    } catch (_) {
      // Treat unavailable local storage as a signed-out session.
    }
    if (!mounted) return;
    setState(() {
      _signedIn = token != null;
      _name = user['name'];
      _email = user['email'];
      _careerHistory = history;
      _loading = false;
    });
  }

  Future<void> _continue(BuildContext context) async {
    final token = await _api.readToken();
    if (!context.mounted) return;
    Navigator.pushNamed(context, token == null ? '/auth' : '/career-form');
  }

  Future<void> _signOut() async {
    await _api.logout();
    if (!mounted) return;
    setState(() {
      _signedIn = false;
      _name = null;
      _email = null;
      _careerHistory = [];
      _tab = 0;
    });
  }

  Future<void> _editAccountName() async {
    final newName = await showDialog<String>(
      context: context,
      builder: (_) => _EditNameDialog(initialName: _name ?? ''),
    );
    if (newName == null || newName == _name || !mounted) return;

    setState(() => _accountBusy = true);
    try {
      await _api.changeName(newName);
      if (!mounted) return;
      setState(() => _name = newName);
      _showAccountMessage('Your name has been updated.');
    } on ApiException catch (error) {
      if (mounted) _showAccountMessage(error.message, isError: true);
    } catch (_) {
      if (mounted) _showAccountMessage('Could not update your name.', isError: true);
    } finally {
      if (mounted) setState(() => _accountBusy = false);
    }
  }

  Future<void> _changeAccountPassword() async {
    final passwords = await showDialog<List<String>>(
      context: context,
      builder: (_) => const _ChangePasswordDialog(),
    );
    if (passwords == null || !mounted) return;

    setState(() => _accountBusy = true);
    try {
      await _api.changePassword(
        currentPassword: passwords[0],
        newPassword: passwords[1],
        confirmPassword: passwords[2],
      );
      if (mounted) _showAccountMessage('Your password has been changed.');
    } on ApiException catch (error) {
      if (mounted) _showAccountMessage(error.message, isError: true);
    } catch (_) {
      if (mounted) _showAccountMessage('Could not change your password.', isError: true);
    } finally {
      if (mounted) setState(() => _accountBusy = false);
    }
  }

  Future<void> _confirmSignOut() async {
    final shouldSignOut = await showDialog<bool>(
      context: context,
      builder: (_) => const _ConfirmSignOutDialog(),
    );
    if (shouldSignOut == true) await _signOut();
  }

  void _showAccountMessage(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? const Color(0xFFC94359) : AppTheme.accentDark,
      ),
    );
  }

  Future<void> _refreshCareerHistory() async {
    try {
      final history = await _api.readCareerHistory();
      if (mounted) setState(() => _careerHistory = history);
    } catch (_) {
      // Keep the current dashboard visible if local history is unavailable.
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator(color: AppTheme.accent)),
      );
    }
    if (_signedIn) return _buildDashboard(context);

    return Scaffold(
      body: Stack(
        children: [
          const Positioned(
              top: -95,
              right: -75,
              child: _GlowOrb(size: 270, color: Color(0xFFDDCEFF))),
          const Positioned(
              bottom: 80,
              left: -145,
              child: _GlowOrb(size: 270, color: Color(0xFFEDE2FF))),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 12, 24, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(children: [
                    const _BrandMark(),
                    const SizedBox(width: 10),
                    const Text('CareerAI',
                        style: TextStyle(
                            fontSize: 21,
                            color: AppTheme.accent,
                            fontWeight: FontWeight.w700,
                            letterSpacing: -.6)),
                    const Spacer(),
                    TextButton(
                        onPressed: () => Navigator.pushNamed(context, '/auth'),
                        child: const Text('Sign in',
                            style: TextStyle(
                                color: AppTheme.accentDark,
                                fontWeight: FontWeight.w700))),
                  ]),
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 28),
                            const _HeroGlass(),
                            const SizedBox(height: 27),
                            const Text('Your career,',
                                style: TextStyle(
                                    fontSize: 34,
                                    height: 1.1,
                                    letterSpacing: -1.1,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.ink)),
                            const Text('reimagined.',
                                style: TextStyle(
                                    fontSize: 34,
                                    height: 1.1,
                                    letterSpacing: -1.1,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.accent)),
                            const SizedBox(height: 13),
                            const Text(
                                'A personal career roadmap shaped around your skills, experience, and goals.',
                                style: TextStyle(
                                    color: AppTheme.muted,
                                    height: 1.55,
                                    fontSize: 14)),
                            const SizedBox(height: 22),
                            const Text('What you will get',
                                style: TextStyle(
                                    color: AppTheme.ink,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w800)),
                            const SizedBox(height: 12),
                            const _IntroBenefit(
                                icon: Icons.explore_outlined,
                                title: 'Career direction',
                                detail:
                                    'A personalized summary based on your background and interests.'),
                            const SizedBox(height: 11),
                            const _IntroBenefit(
                                icon: Icons.work_outline_rounded,
                                title: 'Roles and next steps',
                                detail:
                                    'Job ideas and practical guidance to help you move forward.'),
                            const SizedBox(height: 23),
                            PrimaryButton(
                                label: 'Build my career roadmap',
                                icon: Icons.arrow_forward_rounded,
                                onPressed: () => _continue(context)),
                            const SizedBox(height: 12),
                            const Center(
                                child: Text(
                                    'Personal guidance, one thoughtful step at a time.',
                                    style: TextStyle(
                                        color: AppTheme.muted, fontSize: 11))),
                            const SizedBox(height: 8),
                          ]),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDashboard(BuildContext context) {
    final displayName =
        (_name?.trim().isNotEmpty ?? false) ? _name!.trim() : 'there';
    return Scaffold(
      appBar: AppBar(
        title: const Row(children: [
          _BrandMark(),
          SizedBox(width: 10),
          Text('CareerAI',
              style: TextStyle(
                  color: AppTheme.accent, fontWeight: FontWeight.w700)),
        ]),
        actions: [
          IconButton(
            tooltip: 'Account',
            onPressed: () => setState(() => _tab = 1),
            icon: CircleAvatar(
              radius: 17,
              backgroundColor: AppTheme.lavender,
              child: Text(displayName[0].toUpperCase(),
                  style: const TextStyle(
                      color: AppTheme.accentDark, fontWeight: FontWeight.w700)),
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: _tab == 0
            ? _dashboardOverview(displayName)
            : _accountPage(displayName),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Container(
          height: 76,
          decoration: BoxDecoration(
            color: const Color(0xFFFCFAFF),
            border: Border(
              top: BorderSide(color: AppTheme.border.withValues(alpha: .8)),
            ),
          ),
          child: Row(
            children: [
              _BottomNavItem(
                icon: Icons.home_outlined,
                selectedIcon: Icons.home_rounded,
                label: 'Home',
                selected: _tab == 0,
                onTap: () => setState(() => _tab = 0),
              ),
              _BottomNavItem(
                icon: Icons.person_outline_rounded,
                selectedIcon: Icons.person_rounded,
                label: 'Account',
                selected: _tab == 1,
                onTap: () => setState(() => _tab = 1),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _dashboardOverview(String displayName) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(22, 18, 22, 28),
      children: [
        const Text('YOUR CAREER SPACE',
            style: TextStyle(
                color: AppTheme.accentDark,
                fontSize: 10,
                letterSpacing: 1.4,
                fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        Text('Hi, $displayName!',
            style: const TextStyle(
                color: AppTheme.ink,
                fontSize: 30,
                fontWeight: FontWeight.w800,
                letterSpacing: -.7)),
        const SizedBox(height: 6),
        const Text('Ready to explore your next career move?',
            style: TextStyle(color: AppTheme.muted, fontSize: 13)),
        const SizedBox(height: 21),
        const Text('Build your personalized plan',
            style: TextStyle(
                color: AppTheme.ink,
                fontSize: 19,
                fontWeight: FontWeight.w800)),
        const SizedBox(height: 6),
        const Text(
            'Share your background to get a personalized direction and role suggestions.',
            style:
                TextStyle(color: AppTheme.muted, fontSize: 13, height: 1.45)),
        const SizedBox(height: 15),
        PrimaryButton(
          label: 'Start career analysis',
          icon: Icons.auto_awesome_rounded,
          onPressed: () async {
            await Navigator.pushNamed(context, '/career-form');
            await _refreshCareerHistory();
          },
        ),
        const SizedBox(height: 25),
        _CareerActivityCard(history: _careerHistory),
        const SizedBox(height: 25),
        const Text(
          'Your career tools',
          style: TextStyle(
            color: AppTheme.ink,
            fontSize: 17,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 12),
        _DashboardActionCard(
          icon: Icons.explore_rounded,
          tint: const Color(0xFFE9E1FF),
          title: 'Explore career choices',
          subtitle: 'Browse popular career paths',
          onTap: () => Navigator.pushNamed(context, '/career-choices'),
        ),
        const SizedBox(height: 11),
        _DashboardActionCard(
          icon: Icons.history_rounded,
          tint: const Color(0xFFDFF3EF),
          title: 'Previous career choices',
          subtitle: 'Reopen your saved analyses',
          onTap: () => Navigator.pushNamed(context, '/previous-career-choices'),
        ),
      ],
    );
  }

  Widget _accountPage(String displayName) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(22, 20, 22, 28),
      children: [
        const Text('ACCOUNT',
            style: TextStyle(
                color: AppTheme.accentDark,
                fontSize: 10,
                letterSpacing: 1.4,
                fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        const Text('Your information',
            style: TextStyle(
                color: AppTheme.ink,
                fontSize: 27,
                fontWeight: FontWeight.w800)),
        const SizedBox(height: 6),
        const Text('Manage your profile and sign-in details.',
            style: TextStyle(color: AppTheme.muted, fontSize: 13)),
        const SizedBox(height: 19),
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Colors.white, Color(0xFFF0EAFE)],
            ),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AppTheme.border),
          ),
          child: Row(
            children: [
              Container(
                width: 58,
                height: 58,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppTheme.accent, AppTheme.accentDark],
                  ),
                  borderRadius: BorderRadius.circular(19),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.accentDark.withValues(alpha: .2),
                      blurRadius: 14,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                alignment: Alignment.center,
                child: Text(
                  displayName[0].toUpperCase(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(displayName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            color: AppTheme.ink,
                            fontSize: 17,
                            fontWeight: FontWeight.w800)),
                    const SizedBox(height: 5),
                    Text(_email ?? 'Email not available',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            color: AppTheme.muted, fontSize: 12)),
                  ],
                ),
              ),
              const SizedBox(width: 5),
              Icon(Icons.verified_user_outlined,
                  color: AppTheme.accentDark.withValues(alpha: .8), size: 21),
            ],
          ),
        ),
        const SizedBox(height: 22),
        const _AccountSectionHeading(
            title: 'Profile', subtitle: 'Keep your account details up to date.'),
        const SizedBox(height: 10),
        _AccountActionTile(
          icon: Icons.badge_outlined,
          title: 'Name',
          detail: displayName,
          onTap: _accountBusy ? null : _editAccountName,
        ),
        const SizedBox(height: 9),
        _AccountActionTile(
          icon: Icons.email_outlined,
          title: 'Email address',
          detail: _email ?? 'Email not available',
          onTap: null,
        ),
        const SizedBox(height: 22),
        const _AccountSectionHeading(
            title: 'Security', subtitle: 'Protect access to your account.'),
        const SizedBox(height: 10),
        _AccountActionTile(
          icon: Icons.lock_reset_rounded,
          title: 'Change password',
          detail: 'Verify your current password to choose a new one.',
          onTap: _accountBusy ? null : _changeAccountPassword,
        ),
        if (_accountBusy) ...[
          const SizedBox(height: 12),
          const LinearProgressIndicator(color: AppTheme.accent),
        ],
        const SizedBox(height: 23),
        Container(
          padding: const EdgeInsets.all(17),
          decoration: BoxDecoration(
            color: const Color(0xFFFFF4F5),
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: const Color(0xFFF4D8DC)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Sign out of CareerAI',
                  style: TextStyle(
                      color: AppTheme.ink,
                      fontSize: 15,
                      fontWeight: FontWeight.w800)),
              const SizedBox(height: 5),
              const Text(
                'This removes your sign-in from this device. Your account remains active, and you can sign in again anytime.',
                style: TextStyle(
                    color: AppTheme.muted, fontSize: 12, height: 1.45),
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  onPressed: _accountBusy ? null : _confirmSignOut,
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xFFC94359),
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(50),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15)),
                  ),
                  icon: const Icon(Icons.logout_rounded, size: 19),
                  label: const Text('Sign out',
                      style: TextStyle(fontWeight: FontWeight.w700)),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _ConfirmSignOutDialog extends StatelessWidget {
  const _ConfirmSignOutDialog();

  @override
  Widget build(BuildContext context) => Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: const EdgeInsets.symmetric(horizontal: 22, vertical: 24),
        child: Container(
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(28),
            border: Border.all(color: const Color(0xFFF4D8DC)),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFC94359).withValues(alpha: .13),
                blurRadius: 28,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                width: 52,
                height: 52,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFEEF0),
                  borderRadius: BorderRadius.circular(18),
                ),
                child: const Icon(Icons.logout_rounded,
                    color: Color(0xFFC94359), size: 24),
              ),
              const SizedBox(height: 15),
              const Text('Sign out of CareerAI?',
                  style: TextStyle(
                      color: AppTheme.ink,
                      fontSize: 19,
                      fontWeight: FontWeight.w800)),
              const SizedBox(height: 7),
              const Text(
                'This removes your sign-in from this device. Your account and saved career analyses remain available when you sign in again.',
                style: TextStyle(
                    color: AppTheme.muted, fontSize: 12, height: 1.5),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context, false),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppTheme.accentDark,
                        minimumSize: const Size.fromHeight(48),
                        side: const BorderSide(color: AppTheme.border),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                      ),
                      child: const Text('Stay signed in'),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: () => Navigator.pop(context, true),
                      style: FilledButton.styleFrom(
                        backgroundColor: const Color(0xFFC94359),
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(48),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                      ),
                      icon: const Icon(Icons.logout_rounded, size: 17),
                      label: const Text('Sign out'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
}

class _EditNameDialog extends StatefulWidget {
  const _EditNameDialog({required this.initialName});

  final String initialName;

  @override
  State<_EditNameDialog> createState() => _EditNameDialogState();
}

class _EditNameDialogState extends State<_EditNameDialog> {
  late final TextEditingController _nameController;
  String? _error;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.initialName);
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: const EdgeInsets.symmetric(horizontal: 22, vertical: 24),
        child: Container(
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(28),
            border: Border.all(color: AppTheme.border),
            boxShadow: [
              BoxShadow(
                color: AppTheme.accentDark.withValues(alpha: .16),
                blurRadius: 30,
                offset: const Offset(0, 12),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _AccountDialogHeader(
                icon: Icons.badge_outlined,
                title: 'Edit your name',
                subtitle: 'This name appears on your career home page.',
                onClose: () => Navigator.pop(context),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _nameController,
                autofocus: true,
                maxLength: 80,
                textCapitalization: TextCapitalization.words,
                onChanged: (_) {
                  if (_error != null) setState(() => _error = null);
                },
                decoration: InputDecoration(
                  labelText: 'Full name',
                  prefixIcon: const Icon(Icons.person_outline_rounded),
                  errorText: _error,
                ),
              ),
              const SizedBox(height: 18),
              _AccountDialogActions(
                cancelLabel: 'Cancel',
                confirmLabel: 'Save name',
                onCancel: () => Navigator.pop(context),
                onConfirm: () {
                  final name = _nameController.text.trim();
                  if (name.length < 2) {
                    setState(() => _error = 'Enter at least 2 characters.');
                    return;
                  }
                  Navigator.pop(context, name);
                },
              ),
            ],
          ),
        ),
      );
}

class _ChangePasswordDialog extends StatefulWidget {
  const _ChangePasswordDialog();

  @override
  State<_ChangePasswordDialog> createState() => _ChangePasswordDialogState();
}

class _ChangePasswordDialogState extends State<_ChangePasswordDialog> {
  final _currentController = TextEditingController();
  final _newController = TextEditingController();
  final _confirmController = TextEditingController();
  final List<bool> _visiblePasswords = [false, false, false];
  String? _error;

  @override
  void dispose() {
    _currentController.dispose();
    _newController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  void _submit() {
    final current = _currentController.text;
    final next = _newController.text;
    final confirm = _confirmController.text;
    if (current.isEmpty) {
      setState(() => _error = 'Enter your current password.');
    } else if (next.length < 8) {
      setState(() => _error = 'Use at least 8 characters for the new password.');
    } else if (next != confirm) {
      setState(() => _error = 'The new passwords do not match.');
    } else {
      Navigator.pop(context, [current, next, confirm]);
    }
  }

  @override
  Widget build(BuildContext context) => Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.sizeOf(context).height * .84,
            maxWidth: 480,
          ),
          child: SingleChildScrollView(
            child: Container(
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(28),
                border: Border.all(color: AppTheme.border),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.accentDark.withValues(alpha: .16),
                    blurRadius: 30,
                    offset: const Offset(0, 12),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _AccountDialogHeader(
                    icon: Icons.lock_reset_rounded,
                    title: 'Change password',
                    subtitle: 'Confirm your current password to secure your account.',
                    onClose: () => Navigator.pop(context),
                  ),
                  const SizedBox(height: 20),
                  _passwordInput(
                    controller: _currentController,
                    label: 'Current password',
                    icon: Icons.lock_outline_rounded,
                    index: 0,
                  ),
                  const SizedBox(height: 10),
                  _passwordInput(
                    controller: _newController,
                    label: 'New password',
                    icon: Icons.key_outlined,
                    index: 1,
                  ),
                  const SizedBox(height: 10),
                  _passwordInput(
                    controller: _confirmController,
                    label: 'Confirm new password',
                    icon: Icons.verified_user_outlined,
                    index: 2,
                  ),
                  if (_error != null) ...[
                    Container(
                      padding: const EdgeInsets.all(11),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFFF1F3),
                        borderRadius: BorderRadius.circular(13),
                      ),
                      child: Text(
                        _error!,
                        style: const TextStyle(
                          color: Color(0xFFC94359),
                          fontSize: 12,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                  ],
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton.icon(
                      onPressed: _submit,
                      style: FilledButton.styleFrom(
                        backgroundColor: AppTheme.accent,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(50),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                      ),
                      icon: const Icon(Icons.check_rounded, size: 19),
                      label: const Text('Update password',
                          maxLines: 1,
                          style: TextStyle(fontWeight: FontWeight.w700)),
                    ),
                  ),
                  Center(
                    child: TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Cancel'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );

  Widget _passwordInput({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    required int index,
  }) =>
      TextField(
        controller: controller,
        obscureText: !_visiblePasswords[index],
        decoration: InputDecoration(
          labelText: label,
          isDense: true,
          prefixIcon: Icon(icon),
          suffixIcon: IconButton(
            tooltip:
                _visiblePasswords[index] ? 'Hide password' : 'Show password',
            visualDensity: VisualDensity.compact,
            onPressed: () => setState(
                () => _visiblePasswords[index] = !_visiblePasswords[index]),
            icon: Icon(_visiblePasswords[index]
                ? Icons.visibility_off_outlined
                : Icons.visibility_outlined),
          ),
        ),
        onChanged: (_) {
          if (_error != null) setState(() => _error = null);
        },
      );
}

class _AccountDialogHeader extends StatelessWidget {
  const _AccountDialogHeader({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onClose,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) => Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 46,
            height: 46,
            decoration: BoxDecoration(
              color: AppTheme.lavender,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: AppTheme.accentDark, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        color: AppTheme.ink,
                        fontSize: 18,
                        fontWeight: FontWeight.w800)),
                const SizedBox(height: 4),
                Text(subtitle,
                    style: const TextStyle(
                        color: AppTheme.muted, fontSize: 11, height: 1.4)),
              ],
            ),
          ),
          IconButton(
            onPressed: onClose,
            visualDensity: VisualDensity.compact,
            icon: const Icon(Icons.close_rounded, color: AppTheme.muted),
          ),
        ],
      );
}

class _AccountDialogActions extends StatelessWidget {
  const _AccountDialogActions({
    required this.cancelLabel,
    required this.confirmLabel,
    required this.onCancel,
    required this.onConfirm,
  });

  final String cancelLabel;
  final String confirmLabel;
  final VoidCallback onCancel;
  final VoidCallback onConfirm;

  @override
  Widget build(BuildContext context) => Row(
        children: [
          Expanded(
            child: OutlinedButton(
              onPressed: onCancel,
              style: OutlinedButton.styleFrom(
                foregroundColor: AppTheme.accentDark,
                minimumSize: const Size.fromHeight(48),
                side: const BorderSide(color: AppTheme.border),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15)),
              ),
              child: Text(cancelLabel),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: FilledButton(
              onPressed: onConfirm,
              style: FilledButton.styleFrom(
                backgroundColor: AppTheme.accent,
                foregroundColor: Colors.white,
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15)),
              ),
              child: Text(confirmLabel),
            ),
          ),
        ],
      );
}

class _AccountSectionHeading extends StatelessWidget {
  const _AccountSectionHeading({required this.title, required this.subtitle});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: const TextStyle(
                  color: AppTheme.ink,
                  fontSize: 16,
                  fontWeight: FontWeight.w800)),
          const SizedBox(height: 3),
          Text(subtitle,
              style: const TextStyle(color: AppTheme.muted, fontSize: 11.5)),
        ],
      );
}

class _AccountActionTile extends StatelessWidget {
  const _AccountActionTile({
    required this.icon,
    required this.title,
    required this.detail,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String detail;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) => Material(
        color: Colors.white.withValues(alpha: .9),
        borderRadius: BorderRadius.circular(18),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(18),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: AppTheme.border),
            ),
            child: Row(
              children: [
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    color: AppTheme.lavender.withValues(alpha: .8),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(icon, color: AppTheme.accentDark, size: 20),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title,
                          style: const TextStyle(
                              color: AppTheme.ink,
                              fontSize: 13,
                              fontWeight: FontWeight.w700)),
                      const SizedBox(height: 3),
                      Text(detail,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              color: AppTheme.muted,
                              fontSize: 11,
                              height: 1.35)),
                    ],
                  ),
                ),
                if (onTap != null) ...[
                  const SizedBox(width: 7),
                  const Icon(Icons.chevron_right_rounded,
                      color: AppTheme.muted, size: 20),
                ],
              ],
            ),
          ),
        ),
      );
}

class _BrandMark extends StatelessWidget {
  const _BrandMark();

  @override
  Widget build(BuildContext context) => Container(
        width: 38,
        height: 38,
        decoration: BoxDecoration(
            color: AppTheme.accent,
            borderRadius: BorderRadius.circular(14),
            boxShadow: [
              BoxShadow(
                  color: AppTheme.accent.withValues(alpha: .25),
                  blurRadius: 13,
                  offset: const Offset(0, 5))
            ]),
        child: const Icon(Icons.auto_awesome_rounded,
            color: Colors.white, size: 20),
      );
}

class _HeroGlass extends StatelessWidget {
  const _HeroGlass();

  @override
  Widget build(BuildContext context) => SizedBox(
        height: 235,
        width: double.infinity,
        child: Stack(alignment: Alignment.center, children: [
          Container(
            width: 222,
            height: 215,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(43),
              gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFFF3EEFF),
                    Color(0xFFDCD0F7),
                    Color(0xFFEAE4F8)
                  ]),
              boxShadow: [
                BoxShadow(
                    color: AppTheme.accent.withValues(alpha: .14),
                    blurRadius: 34,
                    offset: const Offset(0, 18))
              ],
              border: Border.all(
                  color: Colors.white.withValues(alpha: .9), width: 1.5),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(42),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                child: Stack(children: [
                  Positioned(
                      top: -34,
                      left: 20,
                      child: _GlowOrb(
                          size: 120,
                          color: Colors.white.withValues(alpha: .8))),
                  Positioned(
                      bottom: -60,
                      right: -10,
                      child: _GlowOrb(
                          size: 160,
                          color:
                              const Color(0xFFB89AFF).withValues(alpha: .72))),
                ]),
              ),
            ),
          ),
          Container(
            width: 94,
            height: 94,
            decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withValues(alpha: .63),
                border: Border.all(
                    color: Colors.white.withValues(alpha: .9), width: 2),
                boxShadow: [
                  BoxShadow(
                      color: AppTheme.accent.withValues(alpha: .28),
                      blurRadius: 25,
                      spreadRadius: 3)
                ]),
            child: const Icon(Icons.auto_awesome_rounded,
                color: AppTheme.accent, size: 40),
          ),
        ]),
      );
}

class _GlowOrb extends StatelessWidget {
  const _GlowOrb({required this.size, required this.color});
  final double size;
  final Color color;

  @override
  Widget build(BuildContext context) => IgnorePointer(
      child: Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: color.withValues(alpha: .55),
              boxShadow: [
                BoxShadow(
                    color: color.withValues(alpha: .45),
                    blurRadius: 70,
                    spreadRadius: 22)
              ])));
}

class _IntroBenefit extends StatelessWidget {
  const _IntroBenefit({
    required this.icon,
    required this.title,
    required this.detail,
  });

  final IconData icon;
  final String title;
  final String detail;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 1),
              child: Icon(icon, color: AppTheme.accentDark, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      color: AppTheme.ink,
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    detail,
                    style: const TextStyle(
                      color: AppTheme.muted,
                      fontSize: 12,
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

class _DashboardActionCard extends StatelessWidget {
  const _DashboardActionCard({
    required this.icon,
    required this.tint,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final Color tint;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Material(
          color: Colors.white.withValues(alpha: .84),
          borderRadius: BorderRadius.circular(20),
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(20),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white, width: 1.2),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF463276).withValues(alpha: .045),
                    blurRadius: 16,
                    offset: const Offset(0, 5),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Container(
                    width: 45,
                    height: 45,
                    decoration: BoxDecoration(
                      color: tint,
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: Icon(icon, color: AppTheme.accentDark, size: 21),
                  ),
                  const SizedBox(width: 13),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: const TextStyle(
                            color: AppTheme.ink,
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          subtitle,
                          style: const TextStyle(
                            color: AppTheme.muted,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    width: 30,
                    height: 30,
                    decoration: BoxDecoration(
                      color: AppTheme.lavender.withValues(alpha: .72),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.arrow_forward_rounded,
                      color: AppTheme.accentDark,
                      size: 16,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
}

class _CareerActivityCard extends StatelessWidget {
  const _CareerActivityCard({
    required this.history,
  });

  final List<Map<String, dynamic>> history;

  @override
  Widget build(BuildContext context) {
    final latest = history.isEmpty ? null : history.first;
    final interests = latest?['careerInterests']?.toString().trim() ?? '';
    final result = latest?['result']?.toString().trim() ?? '';
    final summary = result.replaceAll(RegExp(r'\s+'), ' ');
    final date = DateTime.tryParse(latest?['createdAt']?.toString() ?? '')
        ?.toLocal();

    return Container(
      padding: const EdgeInsets.all(17),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFFFFFFF), Color(0xFFF1EBFF)],
        ),
        borderRadius: BorderRadius.circular(23),
        border: Border.all(color: AppTheme.border),
        boxShadow: [
          BoxShadow(
            color: AppTheme.accentDark.withValues(alpha: .055),
            blurRadius: 18,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  color: AppTheme.lavender,
                  borderRadius: BorderRadius.circular(13),
                ),
                child: const Icon(Icons.insights_rounded,
                    color: AppTheme.accentDark, size: 20),
              ),
              const SizedBox(width: 11),
              const Expanded(
                child: Text(
                  'Your career activity',
                  style: TextStyle(
                    color: AppTheme.ink,
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: .8),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  '${history.length} saved',
                  style: const TextStyle(
                    color: AppTheme.accentDark,
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          if (latest == null) ...[
            const Text(
              'Your first career roadmap will appear here after you complete an analysis.',
              style: TextStyle(color: AppTheme.muted, height: 1.45, fontSize: 12),
            ),
          ] else ...[
            Container(
              padding: const EdgeInsets.all(13),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: .78),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.route_rounded,
                      color: AppTheme.accentDark, size: 19),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          interests.isEmpty ? 'Latest roadmap' : interests,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: AppTheme.ink,
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          summary.isEmpty
                              ? 'Your saved career direction and next steps.'
                              : summary,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: AppTheme.muted,
                            fontSize: 11,
                            height: 1.4,
                          ),
                        ),
                        if (date != null) ...[
                          const SizedBox(height: 6),
                          Text(
                            '${_monthName(date.month)} ${date.day}, ${date.year}',
                            style: const TextStyle(
                              color: AppTheme.accentDark,
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
          const SizedBox(height: 10),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Icon(Icons.auto_awesome_rounded,
                  color: AppTheme.accent, size: 15),
              const SizedBox(width: 8),
              const Expanded(
                child: Text(
                  'CareerAI uses your skills and interests to suggest career directions, roles, and practical next steps.',
                  style: TextStyle(
                    color: AppTheme.muted,
                    fontSize: 10.5,
                    height: 1.45,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _monthName(int month) => const [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ][month - 1];
}

class _BottomNavItem extends StatelessWidget {
  const _BottomNavItem({
    required this.icon,
    required this.selectedIcon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final IconData icon;
  final IconData selectedIcon;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Expanded(
        child: SizedBox.expand(
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(18),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeOutCubic,
                  width: 42,
                  height: 34,
                  margin: const EdgeInsets.only(bottom: 4),
                  decoration: BoxDecoration(
                    color: selected
                        ? AppTheme.lavender.withValues(alpha: .9)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(13),
                  ),
                  child: Icon(
                    selected ? selectedIcon : icon,
                    size: 21,
                    color: selected ? AppTheme.accentDark : AppTheme.muted,
                  ),
                ),
                Text(
                  label,
                  style: TextStyle(
                    color: selected ? AppTheme.accentDark : AppTheme.muted,
                    fontSize: 11,
                    letterSpacing: .1,
                    fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
}
