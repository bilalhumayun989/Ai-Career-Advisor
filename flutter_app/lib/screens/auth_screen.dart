import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../theme/app_theme.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _confirmPassword = TextEditingController();
  final _api = ApiService();

  bool _signup = false;
  bool _showPassword = false;
  bool _loading = false;
  String? _message;
  bool _messageIsSuccess = false;

  void _setMode(bool signup) {
    setState(() {
      _signup = signup;
      _message = null;
      _showPassword = false;
    });
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    _confirmPassword.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _loading = true;
      _message = null;
    });

    try {
      if (_signup) {
        final response = await _api.signup(
          name: _name.text.trim(),
          email: _email.text.trim(),
          password: _password.text,
          confirmPassword: _confirmPassword.text,
        );
        if (!mounted) return;
        setState(() {
          _signup = false;
          _message = response['message']?.toString() ??
              'Account created. Please sign in.';
          _messageIsSuccess = true;
          _password.clear();
          _confirmPassword.clear();
        });
      } else {
        await _api.login(
          email: _email.text.trim(),
          password: _password.text,
        );
        if (!mounted) return;
        Navigator.pushNamedAndRemoveUntil(context, '/', (_) => false);
      }
    } on ApiException catch (error) {
      if (mounted) {
        setState(() {
          _message = error.message;
          _messageIsSuccess = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _message =
              'Could not reach the server. Check your API address and connection.';
          _messageIsSuccess = false;
        });
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  InputDecoration _fieldDecoration(
    String label,
    IconData icon, {
    Widget? suffixIcon,
  }) =>
      InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, size: 19, color: AppTheme.accentDark),
        suffixIcon: suffixIcon,
        isDense: true,
        contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 14),
      );

  Widget _passwordInput({required bool confirmation}) {
    final controller = confirmation ? _confirmPassword : _password;
    final label = confirmation ? 'Confirm password' : 'Password';
    return TextFormField(
      controller: controller,
      obscureText: !_showPassword,
      style: const TextStyle(fontSize: 14, color: AppTheme.ink),
      decoration: _fieldDecoration(
        label,
        Icons.lock_outline_rounded,
        suffixIcon: IconButton(
          tooltip: _showPassword ? 'Hide password' : 'Show password',
          visualDensity: VisualDensity.compact,
          onPressed: () => setState(() => _showPassword = !_showPassword),
          icon: Icon(
            _showPassword
                ? Icons.visibility_off_outlined
                : Icons.visibility_outlined,
            size: 19,
            color: AppTheme.muted,
          ),
        ),
      ),
      validator: (value) {
        if (confirmation && value != _password.text) {
          return 'Passwords do not match';
        }
        if (value == null || value.isEmpty) return 'Enter your password';
        return null;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const Positioned(top: -115, right: -130, child: _AuthGlow()),
          SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(14, 7, 22, 0),
                  child: Row(
                    children: [
                      IconButton(
                        tooltip: 'Back',
                        onPressed: () => Navigator.pop(context),
                        icon: const Icon(Icons.arrow_back_rounded),
                      ),
                      const Spacer(),
                      const Text(
                        'CareerAI',
                        style: TextStyle(
                          color: AppTheme.accentDark,
                          fontWeight: FontWeight.w700,
                          fontSize: 15,
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView(
                    padding: const EdgeInsets.fromLTRB(24, 8, 24, 24),
                    children: [
                      Center(
                        child: Container(
                          width: 49,
                          height: 49,
                          decoration: BoxDecoration(
                            color: AppTheme.lavender,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Icon(
                            _signup
                                ? Icons.person_add_alt_rounded
                                : Icons.lock_open_rounded,
                            size: 23,
                            color: AppTheme.accentDark,
                          ),
                        ),
                      ),
                      const SizedBox(height: 15),
                      Text(
                        _signup ? 'Create your account' : 'Welcome back',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: AppTheme.ink,
                          fontSize: 25,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -.6,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        _signup
                            ? 'A few details to get started.'
                            : 'Sign in to continue your career journey.',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: AppTheme.muted,
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(height: 20),
                      _modeSelector(),
                      const SizedBox(height: 18),
                      Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            if (_signup) ...[
                              TextFormField(
                                controller: _name,
                                textCapitalization: TextCapitalization.words,
                                style: const TextStyle(
                                    fontSize: 14, color: AppTheme.ink),
                                decoration: _fieldDecoration(
                                  'Full name',
                                  Icons.badge_outlined,
                                ),
                                validator: (value) =>
                                    value == null || value.trim().isEmpty
                                        ? 'Enter your name'
                                        : null,
                              ),
                              const SizedBox(height: 13),
                            ],
                            TextFormField(
                              controller: _email,
                              keyboardType: TextInputType.emailAddress,
                              textInputAction: TextInputAction.next,
                              autofillHints: const [
                                AutofillHints.username,
                                AutofillHints.email,
                              ],
                              autocorrect: false,
                              style: const TextStyle(
                                  fontSize: 14, color: AppTheme.ink),
                              decoration: _fieldDecoration(
                                'Email address',
                                Icons.mail_outline_rounded,
                              ),
                              validator: (value) =>
                                  value == null || !value.contains('@')
                                      ? 'Enter a valid email'
                                      : null,
                            ),
                            const SizedBox(height: 13),
                            _passwordInput(confirmation: false),
                            if (_signup) ...[
                              const SizedBox(height: 13),
                              _passwordInput(confirmation: true),
                            ],
                          ],
                        ),
                      ),
                      if (_message != null) ...[
                        const SizedBox(height: 12),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            _message!,
                            style: TextStyle(
                              color: _messageIsSuccess
                                  ? const Color(0xFF398F7F)
                                  : const Color(0xFFC3435D),
                              fontSize: 12,
                              height: 1.35,
                            ),
                          ),
                        ),
                      ],
                      const SizedBox(height: 17),
                      SizedBox(
                        width: double.infinity,
                        height: 49,
                        child: FilledButton(
                          onPressed: _loading ? null : _submit,
                          style: FilledButton.styleFrom(
                            backgroundColor: AppTheme.accent,
                            foregroundColor: Colors.white,
                            elevation: 3,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                          ),
                          child: _loading
                              ? const SizedBox(
                                  width: 18,
                                  height: 18,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    color: Colors.white,
                                  ),
                                )
                              : Text(
                                  _signup ? 'Create account' : 'Sign in',
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _modeSelector() {
    return Row(
      children: [
        _modeOption(
          'Sign in',
          selected: !_signup,
          onTap: () => _setMode(false),
        ),
        _modeOption(
          'Create account',
          selected: _signup,
          onTap: () => _setMode(true),
        ),
      ],
    );
  }

  Widget _modeOption(
    String label, {
    required bool selected,
    required VoidCallback onTap,
  }) =>
      Expanded(
        child: InkWell(
          onTap: _loading ? null : onTap,
          borderRadius: BorderRadius.circular(10),
          child: Padding(
            padding: const EdgeInsets.only(top: 12),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  label,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: selected ? AppTheme.accentDark : AppTheme.muted,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 10),
                AnimatedContainer(
                  duration: const Duration(milliseconds: 160),
                  height: 2,
                  decoration: BoxDecoration(
                    color: selected ? AppTheme.accent : Colors.transparent,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
}

class _AuthGlow extends StatelessWidget {
  const _AuthGlow();

  @override
  Widget build(BuildContext context) => IgnorePointer(
        child: Container(
          width: 240,
          height: 240,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFFE5D9FF).withValues(alpha: .5),
            boxShadow: [
              BoxShadow(
                color: AppTheme.accent.withValues(alpha: .12),
                blurRadius: 70,
                spreadRadius: 20,
              ),
            ],
          ),
        ),
      );
}
