import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class ApiService {
  ApiService({http.Client? client}) : _client = client ?? http.Client();

  static const _configuredBaseUrl = String.fromEnvironment('API_BASE_URL');
  static String get _baseUrl => _configuredBaseUrl.isNotEmpty
      ? _configuredBaseUrl
      : kIsWeb
          ? 'http://localhost:5000'
          : 'http://10.0.2.2:5000';
  static const _storage = FlutterSecureStorage();
  final http.Client _client;

  Uri _uri(String path) => Uri.parse('$_baseUrl$path');

  Future<Map<String, dynamic>> signup({
    required String name,
    required String email,
    required String password,
    required String confirmPassword,
  }) async {
    return _post('/api/auth/signup', {
      'name': name,
      'email': email,
      'password': password,
      'confirmPassword': confirmPassword,
    });
  }

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await _post('/api/auth/login', {
      'email': email,
      'password': password,
    });
    final token = response['token'];
    if (token is String) {
      await _storage.write(key: 'auth_token', value: token);
      final user = response['user'];
      if (user is Map) {
        await _storage.write(key: 'user_name', value: user['name']?.toString());
        await _storage.write(
            key: 'user_email', value: user['email']?.toString());
      }
    }
    return response;
  }

  Future<String?> readToken() => _storage.read(key: 'auth_token');

  Future<Map<String, String?>> readUserInfo() async => {
        'name': await _storage.read(key: 'user_name'),
        'email': await _storage.read(key: 'user_email'),
      };

  Future<void> changeName(String name) async {
    final response = await _patchAuthenticated('/api/auth/profile', {'name': name});
    final user = response['user'];
    if (user is Map && user['name'] != null) {
      await _storage.write(key: 'user_name', value: user['name'].toString());
    }
  }

  Future<void> changePassword({
    required String currentPassword,
    required String newPassword,
    required String confirmPassword,
  }) async {
    await _patchAuthenticated('/api/auth/password', {
      'currentPassword': currentPassword,
      'newPassword': newPassword,
      'confirmPassword': confirmPassword,
    });
  }

  Future<void> logout() async {
    await _storage.delete(key: 'auth_token');
    await _storage.delete(key: 'user_name');
    await _storage.delete(key: 'user_email');
  }

  Future<String> analyzeCareer(Map<String, String> profile) async {
    final response = await _post('/api/career', profile);
    final result = response['result']?.toString() ?? 'No analysis was returned.';
    try {
      await _saveCareerHistory(profile, result);
    } catch (_) {
      // Keep the live result usable if local history storage is unavailable.
    }
    return result;
  }

  Future<List<Map<String, dynamic>>> readCareerHistory() async {
    final email = await _storage.read(key: 'user_email');
    if (email == null || email.isEmpty) return [];
    final encodedEmail = base64Url.encode(utf8.encode(email.toLowerCase()));
    final raw = await _storage.read(key: 'career_history_$encodedEmail');
    if (raw == null || raw.isEmpty) return [];
    final decoded = jsonDecode(raw);
    if (decoded is! List) return [];
    return decoded
        .whereType<Map>()
        .map((entry) => Map<String, dynamic>.from(entry))
        .toList();
  }

  Future<void> _saveCareerHistory(
    Map<String, String> profile,
    String result,
  ) async {
    final email = await _storage.read(key: 'user_email');
    if (email == null || email.isEmpty) return;
    final encodedEmail = base64Url.encode(utf8.encode(email.toLowerCase()));
    final key = 'career_history_$encodedEmail';
    final history = await readCareerHistory();
    history.insert(0, {
      'createdAt': DateTime.now().toIso8601String(),
      'careerInterests': profile['careerInterests'] ?? '',
      'result': result,
    });
    if (history.length > 10) history.removeRange(10, history.length);
    await _storage.write(key: key, value: jsonEncode(history));
  }

  Future<Map<String, dynamic>> _post(
    String path,
    Map<String, String> body,
  ) async {
    late final http.Response response;
    try {
      response = await _client
          .post(
            _uri(path),
            headers: const {'Content-Type': 'application/json'},
            body: jsonEncode(body),
          )
          .timeout(const Duration(seconds: 20));
    } on TimeoutException {
      throw ApiException('The server at $_baseUrl took too long to respond.');
    } on http.ClientException {
      throw ApiException(
        'Cannot connect to the server at $_baseUrl. Make sure the backend is running on port 5000.',
      );
    }
    final decoded = jsonDecode(response.body);
    final data =
        decoded is Map<String, dynamic> ? decoded : <String, dynamic>{};
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        data['message']?.toString() ??
            data['result']?.toString() ??
            'Request failed (${response.statusCode}).',
      );
    }
    return data;
  }

  Future<Map<String, dynamic>> _patchAuthenticated(
    String path,
    Map<String, String> body,
  ) async {
    final token = await readToken();
    if (token == null || token.isEmpty) {
      throw const ApiException('Sign in again to update your account.');
    }

    late final http.Response response;
    try {
      response = await _client
          .patch(
            _uri(path),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer $token',
            },
            body: jsonEncode(body),
          )
          .timeout(const Duration(seconds: 20));
    } on TimeoutException {
      throw ApiException('The server at $_baseUrl took too long to respond.');
    } on http.ClientException {
      throw ApiException(
        'Cannot connect to the server at $_baseUrl. Make sure the backend is running on port 5000.',
      );
    }

    final decoded = jsonDecode(response.body);
    final data =
        decoded is Map<String, dynamic> ? decoded : <String, dynamic>{};
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        data['message']?.toString() ??
            'Request failed (${response.statusCode}).',
      );
    }
    return data;
  }
}

class ApiException implements Exception {
  const ApiException(this.message);
  final String message;

  @override
  String toString() => message;
}
