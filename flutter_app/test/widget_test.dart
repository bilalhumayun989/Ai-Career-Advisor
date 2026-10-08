import 'package:flutter_test/flutter_test.dart';

import 'package:career_ai_app/app.dart';

void main() {
  testWidgets('CareerAI home screen renders', (WidgetTester tester) async {
    await tester.pumpWidget(const CareerAiApp());
    await tester.pumpAndSettle();

    expect(find.text('CareerAI'), findsOneWidget);
    expect(find.text('Your career,'), findsOneWidget);
    expect(find.text('reimagined.'), findsOneWidget);
  });
}
